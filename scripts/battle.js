import {controller as theController} from "./main.js"

export default class Battle{
    constructor(player, enemy){
        this.player = player;
        this.enemy = enemy;
        this.battlePhase = "firstTurn";
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
        this.enemy.nextMove.canUse(this.enemy, this.player);
        theController.disablePlayerBattleControls();
        if(this.player.nextMove.speedMultiplier * this.player.currentSpeed >= this.enemy.currentSpeed + this.enemy.nextMove.speedMultiplier){
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
                theController.scrollToBottom("game-console");
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
                theController.scrollToBottom("game-console");
                theController.updatePlayerStats();
                theController.updateEnemyStats();
                if(this.checkBattleStatus() == true){//false means battle is still on
                    theController.endBattle();
                }else{
                    resolve();
                }
            }, 2000); 
         });
    }
    checkBattleStatus(){
        if(this.player.currentHP <= 0){
            return true;  
        } 
        if(this.enemy.currentHP <= 0){
            this.player.currentStamina = this.player.maxStamina;
            this.player.currentMagic = this.player.maxMagic;
            this.enemy.currentStamina = this.enemy.maxStamina;
            this.enemy.currentMagic = this.enemy.maxMagic;
            return true;   
        }
        if(this.battlePhase == "retreat"){
            this.player.currentStamina = this.player.maxStamina;
            this.player.currentMagic = this.player.maxMagic;
            this.enemy.currentStamina = this.enemy.maxStamina;
            this.enemy.currentMagic = this.enemy.maxMagic;
            return true;
        }
        return false;
    }
    loot(){
        let loot = this.enemy.dropLoot();
        if(loot != ""){
            this.player.inventory.push(loot);
            theController.updatePlayerInventoryTab(this.player.inventory);
        }
    }
}
