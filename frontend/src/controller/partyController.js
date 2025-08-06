import {playSoundEffect, playMusic} from '../utility.js';

export default class PartyController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize(){
        document.getElementById('party-toggle-back-button').addEventListener('click', ()=>{
            if(this.model.props.getSituation()=='overworld'){
                this.props.switchScreen('overworld-screen');
            }
            if(this.model.props.getSituation()=='battle'){
                this.props.switchScreen('battle-screen');
            }
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        })
        
    }
    onSwitchScreen(){
        this.model.initialize();
        this.view.removeAllEntitySlots();
        this.view.createPartySlots(this.model.props.getParty(), this.model.props.getSituation());

        //grid items
        document.querySelectorAll('.party-grid-item').forEach((node)=>{
            if(this.model.props.getSituation() == 'overworld'){
                node.addEventListener('dragover', (e)=>{ //dragover targets the element that is being dragged over NOT the one you are dragging EVEN without e.stopPropagation();
                    e.preventDefault();
                    e.stopPropagation();
                });
                node.addEventListener('dragenter', (e)=>{ //dragover targets the element that is being dragged over NOT the one you are dragging EVEN without e.stopPropagation();
                    e.preventDefault();
                    e.stopPropagation();
                    node.classList.add('hover-brightness');
                });
                node.addEventListener('dragleave', (e)=>{ //dragover targets the element that is being dragged over NOT the one you are dragging EVEN without e.stopPropagation();
                    e.preventDefault();
                    e.stopPropagation();
                    node.classList.remove('hover-brightness');
                });
                node.addEventListener('drop', (e)=>{ //drop targets the element you drop into MUST include e.preventDefault in dragover if event if it is being used
                    e.stopPropagation();
                    const newData = document.getElementsByClassName('dragging')[0];
                    const oldData = node.getElementsByClassName('party-character-slot-data')[0];
                    this.model.switchPartySlots(oldData.id, newData.id);
                    this.onSwitchScreen();
                    //newData.parentNode.appendChild(oldData);
                    //node.appendChild(newData);
                    //node.classList.remove('hover-brightness');
                });
            }
            node.querySelector('.party-toggle-summary-button').addEventListener('click', (e)=>{
                e.stopPropagation();
                let partyId = node.getElementsByClassName('party-character-slot-data')[0].id
                this.props.getCharacterSummaryController().model.setCurrentCharacter(this.model.getEntity(partyId))
                this.props.switchScreen('character-summary-screen');
                playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            });
        })
        
        //slot data
        document.querySelectorAll('.party-character-slot-data').forEach((node)=>{
            if(this.model.props.getSituation() == 'overworld'){
                node.addEventListener('dragstart', ()=>{ //dragstart targets the element that has begun being dragged
                    node.classList.add('dragging');
                    node.querySelector('.party-character-slot-button-container').style.display='none';
                });
                node.addEventListener('dragend', ()=>{ //dragend targets the element that has stopped dragging dragged
                    node.classList.remove('dragging');
                });
                /*
                 //MOBILE
                let touchCoordinates = [null, null];
                node.addEventListener('touchstart', (e)=>{ 
                    let touchLocation = e.targetTouches[0];
                    let clone = e.target.cloneNode(false);
                    clone.style.position = 'absolute';
                    clone.classList.add('clone');
                    e.target.classList.add('dragging');
                    clone.style.left = touchLocation.pageX - e.target.clientWidth/2 + 'px';
                    clone.style.top = touchLocation.pageY - e.target.clientHeight/2 + 'px';
                    this.view.screen.appendChild(clone);
                });
                node.addEventListener('touchmove',  (e)=>{ 
                    e.preventDefault();
                    let touchLocation = e.targetTouches[0];
                    let clone = document.getElementsByClassName('clone')[0];
                    
                    clone.style.left = touchLocation.pageX - clone.clientWidth/2 + 'px';
                    clone.style.top = touchLocation.pageY - clone.clientHeight/2 + 'px';
                   
                    touchCoordinates = [touchLocation.pageX, touchLocation.pageY];
                });
                node.addEventListener('touchend',  (e)=>{
                    let clone = document.getElementsByClassName('clone')[0];
                    
                    let touchLocations = document.elementsFromPoint(touchCoordinates[0], touchCoordinates[1]);
                    touchCoordinates = [null, null];
                    
                    for(let i = 0; i < touchLocations.length; i++){
                        if(touchLocations[i].classList.contains('party-character-slot-data')){
                            let event = new Event('drop');
                            touchLocations[i].dispatchEvent(event)
                            break;
                        }
                    }
                        
                    clone.remove();
                });
                 //MOBILE
                */




            }
            node.addEventListener('click', (e)=>{ 
                e.stopPropagation();
                node.querySelector('.party-character-slot-button-container').style.display='flex';
                playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            });
            node.addEventListener('mouseleave', (e)=>{
                e.stopPropagation();
                node.querySelector('.party-character-slot-button-container').style.display='none';
            });
        });
    }
    createSelectButtons(resolveFn, allyReinforcements, screen){
        document.querySelectorAll('.party-character-slot-data').forEach((node)=>{
            for(let i = 0; i < allyReinforcements.length; i++){
                if(allyReinforcements[i].partyId == node.id && allyReinforcements[i].isSelectable == true){
                    this.view.createSelectButton(node);
                    node.querySelector('.party-select-button').addEventListener('click', (e)=>{
                        allyReinforcements[i].isSelectable = false;
                        e.stopPropagation();
                        let selectedEntity = this.model.getEntity(node.id);
                        resolveFn(selectedEntity);
                        this.props.switchScreen(screen);
                        playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
                    });
                    break;
                }
            } 
        });
    } 
 
}