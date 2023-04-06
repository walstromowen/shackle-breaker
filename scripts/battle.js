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
            this.takeTurn(this.player, this.enemy, 0, this.player.statusArray.length, "start");
        }else{
            this.takeTurn(this.enemy, this.player, 0, this.enemy.statusArray.length, "start");
        }
    }

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
    }
    
    endTurn(){
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
