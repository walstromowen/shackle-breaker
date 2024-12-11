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
        this.model.initialize();
        this.triggerStage();
    }
    triggerStage(){
        this.view.updateEventCard(this.model.currentStage);
        this.view.updateCurrentCharacterAttributes(this.model.currentCharacter);
        this.view.updateCurrentCharacterCardStats(this.model.currentCharacter);
        if(this.model.currentStage.musicSrc != ''){
            playMusic(this.model.currentStage.musicSrc);
        }
        this.printToEncounterConsoleHelpper(this.model.currentStage.messageFunction(this.model.currentCharacter)).then(()=>{
            return this.createDecisionsHelpper();
        })
    }
    retryStage(removableOptions){
        if(removableOptions){
            for(let i = 0; i < this.model.currentStage.decisionArray.length; i++){
                for(let j= 0; j < removableOptions.length; j++){
                    if(this.model.currentStage.decisionArray[i].option == removableOptions[j]){//TOOOODOOO
                        this.model.currentStage.decisionArray.splice(i, 1);
                    }
                }
            }
        }
        this.view.updateEventCard(this.model.currentStage);
        this.view.updateCurrentCharacterAttributes(this.model.currentCharacter);
        this.view.updateCurrentCharacterCardStats(this.model.currentCharacter)
        this.createDecisionsHelpper();
      
    }
    switchCurrentCharacter(){
        return new Promise((resolve)=>{
            this.props.switchScreen('party-screen');
            this.props.getPartyController().view.hidePartyToggleBackButton();
            this.props.getPartyController().createSelectButtons(resolve, this.model.props.getParty(), 'encounter-screen')
        })
    }
    printToEncounterConsoleHelpper(message){
        this.view.removeDecisionButtons();
        this.textTime = 30;
        let postTime = message.length*10;
        if(postTime < 2000){
            postTime = 2000;
        }
        let flag = true;
       
        return new Promise((resolve)=>{
            if(message.length == 0){
                resolve();
            }else{
                this.view.encounterConsoleContent.innerText = '';
            }
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
                return this.wait(postTime)
                .then(()=>{
                    document.removeEventListener('click', this.skipEventHandler);
                    resolve();
                })
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
                if(this.model.currentStage.decisionArray[i].goldCost || this.model.currentStage.decisionArray[i].requiredItems){
                    if(this.model.currentStage.decisionArray[i].goldCost){
                        if(this.model.checkGoldCost(this.model.currentStage.decisionArray[i].goldCost)){
                            this.activateDecisionHelpper(this.model.currentStage.decisionArray[i]);
                        }else{
                            playSoundEffect('./assets/audio/soundEffects/power-down-45784.mp3');
                        }
                    }else{
                        if(this.model.checkRequiredItems(this.model.currentStage.decisionArray[i].requiredItems)){
                            this.activateDecisionHelpper(this.model.currentStage.decisionArray[i]);
                        }else{
                            playSoundEffect('./assets/audio/soundEffects/power-down-45784.mp3');
                        }
                    }
                }
                else{
                    this.activateDecisionHelpper(this.model.currentStage.decisionArray[i]);
                }
            });
        }
    }
    activateDecisionHelpper(decision){
        if(decision.messageFunction){
            this.printToEncounterConsoleHelpper(decision.messageFunction(this.model.currentCharacter)).then(()=>{
                this.activateDecision(decision)
            })
        }else{
            this.activateDecision(decision)
        }
  
    }
    activateDecision(decision){
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
            if(outcome.imageSrc){
                this.view.eventCard.style.backgroundImage = `url(${outcome.imageSrc})`;
            }
            if(outcome.musicSrc){
                playMusic(outcome.musicSrc);
            }
            if(outcome.messageFunction){
                
                this.printToEncounterConsoleHelpper(outcome.messageFunction(this.model.currentCharacter)).then(()=>{
                    this.triggerOutcome(outcome);
                })
            }else{
                this.triggerOutcome(outcome);
            }
        }
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
        if(outcome.onActivate){
            outcome.onActivate(this.model.currentCharacter);
            this.view.updateCurrentCharacterCardStats(this.model.currentCharacter)
        }
        switch(outcome.result){
            case 'battle':
                this.model.toggleBattle(outcome.createBattle(this.model.props.calcHighestPartyLevel(), this.model.props.getMap().biome, this.model.props.getDifficulty()))
                this.model.updateTileBattle(this.props.getOverworldController().model.currentPartyPosition);
                if(outcome.createNextStage){
                    this.model.changeStage(outcome.createNextStage(this.model.currentCharacter));
                    this.model.updateTileBattle(this.props.getOverworldController().model.currentPartyPosition);
                }else{
                    this.model.props.setEncounter('');
                    this.model.updateTileEncounter(this.props.getOverworldController().model.currentPartyPosition);
                }
                this.view.playBattleTransition().then(()=>{ 
                    this.props.switchScreen('battle-screen');
                });
                return;
            case 'nextStage':
                if(outcome.xpReward)this.model.currentCharacter.currentXP += outcome.xpReward;
                this.lootDelay(outcome).then(()=>{
                    this.model.changeStage(outcome.createNextStage(this.model.currentCharacter))
                    this.triggerStage();
                });
                return;
            case 'overworld':
                this.lootDelay(outcome).then(()=>{
                    setTimeout(()=>{
                        this.props.getOverworldController().model.currentPartyPosition = this.props.getOverworldController().model.previousPartyPosition;
                        this.model.checkResetEncounter();
                        this.model.props.setBattle('');
                        this.model.updateTileBattle(this.props.getOverworldController().model.currentPartyPosition);
                        this.props.getOverworldController().model.currentPartyPosition = this.props.getOverworldController().model.previousPartyPosition
                        this.props.getOverworldController().model.nextPartyPosition = this.props.getOverworldController().model.currentPartyPosition
                        this.model.props.setSituation('overworld')
                        this.props.switchScreen('overworld-screen');
                        this.props.getOverworldController().view.revealOverworldUi();
                        playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
                    }, 2000);
                });
                return
            case 'recruit':
                let recruit = outcome.createRecruit(this.model.props.calcHighestPartyLevel());
                this.model.props.getParty().push(recruit);
                this.printToEncounterConsoleHelpper(`${recruit.name} joins ${this.model.currentCharacter.name}'s party.`).then(()=>{
                    outcome.result = 'complete';
                    this.triggerOutcome(outcome);
                })
                return;
            case 'retry':
                if(outcome.xpReward)this.model.currentCharacter.currentXP += outcome.xpReward;
                this.lootDelay(outcome).then(()=>{
                    this.retryStage()
                });
                return;
            case 'removeDecisions':
                if(outcome.xpReward)this.model.currentCharacter.currentXP += outcome.xpReward;
                this.lootDelay(outcome).then(()=>{
                    this.retryStage(outcome.removableDecisions)
                });
                return;
            case 'switchCharacter':
                this.switchCurrentCharacter().then((selectedEntity)=>{
                    this.props.getPartyController().view.revealPartyToggleBackButton();
                    this.model.makePartySelectable();
                    this.model.currentCharacter = selectedEntity;
                    this.triggerStage();
                })
                return;
            case 'complete':
                if(outcome.xpReward){
                    this.model.currentCharacter.currentXP += outcome.xpReward;
                }
                this.lootDelay(outcome).then(()=>{
                    return this.cycleLevelUps(outcome)
                }).then(()=>{
                    setTimeout(()=>{
                        this.model.props.setBattle('');
                        this.model.props.setEncounter('');
                        this.model.updateTileEncounter(this.props.getOverworldController().model.currentPartyPosition);
                        this.model.updateTileBattle(this.props.getOverworldController().model.currentPartyPosition);
                        
                        this.model.props.setSituation('overworld')
                        this.props.switchScreen('overworld-screen');
                        playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
                        this.props.getOverworldController().view.revealOverworldUi();
                    }, 2000);
                })
                return;
        }
    }
    lootDelay(outcome){
        return new Promise((resolve)=>{
            if(outcome.createLoot){
                let loot = outcome.createLoot(this.model.props.calcHighestPartyLevel(), this.model.props.getMap().biome);
                let message = '';
                if(loot.length > 0){
                    for(let i = 0; i < loot.length; i++){
                        message += '\n';
                        message += `${capiltalizeAllFirstLetters(loot[i].name)}`;                      
                    }
                }
                this.model.lootStage(loot);
                this.printToEncounterConsoleHelpper(`${this.model.currentCharacter.name}'s party loots:\n` + message).then(()=>{
                    resolve();
                })
            }else{
                resolve();
            }
        })
    }
    cycleLevelUps(outcome){
        let party = this.model.props.getParty()
        return party.reduce((chain, ally)=>{
            return chain.then(()=>this.displayAllyLevelUp(ally, outcome))
        }, Promise.resolve())  
    }
    displayAllyLevelUp(ally, outcome){
        return new Promise((resolve)=>{
            if(ally.currentXP >= Math.floor(((ally.level + 10)**2)*0.5)){
                ally.awardSkillPoints();
                playSoundEffect("./assets/audio/soundEffects/energy-90321.mp3");
                this.printToEncounterConsoleHelpper(`${ally.name} is now level ${ally.level}!`).then(()=>{
                    resolve();
                })
            }else{
                resolve();
            }
        })
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
                return this.addAttributebonusAnimation(rollValue, attributeBonuseScore, decision.successThreshold);
            }).then(()=>{
                return this.wait(2000)
            }).then(()=>{
                let success = this.model.checkDecisionSuccess((rollValue + attributeBonuseScore), decision.successThreshold);//TODO
                outcome = this.model.calculateDecisionOutcome(success, decision)
                if(outcome.imageSrc){
                    this.view.eventCard.style.backgroundImage = `url(${outcome.imageSrc})`;
                }
                if(outcome.musicSrc){
                    playMusic(outcome.musicSrc);
                }
                this.view.updateCurrentCharacterAttributes(this.model.currentCharacter);
                this.view.updateCurrentCharacterCardStats(this.model.currentCharacter);
                this.view.removeAttributebonusAnimation();
                this.view.hideEncounterRoller();
                if(outcome.messageFunction){
                    this.printToEncounterConsoleHelpper(outcome.messageFunction(this.model.currentCharacter)).then(()=>{
                        this.triggerOutcome(outcome);
                    });
                }else{
                    this.triggerOutcome(outcome);
                }
            })
        }
    }
    addAttributebonusAnimation(rollValue, attributeBonuseScore, threshold){
        return new Promise((resolve)=>{
            this.view.addAttributebonusAnimation(rollValue, attributeBonuseScore, threshold)
            resolve();
        })

    }
}
