import {controller as theController} from "./main.js"

export default class Battle{
    constructor(player, enemy){
        this.player = player;
        this.enemy = enemy;
        this.battlePhase = "firstTurn";
        this.initialize();
    }
    initialize(){
        for(let i = 0; i < this.player.statusArray.length; i++){
            this.player.statusArray[i].onApplied();
        }
    }
    determineFirstTurn(abilityIndex, inventoryIndex){
        this.battlePhase = "firstTurn";
        if(inventoryIndex === undefined){
            this.player.nextMove = this.player.abilityArray[abilityIndex];
        }else{
            this.player.nextMove = this.player.inventory[inventoryIndex].abilityArray[abilityIndex];
        }
        if(this.player.nextMove.canUse(this.player, this.player) == false){
            return;
        }
        this.enemy.nextMove = this.enemy.chooseAttack();
        if(this.enemy.nextMove.canUse(this.enemy, this.player) == false){
            this.determineFirstTurn(abilityIndex, inventoryIndex);
            return;
        };
        theController.disablePlayerBattleControls();
        if(this.player.nextMove.speedMultiplier * this.player.currentSpeed >= this.enemy.currentSpeed * this.enemy.nextMove.speedMultiplier){
            this.takeTurn(this.player, this.enemy);
        }else{
            this.takeTurn(this.enemy, this.player);
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
                theController.enablePlayerBattleControls();
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
                theController.updatePlayerStats();
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
                weilder.nextMove.canUse(weilder, this.player);
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
                theController.updatePlayerStats();
                theController.updateEnemyStats();
                if(this.checkBattleStatus() == true){//false means battle is still on
                    for(let i = 0; i < this.player.statusArray.length; i++){
                        this.player.statusArray[i].onRemove();
                    }
                    theController.endBattle();
                }else{
                    resolve();
                }
            }, 2000); 
         });
    }
    checkBattleStatus(){
        if(this.player.currentHP <= 0 || this.enemy.currentHP <= 0 || this.battlePhase == "retreat"){
            return true;  
        } 
        return false;
    }
    loot(){
        let loot = this.enemy.dropLoot();
        let itemList = "";
        if(loot != "" || this.enemy.gold > 0){
            if(loot != ""){
                this.player.inventory.push(loot);
                itemList = itemList + `${loot.name}, `;
                theController.updatePlayerInventoryTab(this.player.inventory);
            }
            if(this.enemy.gold > 0){
                itemList = itemList + `${this.enemy.gold} gold.`;
                this.player.currentGold = this.player.currentGold + this.enemy.gold;
            }else{
                itemList[itemList.length-2] = ".";
            }
            theController.printToGameConsole(`${this.enemy.name} drops: ${itemList}`);
        }
        this.player.currentXP = this.player.currentXP + this.enemy.XP;
    }
}
