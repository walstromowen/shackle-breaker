import {playSoundEffect, playMusic} from '../utility.js';
import {SwitchCombatant} from '../model/misc/abilities.js';

export default class BattleController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.currentAttacker;
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
    }
    onSwitchScreen(){
        this.view.switchTab('battle-controls-abilities-tab')
        if(this.model.props.getSituation() != 'battle'){
            this.model.initialize();
            this.view.createActiveCombatantCards(this.model.activeCombatants);
            this.activatePreround().then(()=>{
                this.activateRound();
            })
        }
    }
    activatePreround(){
        this.props.getPartyController().view.revealPartyToggleBackButton();
        let allys = this.model.getActiveAllys();
        this.view.battleConsole.style.display = 'none';
        this.view.battleControlsContainer.style.display = 'block';
        return allys.reduce((chain, ally)=>{
            return chain.then(()=>this.cycleAllyChoices(ally))
        }, Promise.resolve())
    }
    cycleAllyChoices(ally){
        return new Promise((resolve)=>{
            this.createAbilityButtonsHelpper(ally).then((selectedEntity)=>{
                if(selectedEntity != undefined){
                    ally.nextAbility = new SwitchCombatant({
                        newCombatant: selectedEntity,
                        onActivate: ()=>{
                            this.model.switchCombatants(ally, ally.nextAbility.newCombatant)
                        }
                    });
                    ally.abilityTargets = [ally];
                    this.view.removeAttackerHighlight(ally.battleId);
                    this.view.removeCardTargets();
                }
                resolve();
            });
        })
    }
    createAbilityButtonsHelpper(ally, resolveFn){
        if(resolveFn != undefined){
            return this.createAbilityButtons(ally, resolveFn);
        }
        return new Promise((resolve)=>{
            this.createAbilityButtons(ally, resolve)
        });
            
    }
    createAbilityButtons(ally, resolveFn){
        document.getElementById('battle-controls-party-button').addEventListener('click', ()=>{
            this.props.switchScreen('party-screen');
            this.props.getPartyController().createSelectButtons(resolveFn, this.model.allyReinforcements);
            let container = document.getElementById('battle-battlefield-container');
                container.removeEventListener('click', this.selectTargetEventHandler);
                container.removeEventListener('contextmenu', this.removeTargetEventHandler);
                this.view.removeCardTargets();
                this.view.removeEntranceAnimations();
                this.view.removeAbilityHighlight();
                this.view.removePossibleTargets(ally.battleId)
         
        });
        
        let combinedAbilities = this.model.getCombinedAbiliites(ally);
        this.view.battleConfirmTargetsContainer.style.display = 'none';
        this.view.battleControlsContainer.style.display = 'block';
        this.view.switchTab('battle-controls-abilities-tab');
        this.view.removeCardTargets();
        this.view.removeAbilityButtons();
        this.view.highlightAttacker(ally.battleId);
        let abilityButtons = this.view.createCombatantAbilityButtons(combinedAbilities);
        for(let i = 0; i < combinedAbilities.length; i++){
            abilityButtons[i].addEventListener('click', ()=>{
                let container = document.getElementById('battle-battlefield-container');
                container.removeEventListener('click', this.selectTargetEventHandler);
                container.removeEventListener('contextmenu', this.removeTargetEventHandler);
                this.view.removeCardTargets();
                this.view.removeEntranceAnimations();
                this.view.removeAbilityHighlight();
                ally.abilityTargets = [];//model
                abilityButtons[i].classList.add('selected')//view
                ally.nextAbility = combinedAbilities[i];//model
                this.createTargetListeners(ally, resolveFn);
                
                
            })
        } 
    }
    createTargetListeners(ally, resolveFn){
        let container = document.getElementById('battle-battlefield-container');
        if(ally.nextAbility.name == 'retreat'){//can also be used on self targeting moves or auto targeting moves
            let selectedCard = document.getElementById(ally.battleId);
            this.validateTarget(ally, selectedCard, resolveFn);
            return;
        }
        this.view.highlightPossibleTargets(ally.battleId)
        container.addEventListener('contextmenu', this.removeTargetEventHandler = (e)=>{
            e.preventDefault()
            Array.from(container.getElementsByClassName('battle-character-card')).forEach((card)=>{
                if(e.target.id == card.id){
                    let selectedCard = e.target;
                    selectedCard.classList.remove('targeted');//view
                    for(let i = 0; i < ally.abilityTargets.length; i++){
                        if(ally.abilityTargets[i].battleId == selectedCard.id){
                            ally.abilityTargets.splice(i, 1);
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
                    this.validateTarget(ally, selectedCard, resolveFn);
                }
            });
        });
    }
    validateTarget(ally, selectedCard, resolveFn){
        if(ally.nextAbility.sequenceType == 'chain'){
            selectedCard.classList.add('targeted');//view
            ally.abilityTargets.push(this.model.getCombatant(selectedCard.id));
            if(ally.abilityTargets.length == ally.nextAbility.targetCount){
                this.toggleConfirmTargetsTab(ally, resolveFn);//create submit choice button
            }
        }
        if(ally.nextAbility.sequenceType == 'splash'){
            for(let i = 0; i < ally.abilityTargets.length; i++){
                if(ally.abilityTargets[i].battleId == selectedCard.id){
                    return;
                }
            }
            selectedCard.classList.add('targeted');//view
            ally.abilityTargets.push(this.model.getCombatant(selectedCard.id));
            if(ally.abilityTargets.length == ally.nextAbility.targetCount || 
               ally.nextAbility.targetCount - ally.abilityTargets.length == this.model.getActiveHostiles().length){
                this.toggleConfirmTargetsTab(ally, resolveFn);
            }
        }
    }
    toggleConfirmTargetsTab(ally, resolveFn){
        let container = document.getElementById('battle-battlefield-container');
        let confirmButton = document.getElementById('battle-controls-confirm-attack-button');
        let backButton = document.getElementById('battle-controls-back-button');
        container.removeEventListener('click', this.selectTargetEventHandler);
        container.removeEventListener('contextmenu', this.removeTargetEventHandler);
        confirmButton.removeEventListener('click', this.confirmTargetEventHandler);
        backButton.removeEventListener('click', this.cancelAttackEventHandler);
        this.view.removePossibleTargets(ally.battleId)
        this.view.battleConfirmTargetsContainer.style.display = 'flex';
        this.view.battleControlsContainer.style.display = 'none';
        confirmButton.addEventListener('click',this.confirmTargetEventHandler=()=>{
            this.view.removeAttackerHighlight(ally.battleId);
            this.view.removeCardTargets();
            this.view.battleConfirmTargetsContainer.style.display = 'none';
            resolveFn();
        })
        backButton.addEventListener('click',this.cancelAttackEventHandler=()=>{
            ally.abilityTargets = [];
            this.createAbilityButtonsHelpper(ally, resolveFn)
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
        this.view.removeEntranceAnimations();
        this.currentAttacker = attacker;
        return new Promise((resolve)=>{
            this.checkBattleStatus().then(()=>{
                return this.cycleStatusEffectsHelpper('start');
            }).then(()=>{
                return this.handleDefeatedCombatantsHelpper();
            }).then(()=>{
                return this.determineAbilitySequence();
            }).then(()=>{
                return this.handleDefeatedCombatantsHelpper();
            }).then(()=>{
                return this.cycleStatusEffectsHelpper('end');
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
    cycleStatusEffectsHelpper(turnPhase){
        if(this.currentAttacker.statusArray.length == 0 || this.currentAttacker.currentHP <= 0){
            return new Promise((resolve)=>{
                resolve();
            })
        }else{
            return this.currentAttacker.statusArray.reduce((chain, status)=>{
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
    determineAbilitySequence(){
        switch( this.currentAttacker.nextAbility.sequenceType){
            case 'splash':
                return this.activateAbilityCycle(this.currentAttacker.abilityTargets);
            case 'chain':
                return this.currentAttacker.abilityTargets.reduce((chain, target)=>{
                    return chain.then(()=>this.activateAbilityCycle([target]));
                }, Promise.resolve())
        }
    }
    activateAbilityCycle(cycleTargets){
        if(this.currentAttacker.currentHP <= 0){
            return new Promise((resolve)=>{
                resolve();
            });
        }
        for(let i = 0; i < cycleTargets.length; i++){
            if(cycleTargets[i] == false){
                cycleTargets.splice(i, 1)
                i--
            }else{
                let isActive = this.model.activeCombatants.includes(cycleTargets[i]);
                if(cycleTargets[i].currentHP <= 0 || isActive == false){//Or is not active?
                    let newTarget = this.model.getRandomTarget(this.currentAttacker);
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
            this.canUseHelpper(cycleTargets).then((resolveObject)=>{
                return this.printAbilityToBattleConsoleHelpper(this.currentAttacker.nextAbility, resolveObject);
            }).then((resolveObject)=>{
                return this.playAbilityAnimationHelpper(cycleTargets, resolveObject);
            }).then((resolveObject)=>{
                if(resolveObject.switchCombatant){
                    return this.switchCombatantAnimationHelpper(resolveObject);
                }else{
                    return this.postAbilityAnimationsHelpper(resolveObject);
                }
            }).then((resolveObject)=>{
                if(resolveObject.switchCombatant){
                    this.currentAttacker = this.currentAttacker.nextAbility.newCombatant;
                }else{
                    if(resolveObject.evade){
                        return this.resolvePause(resolve);
                    }else{
                        if(resolveObject.retreat == false){
                            this.view.updateCombatantStats(this.currentAttacker);
                            for(let i = 0; i < cycleTargets.length; i++){
                                this.view.updateCombatantStats(cycleTargets[i]);
                            }
                        }
                    }
                }
                resolve();
            })
        });
    }
    canUseHelpper(targets){
        return new Promise((resolve)=>{
            let resolveObject =  this.currentAttacker.nextAbility.canUse(this.currentAttacker, targets);
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
    playAbilityAnimationHelpper(targets, resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.playAbilityAnimations(this.currentAttacker, targets, resolveObject);
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.playAbilityAnimations(this.currentAttacker, targets, resolveObject);
                    resolve(resolveObject);
                }
            }, 2000);
        })
    }
    postAbilityAnimationsHelpper(resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    if(resolveObject.retreat == true){
                        this.view.removeCombatantCard(this.currentAttacker.battleId);
                    }else{
                        if(resolveObject.switchCombatant == true){
                            this.view.replaceCombatantCard(this.currentAttacker);
                        }else{
                            if(resolveObject.evade){
                                if(this.currentAttacker.nextAbility.sequenceType == 'chain'){
                                    this.view.printToBattleConsole(`${this.currentAttacker.abilityTargets[0].name} evades ${this.currentAttacker.name}'s ${this.currentAttacker.nextAbility.name}!`);
                                }else{
                                    this.view.printToBattleConsole(`${this.currentAttacker.name}'s misses!`);
                                }
                            }
                        }
                    }
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeAbilityAnimations()
                    resolve(resolveObject);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    if(resolveObject.retreat == true){
                        this.view.removeCombatantCard(this.currentAttacker.battleId);
                    }else{
                        if(resolveObject.switchCombatant == true){
                            this.view.replaceCombatantCard(this.currentAttacker);
                        }else{
                            if(resolveObject.evade){
                                if(this.currentAttacker.nextAbility.sequenceType == 'chain'){
                                    this.view.printToBattleConsole(`${this.currentAttacker.abilityTargets[0].name} evades ${this.currentAttacker.name}'s ${this.currentAttacker.nextAbility.name}!`);
                                }else{
                                    this.view.printToBattleConsole(`${this.currentAttacker.name}'s misses!`);
                                }
                            }
                        }
                    }
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.view.removeAbilityAnimations()
                    resolve(resolveObject);
                }
            }, this.currentAttacker.nextAbility.animationDuration);
        });
    }
    switchCombatantAnimationHelpper(resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            this.switchCombatantAnimation().then(()=>{
                document.addEventListener('click', this.skipEventHandler = ()=>{
                    if(flag == true){
                        flag = false;
                        document.removeEventListener('click', this.skipEventHandler);
                        this.view.removeAbilityAnimations()
                        resolve(resolveObject);
                    }
                })
                setTimeout(()=>{
                    if(flag == true){
                        flag = false;
                        document.removeEventListener('click', this.skipEventHandler);
                        this.view.removeAbilityAnimations()
                        resolve(resolveObject); 
                    }
                }, this.currentAttacker.nextAbility.animationDuration/2);
            });
        })
    }
    switchCombatantAnimation(resolveObject){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    this.view.replaceCombatantCard(this.currentAttacker);
                    document.removeEventListener('click', this.skipEventHandler);
                    resolve(resolveObject)
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    this.view.replaceCombatantCard(this.currentAttacker);
                    document.removeEventListener('click', this.skipEventHandler);
                    resolve(resolveObject)
                }
            }, this.currentAttacker.nextAbility.animationDuration/2);
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
            this.onEndBattle();
            return;
        }
        if(this.model.props.getBattle().currentAllyLimit == 0 ){
            this.view.printToBattleConsole('All allies have escaped!');
            this.onEndBattle();
            return;
        }
        if(this.model.props.getBattle().currentHostileLimit == 0 ){
            this.view.printToBattleConsole('All hostiles have escaped!');
            this.onEndBattle();
            return;
        }
        resolveFunction();  
    }
    onEndBattle(){
        setTimeout(()=>{
            this.props.switchScreen('overworld-screen');
            playMusic(this.model.props.getMap().biome.BackgroundMusicSrc);
        }, 2000);
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
        let forEnemy = false;
        if(side == 'hostile'){
            forEnemy = true;
        }
        for(let i = 0; i < this.model.activeCombatants.length; i++){
            if(this.model.activeCombatants[i].isHostile == forEnemy){
                combatantCount++;
            }
        }
        if(side == 'hostile'){
            let emptyCardSlots = this.model.props.getBattle().currentHostileLimit - combatantCount;
            let incomingHostileCombatants = [];
            for(let i = 0; i < emptyCardSlots; i++){
                if(this.model.hostileReinforcements.length > 0){
                    incomingHostileCombatants.push(this.model.hostileReinforcements[0]);
                    this.model.hostileReinforcements.splice(0, 1);
                }
            }
            return incomingHostileCombatants.reduce((chain, combatant)=>{
                return chain.then(()=>this.callReinforcementHelpper(combatant))
            }, Promise.resolve());
        }else{
            let emptyCardSlots = this.model.props.getBattle().currentAllyLimit - combatantCount;
            let count = [];
            for(let i = 0; i < emptyCardSlots; i++){
              count.push('slot');
            }
            return count.reduce((chain)=>{
                return chain.then(()=>this.chooseReinforcementHelpper(emptyCardSlots))
            }, Promise.resolve());
        }
    }
    chooseReinforcementHelpper(emptyCardSlots){
        return new Promise((resolve)=>{
            if(this.model.allyReinforcements.length > 0 && emptyCardSlots > 0){
                this.chooseReinforcement().then((returnedCombatant)=>{
                    for(let i = 0; i < this.model.allyReinforcements.length; i++){
                        if(returnedCombatant.battleId == this.model.allyReinforcements[i].battleId){
                            this.model.allyReinforcements.splice(i, 1);
                        }
                    }
                    return this.callReinforcementHelpper(returnedCombatant)//results in an extra two second wait where last message replays
                }).then(()=>{
                    resolve();
                })
            }else{
                resolve();
            }
        })
    }
    chooseReinforcement(){
        let flag = true;
        return new Promise((resolve)=>{
            document.addEventListener('click', this.skipEventHandler = ()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.props.switchScreen('party-screen');
                    this.props.getPartyController().view.hidePartyToggleBackButton();
                    this.props.getPartyController().createSelectButtons(resolve, this.model.allyReinforcements)
                    this.view.removeEntranceAnimations();
                    this.view.printToBattleConsole(``);
                }
            })
            setTimeout(()=>{
                if(flag == true){
                    flag = false;
                    document.removeEventListener('click', this.skipEventHandler);
                    this.props.switchScreen('party-screen');
                    this.props.getPartyController().view.hidePartyToggleBackButton();
                    this.props.getPartyController().createSelectButtons(resolve, this.model.allyReinforcements)
            
                    this.view.printToBattleConsole(``);
                }
            }, 2000);
       })
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
        this.model.makeCombatantsSelectable();
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

