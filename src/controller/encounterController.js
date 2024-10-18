import {playSoundEffect, playMusic, capiltalizeAllFirstLetters, getRandomArrayElement} from '../utility.js';

export default class EncounterController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.skipEventHandler;
        this.rollButtonHandler;
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
        for(let i = 0; i < this.model.currentStage.decisionArray.length; i++){
            let decisionButton = this.view.createDecisionButton(this.model.currentStage.decisionArray[i])
            decisionButton.addEventListener('click', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                this.activateDecision(this.model.currentStage.decisionArray[i]);
            });
        }
    }
    activateDecision(decision){
        this.printToEncounterConsoleHelpper(decision.messageFunction(this.model.currentCharacter)).then(()=>{
            return this.wait(2000)
        }).then(()=>{
            document.querySelector('body').classList.remove('battle-wipe');//Temp should change to unigue encounter wipe
            if(decision.roll){
                let attributeBonuseScore = this.model.calculateAttributeBonusScore(decision);
                this.view.updateEncounterRollerBonusAndThreshold(attributeBonuseScore, decision.successThreshold);
                this.view.displayEncounterRoller();
                this.view.rollButton.addEventListener('click', this.rollButtonHandler = ()=>{
                    this.onRoll(attributeBonuseScore, decision, 30)
                    this.view.rollButton.removeEventListener('click', this.rollButtonHandler)
                    this.view.hideRollButtons()
                })
            }else{
                let outcome = this.model.calculateDecisionOutcome(true, decision)
                this.printToEncounterConsoleHelpper(outcome.messageFunction(this.model.currentCharacter)).then(()=>{
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
                    //playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
                    this.props.getOverworldController().view.revealOverworldUi();
                }, 2000);
                return
            case 'loot':
                let loot = outcome.createLoot();
                let message = '';
                if(loot.length > 0){
                    for(let i = 0; i < loot.length; i++){
                        message += `${capiltalizeAllFirstLetters(loot[i].name)}\n`
                        
                    }
                }
                this.model.lootStage(loot);
                this.printToEncounterConsoleHelpper(`${this.model.currentCharacter.name}'s party loots:\n` + message).then(()=>{
                    return this.wait(2000)
                }).then(()=>{
                    outcome.result = 'complete';
                    this.triggerOutcome(outcome);
                })
                return;
            case 'recruit':
                let recruit = outcome.createRecruit(this.model.props.calcHighestPartyLevel());
                this.model.props.getParty().push(recruit);
                this.printToEncounterConsoleHelpper(`${recruit.name} joins ${this.model.currentCharacter.name}'s party.`).then(()=>{
                    return this.wait(2000)
                }).then(()=>{
                    outcome.result = 'complete';
                    this.triggerOutcome(outcome);
                })
                return;
            case 'complete':
                setTimeout(()=>{
                    this.model.updateTileBattle(this.props.getOverworldController().model.currentPartyPosition);
                    this.props.getOverworldController().model.currentPartyPosition[0][1]
                    this.model.props.setSituation('overworld')
                    this.props.switchScreen('overworld-screen');
                    //playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
                    this.props.getOverworldController().view.revealOverworldUi();
                }, 2000);
                return;
        }
    }
    onRoll(attributeBonuseScore, decision, remainingUpdates){
        let outcome;
        let rollValue =  Math.ceil(Math.random()*20);
        this.view.rollerValue.innerText = rollValue;
        if(remainingUpdates > 0){
            setTimeout(()=>{
                remainingUpdates--;
                this.onRoll(attributeBonuseScore, decision, remainingUpdates);
            }, 50)
            return;
        }else{
            this.wait(2000).then(()=>{
                return this.addAttributebonusAnimation(rollValue, attributeBonuseScore);
            }).then(()=>{
                return this.wait(2000)
            }).then(()=>{
                let success = this.model.checkDecisionSuccess((rollValue + attributeBonuseScore), decision.successThreshold);//TODO
                outcome = this.model.calculateDecisionOutcome(success, decision)
                this.view.removeAttributebonusAnimation();
                this.view.hideEncounterRoller();
                return this.printToEncounterConsoleHelpper(outcome.messageFunction(this.model.currentCharacter))
            }).then(()=>{
                return this.wait(2000)
            }).then(()=>{
                this.triggerOutcome(outcome);
            });
        }
    }
    addAttributebonusAnimation(value, attributeBonuseScore){
        return new Promise((resolve)=>{
            this.view.addAttributebonusAnimation(value, attributeBonuseScore)
            resolve();
        })

    }
}
