import {playSoundEffect, playMusic} from '../utility.js';

export default class BattleController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.selectTargetEventHandler;
        this.removeTargetEventHandler;
        this.confirmTargetEventHandler;
        this.cancelAttackEventHandler
        this.skipEventHandler;
        this.initialize();
    }
    initialize(){
        document.getElementById('battle-controls-abilities-button').addEventListener('click', ()=>{
            this.view.switchTab('battle-controls-abilities-tab');
        });
        document.getElementById('battle-controls-items-button').addEventListener('click', ()=>{
            this.view.switchTab('battle-controls-items-tab');
        });
        document.getElementById('battle-controls-stats-button').addEventListener('click', ()=>{
            this.view.switchTab('battle-controls-stats-tab');
        });
    }
    onSwitchScreen(){
        this.view.switchTab('battle-controls-abilities-tab')
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
            return chain.then(()=>this.cycleAllyChoices(ally))
        }, Promise.resolve())
    }
    cycleAllyChoices(ally){
        return new Promise((resolve)=>{
            this.createAbilityButtonsHelpper(ally, resolve);
        })
    }
    createAbilityButtonsHelpper(attacker, resolveFn){
        let combinedAbilities = this.model.getCombinedAbiliites(attacker);
        this.view.battleConfirmTargetsContainer.style.display = 'none';
        this.view.battleControlsContainer.style.display = 'block';
        this.view.switchTab('battle-controls-abilities-tab');
        this.view.removeCardTargets();
        this.view.removeAbilityButtons();
        this.view.highlightAttacker(attacker.battleId);
        let abilityButtons = this.view.createCombatantAbilityButtons(combinedAbilities);
        for(let i = 0; i < combinedAbilities.length; i++){
            abilityButtons[i].addEventListener('click', ()=>{
                let container = document.getElementById('battle-battlefield-container');
                container.removeEventListener('click', this.selectTargetEventHandler);
                container.removeEventListener('click', this.removeTargetEventHandler);
                this.view.removeCardTargets();
                this.view.removeEntranceAnimations();
                this.view.removeAbilityHighlight();
                attacker.abilityTargets = [];//model
                abilityButtons[i].classList.add('selected')//view
                attacker.nextAbility = combinedAbilities[i];//model
                this.createTargetListeners(attacker, resolveFn);
            })
        } 
    }
    createTargetListeners(attacker, resolveFn){
        let container = document.getElementById('battle-battlefield-container');
        this.view.highlightPossibleTargets(attacker.battleId)
        container.addEventListener('contextmenu', this.removeTargetEventHandler = (e)=>{
            e.preventDefault()
            Array.from(container.getElementsByClassName('battle-character-card')).forEach((card)=>{
                if(e.target.id == card.id){
                    let selectedCard = e.target;
                    selectedCard.classList.remove('targeted');//view
                    for(let i = 0; i < attacker.abilityTargets.length; i++){
                        if(attacker.abilityTargets[i].battleId == selectedCard.id){
                            attacker.abilityTargets.splice(i, 1);
                            i--     
                        }
                    }
                }
            });
        });
        container.addEventListener('click', this.selectTargetEventHandler = (e)=>{//check to see if available targets remaining
            Array.from(container.getElementsByClassName('battle-character-card')).forEach((card)=>{
                if(e.target.id == card.id){
                    let selectedCard = e.target;
                    this.validateTarget(attacker, selectedCard, resolveFn);
                }
            });
        });
    }
    validateTarget(attacker, selectedCard, resolveFn){
        if(attacker.nextAbility.sequenceType == 'chain'){
            selectedCard.classList.add('targeted');//view
            attacker.abilityTargets.push(this.model.getCombatant(selectedCard.id));
            if(attacker.abilityTargets.length == attacker.nextAbility.targetCount){
                this.toggleConfirmTargetsTab(attacker, resolveFn);//create submit choice button
            }
        }
        if(attacker.nextAbility.sequenceType == 'splash'){
            for(let i = 0; i < attacker.abilityTargets.length; i++){
                if(attacker.abilityTargets[i].battleId == selectedCard.id){
                    return;
                }
            }
            selectedCard.classList.add('targeted');//view
            attacker.abilityTargets.push(this.model.getCombatant(selectedCard.id));
            if(attacker.abilityTargets.length == attacker.nextAbility.targetCount || 
               attacker.nextAbility.targetCount - attacker.abilityTargets.length == this.model.getActiveHostiles().length){
                this.toggleConfirmTargetsTab(attacker, resolveFn);
            }
        }
    }
    toggleConfirmTargetsTab(attacker, resolveFn){
        let container = document.getElementById('battle-battlefield-container');
        let confirmButton = document.getElementById('battle-controls-confirm-attack-button');
        let backButton = document.getElementById('battle-controls-back-button');
        container.removeEventListener('click', this.selectTargetEventHandler);
        container.removeEventListener('contextmenu', this.removeTargetEventHandler);
        confirmButton.removeEventListener('click', this.confirmTargetEventHandler);
        backButton.removeEventListener('click', this.cancelAttackEventHandler);
        this.view.removePossibleTargets(attacker.battleId)
        this.view.battleConfirmTargetsContainer.style.display = 'flex';
        this.view.battleControlsContainer.style.display = 'none';
        confirmButton.addEventListener('click',this.confirmTargetEventHandler=()=>{
            this.view.removeAttackerHighlight(attacker.battleId);
            this.view.removeCardTargets();
            this.view.battleConfirmTargetsContainer.style.display = 'none';
            resolveFn();
        })
        backButton.addEventListener('click',this.cancelAttackEventHandler=()=>{
            attacker.abilityTargets = [];
            this.createAbilityButtonsHelpper(attacker, resolveFn)
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
                return this.determineAbilitySequence(attacker);
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
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    this.view.printToBattleConsole(status.message);
                    document.removeEventListener('click', this.skipEventHandler);
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.printToBattleConsole(status.message);
                    resolve(resolveObject);
                }
            }, 2000);
        });
    }
    playStatusAnimationHelpper(status, resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.playStatusAnimation(status);
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.playStatusAnimation(status);
                    resolve(resolveObject);
                }
            }, status.animationDuration);
        });
    }
    removeStatusAnimationsHelpper(status, resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeStatusAnimations();
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeStatusAnimations();
                    resolve(resolveObject);
                }
            }, 2000);
        });
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
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.model.activeCombatants.splice(this.model.activeCombatants.indexOf(combatant), 1);
                    this.view.printToBattleConsole(`${combatant.name} has been slain!`)
                    this.removeCombatantCard(combatant).then(()=>{
                        resolve();
                    })
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.model.activeCombatants.splice(this.model.activeCombatants.indexOf(combatant), 1);
                    this.view.printToBattleConsole(`${combatant.name} has been slain!`)
                    this.removeCombatantCard(combatant).then(()=>{
                        resolve();
                    })
                }
            }, 2000)
        })
    }
    removeCombatantCard(combatant){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeCombatantCard(combatant.battleId);
                    resolve();
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeCombatantCard(combatant.battleId);
                    resolve();
                }
            }, 2000)
        })
    }
    //Begin Ability Cycles
    determineAbilitySequence(attacker){
        switch(attacker.nextAbility.sequenceType){
            case 'splash':
                return this.activateAbilityCycle(attacker, attacker.abilityTargets);
            case 'chain':
                return attacker.abilityTargets.reduce((chain, target)=>{
                    return chain.then(()=>this.activateAbilityCycle(attacker, [target]));
                }, Promise.resolve())
        }
    }
    activateAbilityCycle(attacker, cycleTargets){
        if(attacker.currentHP <= 0){
            return new Promise((resolve)=>{
                resolve();
            });
        }
        for(let i = 0; i < cycleTargets.length; i++){
            if(cycleTargets[i] == false){
                cycleTargets.splice(i, 1)
                i--
            }else{
                if(cycleTargets[i].currentHP <= 0){
                    let newTarget = this.model.getRandomTarget(attacker);
                    if(newTarget == false){
                        return new Promise((resolve)=>{
                            resolve();
                        });
                    }else{
                        cycleTargets[i] = newTarget;
                    }
                }
            }
        }
        return new Promise((resolve)=>{
            this.canUseHelpper(attacker, cycleTargets).then((resolveObject)=>{
                return this.printAbilityToBattleConsoleHelpper(attacker.nextAbility, resolveObject);
            }).then((resolveObject)=>{
                return this.playAbilityAnimationHelpper(attacker, cycleTargets, resolveObject);
            }).then((resolveObject)=>{
                return this.postAbilityAnimationsHelpper(attacker, resolveObject);
            }).then((resolveObject)=>{
                if(resolveObject.evade){
                    return this.resolvePause(resolve);
                }else{
                    this.view.updateCombatantStats(attacker);
                    for(let i = 0; i < cycleTargets.length; i++){
                        this.view.updateCombatantStats(cycleTargets[i]);
                    }
                    resolve();
                }
            })
        });
    }
    canUseHelpper(attacker, targets){
        return new Promise((resolve)=>{
            let resolveObject = attacker.nextAbility.canUse(attacker, targets);
            resolve(resolveObject);
        });
    }
    printAbilityToBattleConsoleHelpper(ability, resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    this.view.printToBattleConsole(ability.message);
                    document.removeEventListener('click', this.skipEventHandler);
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.printToBattleConsole(ability.message);
                    resolve(resolveObject);
                }
            }, 2000);
        });
    }
    playAbilityAnimationHelpper(attacker, targets, resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.playAbilityAnimations(attacker, targets, resolveObject);
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.playAbilityAnimations(attacker, targets, resolveObject);
                    resolve(resolveObject);
                }
            }, attacker.nextAbility.animationDuration);
        })
    }
    postAbilityAnimationsHelpper(attacker, resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    if(resolveObject.evade){
                        this.view.printToBattleConsole(`Opponent evades ${attacker.name}'s attack!`);
                    }
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeAbilityAnimations()
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    if(resolveObject.evade){
                        this.view.printToBattleConsole(`Opponent evades ${attacker.name}'s attack!`);
                    }
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeAbilityAnimations()
                    resolve(resolveObject);
                }
            }, 2000);
        });
    }
    resolvePause(resolveFn){
        let flag = true;
        document.addEventListener('click', this.skipEventHandler = ()=>{
            if(flag == true){
                flag = false;
                resolveFn();
            }
        })
        setTimeout(()=>{
            if(flag == true){
                flag = false;
                resolveFn();
            }
        },2000)
    }
    checkEndBattleHelpper(){//determines if a party has been completely eliminated and needs to return to overworld
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.checkEndBattle(resolve);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.checkEndBattle(resolve);
                }
            }, 2000);
        });
    }
    checkEndBattle(resolveFunction){
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
        resolveFunction();  
    }
    recoverStats(){//may want to split this into two
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    for(let i = 0; i < this.model.activeCombatants.length; i++){
                        this.model.activeCombatants[i].recoverHP();
                        this.model.activeCombatants[i].recoverStamina();
                        this.model.activeCombatants[i].recoverMagic();
                        playSoundEffect("./assets/audio/soundEffects/energy-90321.mp3");
                        this.view.updateCombatantStats(this.model.activeCombatants[i]);
                    }
                    resolve();
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    for(let i = 0; i < this.model.activeCombatants.length; i++){
                        this.model.activeCombatants[i].recoverHP();
                        this.model.activeCombatants[i].recoverStamina();
                        this.model.activeCombatants[i].recoverMagic();
                        playSoundEffect("./assets/audio/soundEffects/energy-90321.mp3");
                        this.view.updateCombatantStats(this.model.activeCombatants[i]);
                    }
                    resolve();
                }
            }, 0);
       })
    }
    cycleReinforcements(side){
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
                return chain.then(()=>this.callReinforcementHelpper(combatant))
        }, Promise.resolve())
    }
    callReinforcementHelpper(combatant){
        return new Promise((resolve)=>{
            this.printReinforcementToBattleConsole(combatant).then(()=>{
                return this.callReinforcement(combatant);
            }).then(()=>{
                resolve();
            })
        })
    }
    printReinforcementToBattleConsole(combatant){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.model.activeCombatants.push(combatant);
                    this.view.printToBattleConsole(`${combatant.name} joins the battle.`)
                    resolve();
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.model.activeCombatants.push(combatant);
                    this.view.printToBattleConsole(`${combatant.name} joins the battle.`)
                    resolve();
                }
            }, 2000);
       })
    }
    callReinforcement(combatant){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.createCombatantCard(combatant);
                    resolve();
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.createCombatantCard(combatant);
                    resolve();
                }
            }, 2000);
       })
    }
    nextRoundHelpper(){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.activatePreround().then(()=>{
                        this.activateRound();
                    });
                    resolve();
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.activatePreround().then(()=>{
                        this.activateRound();
                    });
                    resolve();
                }
            }, 2000);
       })
    }
    activatePostRound(){
        this.checkEndBattleHelpper().then(()=>{
            return this.recoverStats()
        }).then(()=>{
            return this.cycleReinforcements('ally');
        }).then(()=>{
            return this.cycleReinforcements('hostile');
        }).then(()=>{
            this.nextRoundHelpper();
        })
    }
}