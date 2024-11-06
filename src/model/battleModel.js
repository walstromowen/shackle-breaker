
import {getRandomArrayElement} from '../utility.js';
import { Ability, Retreat, Rest, Punch} from './misc/abilities.js';

export default class BattleModel{
    constructor(props){
        this.props = props;
        this.allCombatants = [];
        this.activeCombatants = [];
        this.allyReinforcements = [];
        this.hostileReinforcements = [];
        this.defeatedAllies = [];
        this.defeatedHostiles = [];
    }
    initialize(){
        this.allCombatants = [];
        this.activeCombatants = [];
        this.allyReinforcements = [];
        this.hostileReinforcements = [];
        this.defeatedAllies = [];
        this.defeatedHostiles = [];
        this.props.setSituation('battle');
        this.props.getBattle().resetCurrentCombatantLimit();
        this.allCombatants = this.props.getParty().concat(this.props.getBattle().hostiles);
        this.sortCombatants();
    }
    makeCombatantsSelectable(){
        for(let i = 0; i < this.allCombatants.length; i++){
            this.allCombatants[i].isSelectable = true;
        }
    }
    sortCombatants(){
        let allyCount = 0;
        let hostileCount = 0;
        for(let i = 0; i < this.allCombatants.length; i++){
            this.allCombatants[i].battleId = `b${i}`;
            if(this.allCombatants[i].isHostile == false){
                if(this.allCombatants[i].currentHP <= 0){
                    this.defeatedAllies.push(this.allCombatants[i])
                }else{
                    if(allyCount < this.props.getBattle().currentAllyLimit){
                        allyCount++;
                        this.activeCombatants.push(this.allCombatants[i]);
                    }else{
                        this.allyReinforcements.push(this.allCombatants[i]);
                    }
                }
            }
            if(this.allCombatants[i].isHostile == true){
                if(this.allCombatants[i].currentHP <= 0){
                    this.defeatedHostiles.push(this.allCombatants[i])
                }else{
                    if(hostileCount < this.props.getBattle().currentHostileLimit){
                        hostileCount++
                        this.activeCombatants.push(this.allCombatants[i]);
                    }else{
                        this.hostileReinforcements.push(this.allCombatants[i]);
                    }
                }
            }
        }
        if(allyCount < this.props.getBattle().currentAllyLimit){
            this.props.getBattle().currentAllyLimit = allyCount;
        }
        if(hostileCount < this.props.getBattle().currentHostileLimit){
            this.props.getBattle().currentHostileLimit = hostileCount;
        }
    }
    getActiveAllies(){
        let allies = this.activeCombatants.filter((combatant)=>{
            return combatant.isHostile == false;
        })
        return allies;
    }
    getActiveHostiles(){
        let hostiles = this.activeCombatants.filter((combatant)=>{
            return combatant.isHostile == true;
        })
        return hostiles;
    }
    getCombatant(battleId){
        for(let i = 0; i < this.activeCombatants.length; i ++){
            if(this.activeCombatants[i].battleId == battleId){
                return this.activeCombatants[i];
            }
        }
    }
    switchCombatants(activeCombatant, reinforcemnet){
        for(let i = 0; i < this.activeCombatants.length; i ++){
            if(this.activeCombatants[i].battleId == activeCombatant.battleId){
                if(this.activeCombatants[i].isHostile == false){
                    for(let j = 0; j < this.allyReinforcements.length; j++){
                        if(this.allyReinforcements[j].battleId == reinforcemnet.battleId){
                            this.allyReinforcements[j] = activeCombatant;
                            this.activeCombatants[i] = reinforcemnet;
                        }
                    }
                }else{
                    for(let j = 0; j < this.hostileReinforcements.length; j++){
                        if(this.hostileReinforcements[j].battleId == reinforcemnet.battleId){
                            this.hostileReinforcements[j] = activeCombatant;
                            this.activeCombatants[i] = reinforcemnet;
                        }
                    }
                }
                
            }
        }
    }
    chooseHostileAttacks(){
        for(let i = 0; i < this.activeCombatants.length; i++){
            if(this.activeCombatants[i].isHostile == true){
                this.activeCombatants[i].abilityTargets=[];
                this.activeCombatants[i].nextAbility = getRandomArrayElement(this.getCombinedAbilities(this.activeCombatants[i]));
                for(let j = 0; j < this.activeCombatants[i].nextAbility.targetCount; j++){
                    this.activeCombatants[i].abilityTargets.push(this.getRandomTarget(this.activeCombatants[i]));
                }
            }
        }
    }
    getRandomTarget(attacker){//error when multiple target attack has no more available targets
        let possibleTarget;
        let availableTargets = [];
        switch(attacker.nextAbility.defaultTarget){
            case 'self': 
                possibleTarget = attacker;
            break;
            case 'ally': 
                availableTargets = this.activeCombatants.filter((combatant)=>{
                    return (combatant.isHostile == attacker.isHostile && combatant.currentHP > 0);
                })
                if(availableTargets.length == 0){
                    return;
                }
                possibleTarget = getRandomArrayElement(availableTargets);
            break;
            case 'opponent': 
                availableTargets = this.activeCombatants.filter((combatant)=>{
                    return (combatant.isHostile != attacker.isHostile && combatant.currentHP > 0);
                })
                if(availableTargets.length == 0){
                    return;
                }
                possibleTarget = getRandomArrayElement(availableTargets);
            break;
        }
        return(possibleTarget);
    }
getAvailableTargets(attacker){
    let availableTargets = [];
    switch(attacker.nextAbility.defaultTarget){
        case 'ally': 
            availableTargets = this.activeCombatants.filter((combatant)=>{
                return (combatant.isHostile == attacker.isHostile && combatant.currentHP > 0);
            })
        break;
        case 'opponent': 
            availableTargets = this.activeCombatants.filter((combatant)=>{
                return (combatant.isHostile != attacker.isHostile && combatant.currentHP > 0);
            })
        break;
    }
    return availableTargets;
}

