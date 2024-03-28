
import {getRandomArrayElement} from '../utility.js';

export default class BattleModel{
    constructor(props){
        this.props = props;
        this.allCombatants = [];
        this.activeCombatants = [];
        this.allyReinforcements = [];
        this.hostileReinforcements = [];
        this.defeatedAllys = [];
        this.defeatedHostiles = [];
    }
    initialize(){
        this.allCombatants = this.props.getParty().concat(this.props.getBattle().hostiles);
        this.sortCombatants();
    }
    sortCombatants(){
        let allyCount = 0;
        let hostileCount = 0;
        for(let i = 0; i < this.allCombatants.length; i++){
            this.allCombatants[i].battleId = `b${i}`;
            if(this.allCombatants[i].isHostile == false){
                if(this.allCombatants[i].currentHp <= 0){
                    this.defeatedAllys.push(this.allCombatants[i])
                }else{
                    if(allyCount < 3){
                        allyCount++;
                        this.activeCombatants.push(this.allCombatants[i]);
                    }else{
                        this.allyReinforcements.push(this.allCombatants[i]);
                    }
                }
            }
            if(this.allCombatants[i].isHostile == true){
                if(this.allCombatants[i].currentHp <= 0){
                    this.defeatedHostiles.push(this.allCombatants[i])
                }else{
                    if(hostileCount < 3){
                        hostileCount++
                        this.activeCombatants.push(this.allCombatants[i]);
                    }else{
                        this.hostileReinforcements.push(this.allCombatants[i]);
                    }
                }
            }
        }
    }
    getActiveAllys(){
        let allys = this.activeCombatants.filter((combatant)=>{
            return combatant.isHostile == false;
        })
        return allys;
    }
    getCombatant(battleId){
        for(let i = 0; i < this.activeCombatants.length; i ++){
            if(this.activeCombatants[i].battleId == battleId){
                return this.activeCombatants[i];
            }
        }
    }
    chooseHostileAttacks(){
        for(let i = 0; i < this.activeCombatants.length; i++){
            if(this.activeCombatants[i].isHostile == true){
                this.activeCombatants[i].nextAbility = getRandomArrayElement(this.activeCombatants[i].abilityArray);
                for(let j = 0; j < this.activeCombatants[i].nextAbility.targetCount; j++){
                    this.activeCombatants[i].abilityTargets.push(this.getRandomTarget(this.activeCombatants[i]));
                }
            }
        }
    }
    getRandomTarget(attacker){//modify for buffs and healing attacks and possible splash attacks
        let flag1 = false;
        for(let i = 0; i < this.activeCombatants.length; i++){
            if(this.activeCombatants[i].currentHP > 0 && this.activeCombatants[i] !== attacker && this.activeCombatants[i].isHostile != attacker.isHostile){
                flag1 = true
            }
        }
        if(flag1){
            let flag2 = true;
            let target;
            while(flag2){
                target = getRandomArrayElement(this.activeCombatants);
                if(target.currentHP > 0 && target !== attacker && target.isHostile != attacker.isHostile){
                    flag2 = false;
                }
            }
            return target;
        }else{
            return false;
        }
    }
    determineTurnOrder(){
        return this.activeCombatants.sort((a, b)=>{
            return (b.nextAbility.speedModifier*b.currentSpeed) - (a.nextAbility.speedModifier*a.currentSpeed);
        });
    }
}
