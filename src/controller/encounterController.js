import {playSoundEffect, playMusic, getRandomArrayElement} from '../utility.js';

export default class EncounterController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.skipEventHandler;
        this.textTime = 30;
    }
    onSwitchScreen(){
        this.model.determineCurrentCharater();
        this.model.initializeCurrentStage();
        this.triggerStage();
    }
    triggerStage(){
        this.model.currentStage.updateMessage(this.model.currentCharacter);
        this.view.updateCurrentCharacterAttributes(this.model.currentCharacter);
        this.view.updateCurrentCharacterCardStats(this.model.currentCharacter);
        this.view.updateEventCard(this.model.currentStage);

        this.printToEncounterConsoleHelpper(this.model.currentStage.message).then(()=>{
            return this.createDecisionsHelpper();
        })
    }
    printToEncounterConsoleHelpper(message){
        this.view.encounterConsoleContent.innerText = '';
        this.view.removeDecisionButtons();
        this.textTime = 30;
        let flag = true;
       
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.textTime = 0;     
                }
            })
            this.textTime = 30;
            let arrayMessage = Array.from(message)
            return arrayMessage.reduce((chain, character)=>{
                return chain.then(()=>this.printCharacterHelpper(character))
            }, Promise.resolve()).then(()=>{
                document.removeEventListener('click', this.skipEventHandler);
                resolve();
            })
        });  
    }
    printCharacterHelpper(character){
        return new Promise((resolve)=>{
            if(this.textTime == 0){
                this.view.appendToEncounterConsole(character);
                resolve();
            }else{
                setTimeout(()=>{
                    this.view.appendToEncounterConsole(character);
                    resolve();
                }, this.textTime)
            }
        })
    }
    createDecisionsHelpper(){
        return new Promise((resolve)=>{
            for(let i = 0; i < this.model.currentStage.decisionArray.length; i++){
                let decisionButton = this.view.createDecisionButton(this.model.currentStage.decisionArray[i])
                decisionButton.addEventListener('click', (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    this.activateDecision(this.model.currentStage.decisionArray[i], resolve);
                });
            }
        })
    }
    activateDecision(decision, resolveFn){
        this.printToEncounterConsoleHelpper(decision.messageFunction(this.model.currentCharacter)).then(()=>{
            return this.wait(2000)
        }).then(()=>{
            let success = true;
            if(decision.roll){
                let attributeBonuseScore = this.model.calculateAttributeBonusScore(decision);
                success = this.model.checkDecisionSuccess(attributeBonuseScore, decision);
                let outcome = this.model.calculateDecisionOutcome(success, decision)
                //this.triggerOutcome(outcome)
            }else{
                let outcome = this.model.calculateDecisionOutcome(success, decision)
                this.printToEncounterConsoleHelpper(outcome.messageFunction(this.model.currentCharacter)).then(()=>{
                    document.querySelector('body').classList.remove('battle-wipe');
                    return this.wait(2000);
                }).then(()=>{
                    this.triggerOutcome(outcome);
                })
                
            }
            
            
        })
    }
    wait(miliseconds){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    resolve();    
                }
            })
            setTimeout(()=>{
                document.removeEventListener('click', this.skipEventHandler);
                resolve();
            }, miliseconds)
        });  
    }
    triggerOutcome(outcome){
        switch(outcome.result){
            case 'battle':
                this.model.toggleBattle(outcome.createBattle(this.model.props.calcHighestPartyLevel(), this.model.props.getMap().biome))
                this.model.updateTileBattle(this.props.getOverworldController().model.currentPartyPosition);
                playMusic(this.model.props.getMap().biome.battleMusicSrc);
                this.view.playBattleTransition().then(()=>{ 
                    this.props.switchScreen('battle-screen');
                });
                return;
            case 'nextStage':
                this.model.changeStage(outcome.createNextStage(this.model.currentCharacter))
                this.triggerStage();
                return;
            case 'overworld':
                setTimeout(()=>{
                    this.props.getOverworldController().model.currentPartyPosition = this.props.getOverworldController().model.previousPartyPosition;
                    this.model.checkResetEncounter();
                    this.model.props.setSituation('overworld')
                    this.props.switchScreen('overworld-screen');
                    playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
                    this.props.getOverworldController().view.revealOverworldUi();
                }, 2000);
        }
    }
}


/*

*/