    /*
    getRandomTarget(attacker){//modify for buffs and healing attacks and possible splash attacks
        let flag1 = false;
        for(let i = 0; i < this.activeCombatants.length; i++){
            if(this.activeCombatants[i].currentHP > 0 && this.activeCombatants[i] !== attacker && this.activeCombatants[i].isHostile != attacker.isHostile){
                flag1 = true
                if(attacker.nextAbility.sequenceType == 'splash'){
                    let remainingTargets;
                    if(attacker.isHostile == true){
                        remainingTargets = this.getActiveAllies().length;
                    }else{
                        remainingTargets = this.getActiveHostiles().length;
                    }
                    if(attacker.abilityTargets.length >= remainingTargets){
                        flag1 = false
                    }
                }
            }
        }
        if(flag1){
            let flag2 = true;
            let target;
            while(flag2){
                target = getRandomArrayElement(this.activeCombatants);
                if(target.currentHP > 0 && target !== attacker && target.isHostile != attacker.isHostile){
                    if(attacker.nextAbility.sequenceType == 'splash'){
                        flag2 = false;
                        for(let j = 0; j <attacker.abilityTargets.length; j++){
                            if(target.battleId == attacker.abilityTargets[j].battleId){
                                flag2 = true;
                            }
                        }
                    }else{
                        flag2 = false;
                    }
                }
            }
            return target;
        }else{
            return false;
        }
    }
        */
    determineTurnOrder(){
        return this.activeCombatants.sort((a, b)=>{
            return (b.nextAbility.speedModifier*b.currentSpeed) - (a.nextAbility.speedModifier*a.currentSpeed);
        });
    }
    getCombinedAbilities(attacker){
        let combinedAbilities = [];
        let equipment = attacker.getEquipment(Object.keys(attacker.equipment));
        for(let i = 0; i < attacker.abilityArray.length; i++){
            combinedAbilities.push(attacker.abilityArray[i]);
        }
        for(let i = 0; i < equipment.length; i++){
            for(let j = 0; j < equipment[i].abilityArray.length; j++){
                let repeatCount = 0;
                let firstRepeatIndex = 0;
                for(let k = 0; k < combinedAbilities.length; k++){
                    if(equipment[i].abilityArray[j].name == combinedAbilities[k].name){
                        if(repeatCount == 0){
                            firstRepeatIndex = k;
                        }
                        repeatCount++;
                    }
                }
                if(repeatCount == 0){
                    combinedAbilities.push(equipment[i].abilityArray[j]);
                }
                if(repeatCount == 1){
                    let mergedAbility = this.createdMergedAbility(combinedAbilities[firstRepeatIndex], equipment[i].abilityArray[j]);
                    combinedAbilities[firstRepeatIndex] = mergedAbility;
                }
            }
        }
        if(attacker.isHostile == false){
            combinedAbilities.push(new Retreat({
                onActivate: ()=>{
                    this.onRetreat(attacker);
                }
            }));
            combinedAbilities.push(new Rest({}));
            if(attacker.equipment.mainHand == '' && attacker.equipment.offhand == ''){
                combinedAbilities.push(new Punch({}));
            }
        }
        return combinedAbilities;
    }
    getAvailableConsumableAbilities(){
        let consumableAbilities = [];
        let currentInventory = this.props.getInventory();
        for(let i = 0; i < currentInventory.length; i++){
            if(currentInventory[i].itemType == 'consumable' && currentInventory[i].inProgress == false && currentInventory[i].useSituations.includes('battle')){
                for(let j = 0; j < currentInventory[i].abilityArray.length; j++){
                    consumableAbilities.push(currentInventory[i].abilityArray[j])
                }
                
            }
        }
     
        return consumableAbilities;

    }
    makeConsumableItemsNoLongerInProgress(){
        let currentInventory = this.props.getInventory();
        for(let i = 0; i < currentInventory.length; i++){
            if(currentInventory[i].inProgess){
                currentInventory[i].inProgess = false;
            }
        }
    }
    getConsumables(){
        let consumables = [];
        let currentInventory = this.props.getInventory();
        for(let i = 0; i < currentInventory.length; i++){
            if(currentInventory[i].itemType == 'consumable'){
                    consumables.push(currentInventory[i])
            }
        }
        return consumables;
    }
    removeConsumableByItemIdFromInventory(consumableID){
        let inventory = this.props.getInventory();
        for(let i = 0; i < inventory.length; i++){
            if(inventory[i].itemId == consumableID){
                inventory.splice(i, 1);
                break;
            }
        }
    }
    onRetreat(combatant){
        if(combatant.isHostile){
            this.hostileReinforcements.push(combatant);
        }else{
            this.allyReinforcements.push(combatant);
        }
        for(let i = 0; i < this.activeCombatants.length; i++){
            if(this.activeCombatants[i].battleId == combatant.battleId){
                this.activeCombatants.splice(i, 1);
                if(combatant.isHostile){
                    this.hostileReinforcements.push(combatant);
                    this.props.getBattle().currentHostileLimit--;
                }else{
                    this.allyReinforcements.push(combatant);
                    this.props.getBattle().currentAllyLimit--;
                }
                break;
            }
        }
        
        
    }
    pileLoot(combatant){
        let droppedItems = combatant.dropLoot(1);//GOOD!
        if(droppedItems.length != 0){
            this.props.getBattle().loot = this.props.getBattle().loot.concat(droppedItems)//TODO battle loot not updating here
        }
    }
    lootBattle(){
        for(let i = 0; i < this.props.getBattle().loot.length; i++){
            this.props.getInventory().push(this.props.getBattle().loot[i]);
        }
        this.props.setGold(this.props.getGold() + this.props.getBattle().gold);
    }
    distributeXP(combatant){
        let activeAllys = this.activeCombatants.filter((combatant)=>{
            return combatant.isHostile == false;
        })
        for(let i = 0; i < activeAllys.length; i++){
            activeAllys[i].currentXP += Math.floor(combatant.dropXP()/activeAllys.length);
        }
    }
    pileGold(combatant){
        this.props.getBattle().gold += combatant.dropGold();
    }
    resetBattleLoot(){
        this.props.getBattle().gold = 0;
        this.props.getBattle().loot = [];
       
    }
    createdMergedAbility(ability1, ability2){
        let mergedAbility = new Ability({
            name: ability1.name,
            description: ability1.description,
            iconSrc: ability1.iconSrc,
            targetCount: ability1.targetCount,
            accuracy: ((ability1.accuracy + ability2.accuracy) / 2)*1.1,
            speedModifier:((ability1.speedModifier + ability2.speedModifier) / 2)*1.1,
            damageModifier: ((ability1.damageModifier + ability2.damageModifier) / 2)*1.1,
            healthCost: Math.floor(((ability1.healthCost + ability2.healthCost) / 2)*1.1),
            staminaCost: Math.floor(((ability1.staminaCost + ability2.staminaCost) / 2)*1.1),
            magicCost: Math.floor(((ability1.speedModifier + ability2.speedModifier) / 2)*1.1),

            damageTypes: ability1.damageTypes.concat(ability2.damageTypes.filter((item) => ability1.damageTypes.indexOf(item) < 0)),//remove duplicate damage types

            defaultTarget: ability1.defaultTarget,
            targetLock: ability1.targetLock,
            attackerAnimation: ability1.attackerAnimation,
            targetAnimation: ability1.targetAnimation,
            abilityAnimation: ability1.abilityAnimation,
            abilityAnimationImage: ability1.abilityAnimationImage,
            abilityAnimationDuration: ability1.abilityAnimationDuration,

            soundEffectSrc: ability1.soundEffectSrc,
            sequenceType: ability1.sequenceType,
            duelWeilded: true,
        })
        mergedAbility.updateMessage = ability1.updateMessage;
        mergedAbility.activate = ability1.activate;
        return mergedAbility;
    }
    formChange(combatant, nextForm){
        nextForm.battleId = combatant.battleId;
        this.activeCombatants[this.activeCombatants.indexOf(combatant)] = nextForm;
        this.allCombatants[this.allCombatants.indexOf(combatant)] = nextForm;
        return nextForm;
    }
    removeRemovableStatusEffects(){
        for(let i = 0; i < this.allCombatants.length; i++){
            for(let j = 0; j < this.allCombatants[i].statusArray.length; j++){
                if(this.allCombatants[i].statusArray[j].removeOnBattleEnd){
                    this.allCombatants[i].statusArray[j].onRemove();
                }
            }
        }
    }
}


