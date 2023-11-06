import {controller as theController} from "./main.js"

export default class Battle{
    constructor(currentCharacter, enemy){
        this.currentCharacter = currentCharacter;
        this.enemy = enemy;
        this.battlePhase = "firstTurn";
        this.initialize();
    }
    initialize(){
        for(let i = 0; i < this.currentCharacter.statusArray.length; i++){
            this.currentCharacter.statusArray[i].onApplied();
        }
    }
    determineFirstTurn(abilityIndex, inventoryIndex){
        this.battlePhase = "firstTurn";
        if(inventoryIndex === undefined){
            this.currentCharacter.nextMove = this.currentCharacter.abilityArray[abilityIndex];
        }else{
            this.currentCharacter.nextMove = theController.partyInventory[inventoryIndex].abilityArray[abilityIndex];
        }
        if(this.currentCharacter.nextMove.canUse(this.currentCharacter, this.currentCharacter) == false){
            return;
        }
        this.enemy.nextMove = this.enemy.chooseAttack();
        if(this.enemy.nextMove.canUse(this.enemy, this.currentCharacter) == false){
            this.determineFirstTurn(abilityIndex, inventoryIndex);
            return;
        };
        theController.disableCharacterBattleControls();
        if(this.currentCharacter.nextMove.speedMultiplier * this.currentCharacter.currentSpeed >= this.enemy.currentSpeed * this.enemy.nextMove.speedMultiplier){
            this.takeTurn(this.currentCharacter, this.enemy);
        }else{
            this.takeTurn(this.enemy, this.currentCharacter);
        }
    }
   
    takeTurn(weilder, target){
        this.cycleStatusEffects(this.updateStatusEffect, weilder.statusArray, "start")
        .then(()=>{
            return this.activateAbility(weilder, target);
        })
        .then(()=>{
            return this.cycleStatusEffects(this.updateStatusEffect, weilder.statusArray, "end");
        })
        .then(()=>{
            if(this.battlePhase == "secondTurn"){
                theController.enableCharacterBattleControls();
            }else{
                this.battlePhase = "secondTurn";
                this.takeTurn(target, weilder);
            }
        }) 
    }
    cycleStatusEffects(fn, statusArray, type){
        let promiseArray = [];
        let counter = 0;
        for(let i = 0; i < statusArray.length; i++){
            if(type == statusArray[i].type){
                promiseArray.push(fn(statusArray[i], counter, type));
                counter ++;
            }else{
                promiseArray.push(fn(statusArray[i], -1, type));
            }
            
        }
        counter = 0;
        for(let j = 0; j < statusArray.length; j++){
            if(statusArray[counter].currentCharges <= 0){
                statusArray[counter].onRemove();
                statusArray.splice(counter, 1);
            }else{
                counter ++;
            }
        }
        return Promise.all(promiseArray);
    }

    updateStatusEffect(status, counter, type){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                status.update(type);
                theController.updateCharacterStats();
                theController.updateEnemyStats();
                if(theController.battle.checkBattleStatus() == true){
                    theController.endBattle();
                    //reject here?
                }else{
                    resolve();
                }
            }, 2000 * (1 + counter));
        });
    }

    activateAbility(weilder, target){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                weilder.nextMove.canUse(weilder, this.currentCharacter);
                if(weilder.nextMove.activate(weilder, target) == "retreat"){ 
                    this.battlePhase = "retreat";
                }
                let counter = 0;
                for(let j = 0; j < target.statusArray.length; j++){
                    if(target.statusArray[counter].currentCharges <= 0){
                        target.statusArray[counter].onRemove();
                        target.statusArray.splice(counter, 1);
                    }else{
                        counter ++;
                    }
                }
                counter = 0;
                for(let j = 0; j < weilder.statusArray.length; j++){
                    if(weilder.statusArray[counter].currentCharges <= 0){
                        weilder.statusArray[counter].onRemove();
                        weilder.statusArray.splice(counter, 1);
                    }else{
                        counter ++;
                    }
                }
                theController.updateCharacterStats();
                theController.updateEnemyStats();
                if(this.checkBattleStatus() == true){//false means battle is still on
                    for(let i = 0; i < this.currentCharacter.statusArray.length; i++){
                        this.currentCharacter.statusArray[i].onRemove();
                    }
                    theController.endBattle();
                }else{
                    resolve();
                }
            }, 2000); 
         });
    }
    checkBattleStatus(){
        if(this.currentCharacter.currentHP <= 0 || this.enemy.currentHP <= 0 || this.battlePhase == "retreat"){
            return true;  
        } 
        return false;
    }
    loot(){
        let loot = this.enemy.dropLoot();
        let itemList = "";
        if(loot != "" || this.enemy.gold > 0){
            if(loot != ""){
                theController.partyInventory.push(loot);
                itemList = itemList + `${loot.name}, `;
                theController.updatePartyInventoryTab(theController.partyInventory);
            }
            if(this.enemy.gold > 0){
                itemList = itemList + `${this.enemy.gold} gold.`;
                this.currentCharacter.currentGold = this.currentCharacter.currentGold + this.enemy.gold;
            }else{
                itemList[itemList.length-2] = ".";
            }
            theController.printToGameConsole(`${this.enemy.name} drops: ${itemList}`);
        }
        this.currentCharacter.currentXP = this.currentCharacter.currentXP + this.enemy.XP;
    }
}
