import {controller as theController} from "./main.js";

export default class Battle{
    constructor(player, enemy){
        this.player = player;
        this.enemy = enemy;
        this.isSecondTurn = false;
    }
    determineFirstTurn(abilityIndex, inventoryIndex){
        this.isSecondTurn = false;
        if(inventoryIndex === undefined){
            this.player.nextMove = this.player.abilityArray[abilityIndex];
        }else{
            this.player.nextMove = this.player.inventory[inventoryIndex].abilityArray[abilityIndex];
        }
        if(this.player.nextMove.canUse(this.player) == false){
            return;
        }
        this.enemy.nextMove = this.enemy.chooseAttack();
        this.enemy.nextMove.canUse(this.enemy);
        theController.disablePlayerBattleControls();
        if(this.player.nextMove.speed + this.player.currentSpeed >= this.enemy.currentSpeed + this.enemy.nextMove.speed){
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
            if(this.isSecondTurn == true){
                theController.enablePlayerBattleControls();
            }else{
                this.isSecondTurn = true;
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
                if(theController.battle.checkBattleStatus() == true){
                    theController.endBattle();
                }else{
                    resolve();
                }
            }, 2000 * (1 + counter));
        });
    }

    activateAbility(weilder, target){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                weilder.nextMove.canUse(weilder);
                if(weilder.nextMove.activate(weilder, target) == false){ //false if retreat
                    theController.updatePlayerStats();//may need to change for enemy retreats
                    theController.scrollToBottom("game-console");
                    //reject here?
                }else{
                    if(this.checkBattleStatus() == true){//false means battle is still on
                        theController.endBattle();
                        //reject here?
                    }else{
                        resolve();
                    }
                }
            }, 2000); 
         });
    }
    checkBattleStatus(){
        theController.scrollToBottom("game-console");
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        if(this.player.currentHP <= 0 || this.enemy.currentHP <= 0){
            return true;     
        }else{
            return false;
        }
    }
    loot(){
        let loot = this.enemy.dropLoot();
        if(loot != ""){
            this.player.inventory.push(loot);
            theController.updatePlayerInventoryTab(this.player.inventory);
        }
    }
}
