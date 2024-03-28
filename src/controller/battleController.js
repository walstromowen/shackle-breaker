import {playSoundEffect, playMusic} from '../utility.js';

export default class BattleController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.selectTargetEventHandler;
        this.removeTargetEventHandler;
        this.initialize();
    }
    initialize(){
        document.getElementById('battle-controls-abilities-button').addEventListener('click', ()=>{
            this.view.switchTab('battle-controls-abilities-tab');
        })
        document.getElementById('battle-controls-items-button').addEventListener('click', ()=>{
            this.view.switchTab('battle-controls-items-tab');
        })
        document.getElementById('battle-controls-stats-button').addEventListener('click', ()=>{
            this.view.switchTab('battle-controls-stats-tab');
        })
    }
    onSwitchScreen(){
        this.model.initialize();
        this.view.createActiveCombatantCards(this.model.activeCombatants);
        this.activatePreround().then(()=>{
            this.activateRound();
        })
    }
    activatePreround(){
        let allys = this.model.getActiveAllys();
        this.view.battleConsole.style.display = 'none';
        this.view.battleControlsContainer.style.display = 'block';
        return allys.reduce((chain, ally)=>{
            return chain.then(()=>this.createAbilityButtonsHelpper(ally))
        }, Promise.resolve())
    }
    createAbilityButtonsHelpper(ally){
        return new Promise((resolve)=>{
            this.view.highlightAttacker(ally.battleId);
            let abilityButtons = this.view.createCombatantAbilityButtons(ally);
            for(let i = 0; i < ally.abilityArray.length; i++){
                abilityButtons[i].addEventListener('click', ()=>{
                    let container = document.getElementById('battle-battlefield-container');
                    container.removeEventListener('click', this.targetEventHandler);
                    container.removeEventListener('click', this.selectTargetEventHandler);
                    this.view.removeCardTargets();
                    this.view.removeEntranceAnimations();
                    this.view.removeAbilityHighlight();
                    ally.abilityTargets = [];//model
                    abilityButtons[i].classList.add('selected')//view
                    ally.nextAbility = ally.abilityArray[i];//model
                    this.createTargetListeners(ally, resolve);
                })
            }
        })
    }
    createTargetListeners(attacker, resolveFn){
        let container = document.getElementById('battle-battlefield-container');
        this.view.highlightPossibleTargets(attacker.battleId)
        container.addEventListener('click', this.selectTargetEventHandler = (e)=>{
            Array.from(container.getElementsByClassName('battle-character-card')).forEach((card)=>{
                if(e.target.id == card.id){
                    let selectedCard = e.target;
                    selectedCard.classList.add('targeted');//view
                    attacker.abilityTargets.push(this.model.getCombatant(selectedCard.id));//model
                    if(attacker.abilityTargets.length == attacker.nextAbility.targetCount){
                        this.view.removePossibleTargets(attacker.battleId)
                        this.view.removeCardTargets();
                        this.view.removeAbilityButtons();
                        this.view.removeAttackerHighlight(attacker.battleId);
                        container.removeEventListener('click', this.selectTargetEventHandler);
                        resolveFn();//create submit choice button
                    }
                }
            });
        });
        container.addEventListener('contextmenu', this.removeTargetEventHandler = (e)=>{
            e.preventDefault()
            Array.from(container.getElementsByClassName('battle-character-card')).forEach((card)=>{
                if(e.target.id == card.id){
                    let selectedCard = e.target;
                    selectedCard.classList.remove('targeted');//view
                    for(let i = 0; i < attacker.abilityTargets.length; i++){
                        if(attacker.abilityTargets[i].battleId == selectedCard.id){
                            attacker.abilityTargets.splice(i, 1);
                        }
                    }
                }
            });
        });
    }
    activateRound(){
        this.view.battleControlsContainer.style.display = 'none';
        this.view.battleConsole.style.display = 'block';
        this.view.printToBattleConsole('');
        this.model.chooseHostileAttacks();
        this.model.determineTurnOrder();
        this.takeTurnHelpper().then(()=>{
            this.activatePostRound();
        });
    }
    takeTurnHelpper(){
        return this.model.activeCombatants.reduce((chain, combatant)=>{
            return chain.then(()=>this.takeTurn(combatant))
        }, Promise.resolve())
    }
    takeTurn(attacker){
        return new Promise((resolve)=>{
            this.checkBattleStatus().then(()=>{
                return this.cycleStatusEffectsHelpper(attacker, 'start');
            }).then(()=>{
                return this.handleDefeatedCombatantsHelpper();
            }).then(()=>{
                return this.attackEachTarget(attacker);
            }).then(()=>{
                return this.handleDefeatedCombatantsHelpper();
            }).then(()=>{
                return this.cycleStatusEffectsHelpper(attacker, 'end');
            }).then(()=>{
                return this.handleDefeatedCombatantsHelpper();
            }).then(()=>{
                resolve();
            })
        })
    }
    checkBattleStatus(){//jumps to postRound if one side is empty
        return new Promise((resolve)=>{
            let allyCount = 0;
            let hostileCount = 0;
            for(let i = 0; i < this.model.activeCombatants.length; i++){
                if(this.model.activeCombatants[i].currentHP > 0){
                    if(this.model.activeCombatants[i].isHostile == false){
                        allyCount++;
                    }else{
                        hostileCount++;
                    }
                }
            }
            if(allyCount == 0 || hostileCount == 0){
                this.activatePostRound();
                return;
            }
            resolve();
        });
    }
    cycleStatusEffectsHelpper(attacker, turnPhase){
        if(attacker.statusArray.length == 0 ||attacker.currentHP <= 0){
            return new Promise((resolve)=>{
                resolve();
            })
        }else{
            return attacker.statusArray.reduce((chain, status)=>{
                return chain.then(()=>this.cycleStatusEffect(status, turnPhase))
            }, Promise.resolve())
        }
    }
    cycleStatusEffect(status, turnPhase){
        return new Promise((resolve)=>{
            status.activate(turnPhase).then((resolveObject)=>{
                if(resolveObject.text == true){
                    return this.printToBattleConsoleHelpper(status, resolveObject)
                }else{
                    return new Promise((resolve)=>{
                        resolve(resolveObject);
                    })
                }
            }).then((resolveObject)=>{
                if(resolveObject.animation == true){
                    return this.playStatusAnimationHelpper(status, resolveObject);
                }else{
                    return new Promise((resolve)=>{
                        resolve(resolveObject);
                    })
                }
            }).then((resolveObject)=>{
                if(resolveObject.vitalsUpdate == true){
                    return this.removeStatusAnimationsHelpper(status, resolveObject);
                }else{
                    return new Promise((resolve)=>{
                        resolve(resolveObject);
                    })
                }
            }).then((resolveObject)=>{
                this.view.updateCombatantStats(status.holder);
                resolve();
            });
        });
    }
    printToBattleConsoleHelpper(status, resolveObject){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.view.printToBattleConsole(status.message);
                resolve(resolveObject);
            }, 2000);
        });
    }
    playStatusAnimationHelpper(status, resolveObject){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.view.playStatusAnimation(status);
                resolve(resolveObject);
            }, status.animationDuration);
        });
    }
    removeStatusAnimationsHelpper(status, resolveObject){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.view.removeStatusAnimations(status);
                resolve(resolveObject);
            }, 2000);
        });
    }
    promiseUpdateCombatantStats(combatant){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.view.updateCombatantStats(combatant)
                resolve();
            }, 2000);
        })
    }
    handleDefeatedCombatantsHelpper(){
        let defeatedCombatants = this.model.activeCombatants.filter((combatant)=>{
            return combatant.currentHP <= 0;
        })
        if(defeatedCombatants.length > 0){
            return defeatedCombatants.reduce((chain, combatant)=>{
                return chain.then(()=>this.handleDefeatedCombatant(combatant))
            }, Promise.resolve())
        }else{
            return new Promise((resolve)=>{
                resolve();
            }) 
        }
    }
    handleDefeatedCombatant(combatant){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.model.activeCombatants.splice(this.model.activeCombatants.indexOf(combatant), 1);
                this.view.printToBattleConsole(`${combatant.name} has been slain!`)
                this.removeCombatantCard(combatant).then(()=>{
                    resolve();
                })
            }, 2000)
        })
    }
    removeCombatantCard(combatant){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.view.removeCombatantCard(combatant.battleId);
                resolve();
            }, 2000)
        })
    }
    attackEachTarget(attacker){
        return attacker.abilityTargets.reduce((chain, target)=>{
            return chain.then(()=>this.activateAbilityHelpper(attacker, target));
        }, Promise.resolve())

    }
    activateAbilityHelpper(attacker, target){
        if(attacker.currentHP <= 0){
            return new Promise((resolve)=>{
                resolve();
            });
        }
        if(target.currentHP <= 0){
            let newTarget = this.model.getRandomTarget(attacker);
            if(newTarget == false){
                return new Promise((resolve)=>{
                    resolve();
                });
            }else{
                target = newTarget;
            }
        }
        return new Promise((resolve)=>{
            attacker.nextAbility.canUse(attacker, target).then(()=>{
                this.view.printToBattleConsole(attacker.nextAbility.message);
                return this.playAbilityAnimationHelpper(attacker, target);
            }).then(()=>{
                this.promiseUpdateCombatantStats(attacker)//I think this should do the trick
                return this.promiseUpdateCombatantStats(target)
            }).then(()=>{
                this.view.removeAbilityAnimations(attacker, target)
                resolve();
             });
        });
    }
    playAbilityAnimationHelpper(attacker, target){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.view.playAbilityAnimation(attacker, target);
                resolve();
            }, attacker.nextAbility.animationDuration);
        })
    }
    checkEndBattle(){//determines if a party has been completely eliminated and needs to return to overworld
        return new Promise((resolve)=>{
            setTimeout(()=>{
                let remainingAllies = this.model.allCombatants.filter((combatant)=>{
                    return (combatant.isHostile == false && combatant.currentHP > 0);
                })
                if(remainingAllies.length == 0){
                    this.view.printToBattleConsole('Party has been slain...');
                    //TEMP
                    
                    return;
                }
                let remainingHostiles = this.model.allCombatants.filter((combatant)=>{
                    return (combatant.isHostile == true && combatant.currentHP > 0);
                })
                if(remainingHostiles.length == 0){
                    this.view.printToBattleConsole('Hostiles have been slain...');
                    
                    return;
                }
                resolve();
            }, 2000);
        });
    }
    callReinforcementsHelper(side){
        let combatantCount = 0;
        let incomingCombatants = [];
        let forEnemy = false;
        if(side == 'hostile'){
            forEnemy = true;
        }
        for(let i = 0; i < this.model.activeCombatants.length; i++){
            if(this.model.activeCombatants[i].isHostile == forEnemy){
                combatantCount++;
            }
        }
        let emptyCardSlots = 3 - combatantCount;
        for(let i = 0; i < emptyCardSlots; i++){
            if(side == 'hostile'){
                if(this.model.hostileReinforcements.length > 0){
                    incomingCombatants.push(this.model.hostileReinforcements[0]);
                    this.model.hostileReinforcements.splice(0, 1);
                }
            }else{
                if(this.model.allyReinforcements.length > 0){
                    incomingCombatants.push(this.model.allyReinforcements[0])
                    this.model.allyReinforcements.splice(0, 1);
                }
            }
        }
        return incomingCombatants.reduce((chain, combatant)=>{
                return chain.then(()=>this.callReinforcement(combatant))//Wont work by surrounding callback in {}?
        }, Promise.resolve())
    }
    callReinforcement(combatant){
       return new Promise((resolve)=>{
           setTimeout(()=>{
                this.view.createCombatantCard(combatant);
                this.model.activeCombatants.push(combatant);
                this.view.printToBattleConsole(`${combatant.name} joins the battle.`)
                resolve();
           }, 2000);
       })
    }
    activatePostRound(){
        this.checkEndBattle().then(()=>{
            return this.callReinforcementsHelper('ally');
        }).then(()=>{
            return this.callReinforcementsHelper('hostile');
        }).then(()=>{
            setTimeout(()=>{
                this.activatePreround().then(()=>{
                    this.activateRound();
                });
            }, 2000)
        })
        //recover stam /magic
    }
}




