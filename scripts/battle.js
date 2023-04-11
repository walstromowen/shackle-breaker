import {controller as theController} from "./main.js";

export default class Battle{
    constructor(player, enemy){
        this.player = player;
        this.enemy = enemy;
        this.isSecondTurn = false;
        this.takeTurnCounter = 1;
    }
    determineFirstTurn(abilityIndex){
        this.isSecondTurn = false;
        this.player.nextMove = this.player.abilityArray[abilityIndex];
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
        this.updateStatusEffects(weilder,"start")
        .then((USEsResolve)=>{
        return this.activateAbility(weilder, target);
        })
        .then((AAResolve)=>{
            return this.updateStatusEffects(weilder, "end");
        })
        .then((AAResolve)=>{
            if(this.isSecondTurn == true){
                theController.enablePlayerBattleControls();
            }else{
                this.isSecondTurn = true;
                this.takeTurn(target, weilder);
            }
        })
    }
    updateStatusEffects(weilder, type){
        if(weilder.statusArray.length !=0){
            let promiseArray = [];
            for(let i = 0; i < weilder.statusArray.length; i++){
                promiseArray.push(
                    new Promise((resolve, reject)=>{
                        if(weilder.statusArray[i].type == type){
                            setTimeout(()=>{
                                weilder.statusArray[i].update(type, i);
                                if(this.checkBattleStatus() == true){//false means battle is still on
                                    theController.endBattle();
                                }else{
                                    resolve("status " + i);
                                }
                            }, 2000 * i + 2000); //add 2000 because of overlap with activate ability
                        }else{
                            resolve("status none");
                        }
                    })
                );
            }
            return Promise.all(promiseArray);
        }else{
            return new Promise((resolve, reject)=>{
                resolve("no active status effects")
            });
        }
    }
    activateAbility(weilder, target){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                weilder.nextMove.canUse(weilder);
                if(weilder.nextMove.activate(weilder, target) == false){ //false if retreat
                    theController.updatePlayerStats();//may need to change for enemy retreats
                    theController.scrollToBottom("game-console");
                    theController.toggleMap();
                }
                if(this.checkBattleStatus() == true){//false means battle is still on
                    theController.endBattle();
                }else{
                    resolve("activateAbility resolved");
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
    useConsumable(inventoryIndex){
        if(this.player.isInBattle == false){
            if(this.player.inventory[inventoryIndex].consume(this.player, this.enemy) == false){
                return;
            }
            theController.updatePlayerStats();
            this.player.inventory.splice(inventoryIndex, 1);
            theController.updatePlayerInventoryTab(this.player.inventory);
        }else{
            theController.disablePlayerBattleControls();
            this.enemy.nextMove = this.enemy.chooseAttack();
            setTimeout(()=>{ 
                if(this.inventory[inventoryIndex].consume(this.player, this.enemy) == true){
                    this.updateStatusEffects("start");
                    this.inventory.splice(inventoryIndex, 1);
                    theController.updatePlayerInventoryTab(this.inventory);
                    theController.disablePlayerBattleControls();
                    this.updateStatusEffects("end");
                }
                if(this.endTurn() == false){
                    this.isFirst = true;//allows current enemy to attack;
                    this.determineSecondMove();
                }else{
                    theController.endBattle();
                }
            }, 1000);
        }
    }
}
