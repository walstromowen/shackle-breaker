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
    //I think you just need to fix the promise chain now
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
    //. no pause if not active statusEffects
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
//pause then attack (it activates and resolves at the same time)
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
 /* Does not work   
    takeTurn(weilder, target){
        Promise.allSettled(this.updateStatusEffects(weilder, "start"))
        .then((resolveValues)=>{
           return this.activateAbility(weilder, target);
        })
        .then((resolveValue)=>{
            return Promise.allSettled(this.updateStatusEffects(weilder, "end"));
        })
        .then((resolveValues)=>{
            theController.enablePlayerBattleControls();
        });
    }
*/
/*
    if(this.checkBattleStatus == false){
        if(this.isSecondTurn == false){
            this.isSecondTurn = true;
            this.takeTurn(target, weilder);
        }else{
            theController.enablePlayerBattleControls();
        }
    }else{
        theController.endBattle();
    }
*/






/*
 takeTurn(weilder, target, recIndex, initStatusArrayLength, type){ 
        if(recIndex < initStatusArrayLength){
            let newRecIndex = recIndex;
            if(weilder.statusArray[recIndex].type != type){//refire if statusEffect should not fire for start/end
                newRecIndex = recIndex + 1;
                this.takeTurn(weilder, target, newRecIndex, initStatusArrayLength, type);
            }
            setTimeout(()=>{
                if(weilder.statusArray[recIndex].update(type, recIndex) == true){//if false, the status effect was removed
                    newRecIndex = recIndex + 1;    //once the length of the array changes, the index of the next status will change to you need to account for that 
                }else{
                    initStatusArrayLength = initStatusArrayLength - 1;
                }
                theController.scrollToBottom("game-console");
                this.takeTurn(weilder, target, newRecIndex, initStatusArrayLength, type);//this.takeTurn(weilder, target, ***newRecIndex***, initStatusArrayLength, type)***newRecIndex*** is 1 when it should be 0 and type is start?
            }, 1000);
        }else{
            setTimeout(()=>{
                if(type == "start"){
                    weilder.nextMove.canUse(weilder);
                    if(weilder.nextMove.activate(weilder, target) == false){ //false if retreat
                        theController.updatePlayerStats();
                        theController.scrollToBottom("game-console");
                        setTimeout(()=>{
                            theController.toggleMap();
                        }, 2000);
                        return;
                    }
                    this.takeTurn(weilder, target, 0, weilder.statusArray.length, "end");  //rec index must be 0 because you need to cycle through array again
                }else{
                    if(this.endTurn() == false){ //this check should be called 2 times per round
                        if(this.isSecondTurn == false){
                            this.isSecondTurn = true;
                            this.takeTurn(target, weilder, 0, target.statusArray.length, "start");
                        }else{
                            theController.enablePlayerBattleControls();
                        }
                    }else{
                        theController.endBattle();
                    }
                }
            }, 1000);
        }
    }*/


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
