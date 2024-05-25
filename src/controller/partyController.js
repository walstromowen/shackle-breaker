import {playSoundEffect, playMusic} from '../utility.js';

export default class PartyController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize(){
        document.getElementById('party-toggle-overworld-button').addEventListener('click', ()=>{
            this.props.switchScreen('overworld-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            
        })
        
    }
    onSwitchScreen(){
        this.model.initialize();
        this.view.removeAllEntitySlots();
        this.view.createPartySlots(this.model.props.getParty(), this.model.props.getSituation());

        //grid items
        if(this.model.props.getSituation() == 'overworld'){
            document.querySelectorAll('.party-grid-item').forEach((node)=>{
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
                    newData.parentNode.appendChild(oldData);
                    node.appendChild(newData);
                    node.classList.remove('hover-brightness');
                });
                node.querySelector('.party-toggle-summary-button').addEventListener('click', (e)=>{
                    e.stopPropagation();
                    this.props.switchScreen('character-summary-screen');
                    playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
                });
            })

             //slot data
            document.querySelectorAll('.party-character-slot-data').forEach((node)=>{
                this.addSelectableSlotDataListeners(node);
            });
        }
    }
    createSelectButtons(resolveFn, allyReinforcements){
        document.querySelectorAll('.party-character-slot-data').forEach((node)=>{
            for(let i = 0; i < allyReinforcements.length; i++){
                if(allyReinforcements[i].partyId == node.id){
                    this.view.createSelectButton(node);
                    this.addSelectableSlotDataListeners(node)
                    node.classList.add('possible-target');
                    node.querySelector('.party-select-button').addEventListener('click', (e)=>{
                        e.stopPropagation();
                        let selectedEntity = this.model.getEntity(node.id);
                        resolveFn(selectedEntity);
                        this.props.switchScreen('battle-screen');
                        playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
                    });
                    break;
                }
            } 
        });
    } 
    addSelectableSlotDataListeners(node){
        node.addEventListener('dragstart', ()=>{ //dragstart targets the element that has begun being dragged
            node.classList.add('dragging');
            node.querySelector('.party-character-slot-button-container').style.display='none';
        });
        node.addEventListener('dragend', ()=>{ //dragend targets the element that has stopped dragging dragged
            node.classList.remove('dragging');
        });
        node.addEventListener('click', (e)=>{ //dragend targets the element that has stopped dragging dragged
            e.stopPropagation();
            node.querySelector('.party-character-slot-button-container').style.display='flex';
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        node.addEventListener('mouseleave', (e)=>{
            e.stopPropagation();
            node.querySelector('.party-character-slot-button-container').style.display='none';
        });
    }
}