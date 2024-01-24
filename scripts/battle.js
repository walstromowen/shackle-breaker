import {controller as theController} from "./main.js"
import { SwitchCombatant } from "./abilities.js";

export default class Battle{
    constructor(friendlyParty, hostileParty, canRetreat){
        this.canRetreat = canRetreat;
        this.friendlyParty = friendlyParty;
        this.hostileParty = hostileParty;
        this.battlePhase = "firstTurn";
        this.loot = [];
        this.gold  = 0;
        this.xp = 0;
        this.initialize();
    }
    initialize(){
        for(let x = 0; x < this.friendlyParty.length; x++){
            for(let y = 0; y < this.friendlyParty[x].statusArray.length; y++){
                this.friendlyParty[x].statusArray[y].onApplied();
            }   
        }
        for(let x = 0; x < this.hostileParty.length; x++){
            for(let y = 0; y < this.hostileParty[x].statusArray.length; y++){
                this.hostileParty[x].statusArray[y].onApplied();
            }   
        }
        for(let x = 0; x < this.hostileParty.length; x++){
            this.gold = this.gold + this.hostileParty[x].gold;
        }
        for(let x = 0; x < this.hostileParty.length; x++){
            this.xp = this.xp + this.hostileParty[x].xp;
        }
    }
    determineFirstTurn(abilityIndex, inventoryOrPartyIndex){
        this.battlePhase = "firstTurn";
        if(abilityIndex == "switch"){
            this.friendlyParty[0].nextMove = new SwitchCombatant(inventoryOrPartyIndex);
        }else{
            if(inventoryOrPartyIndex === undefined){
                this.friendlyParty[0].nextMove = this.friendlyParty[0].abilityArray[abilityIndex];
            }else{
                this.friendlyParty[0].nextMove = theController.partyInventory[inventoryOrPartyIndex].abilityArray[abilityIndex];
            }
        }
        if(this.friendlyParty[0].nextMove.canUse(this.friendlyParty[0], this.friendlyParty[0]) == false){
            return;
        }
        this.hostileParty[0].nextMove = this.hostileParty[0].chooseAttack();
        if(this.hostileParty[0].nextMove.canUse(this.hostileParty[0], this.friendlyParty[0]) == false){
            this.determineFirstTurn(abilityIndex, inventoryOrPartyIndex);
            return;
        };
        theController.disableCharacterBattleControls();
        if(this.friendlyParty[0].nextMove.speedMultiplier * this.friendlyParty[0].currentSpeed >= this.hostileParty[0].currentSpeed * this.hostileParty[0].nextMove.speedMultiplier){
            this.takeTurn(this.friendlyParty, this.hostileParty) 
        }else{
            this.takeTurn(this.hostileParty, this.friendlyParty);
        }
    }
   
    takeTurn(attackingParty, defendingParty){
        this.cycleStatusEffects(this.updateStatusEffect, attackingParty[0].statusArray, "start")
        .then(()=>{
            return this.activateAbility(attackingParty, defendingParty);
        })
        .then(()=>{
            return this.cycleStatusEffects(this.updateStatusEffect, attackingParty[0].statusArray, "end");
        })
        .then(()=>{
            if(this.battlePhase == "secondTurn"){
                theController.enableCharacterBattleControls();
            }else{
                this.battlePhase = "secondTurn";
                this.takeTurn(defendingParty, attackingParty);
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
                let casualties = [];
                let casualtyTypes = [];
                if(theController.battle.friendlyParty[0].currentHP <= 0){
                    casualtyTypes.push("friendly");
                    casualties.push(theController.battle.friendlyParty[0]);
                    if(theController.battle.friendlyParty[0].isSummon == false){
                        theController.wanderingCompanions.push(theController.battle.friendlyParty[0]);
                    }
                    theController.battle.friendlyParty.splice(0, 1);//this also makes "current player" next character in line
                    if(theController.battle.friendlyParty.length <= 0){
                        theController.battle.endBattle();
                        return;
                    }
                }
                if(theController.battle.hostileParty[0].currentHP <= 0){
                    let drop = theController.battle.hostileParty[0].dropLoot();
                    if(drop != ""){
                        theController.battle.loot.push(drop);
                    }
                    for(let i = 0; i < theController.battle.friendlyParty.length; i++){
                        if(theController.battle.hostileParty[0].isSummon == false){
                            theController.battle.friendlyParty[i].currentXP = theController.battle.friendlyParty[i].currentXP + Math.floor(theController.battle.hostileParty[0].xp/theController.battle.friendlyParty.length);
                        }
                    }
                    casualtyTypes.push("hostile");
                    casualties.push(theController.battle.hostileParty[0]);
                    theController.battle.hostileParty.splice(0, 1);
                    if(theController.battle.hostileParty.length <= 0){
                        theController.battle.endBattle();
                        return;
                    }
                }
                if(theController.battle.battlePhase == "retreat"){
                    theController.battle.endBattle();
                    return;
                }
                if(casualties.length != 0){
                    theController.battle.displayCasualties(casualties, casualtyTypes);
                    return;
                }
                resolve();
            }, 2000 * (1 + counter));
        });
    }

    activateAbility(attackingParty, defendingParty){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                attackingParty[0].nextMove.canUse(attackingParty[0], this.friendlyParty[0]);
                if(attackingParty[0].nextMove.activate(attackingParty[0], defendingParty[0]) == "retreat"){ 
                    this.battlePhase = "retreat";
                }
                let counter = 0;
                for(let j = 0; j < defendingParty[0].statusArray.length; j++){
                    if(defendingParty[0].statusArray[counter].currentCharges <= 0){
                        defendingParty[0].statusArray[counter].onRemove();
                        defendingParty[0].statusArray.splice(counter, 1);
                    }else{
                        counter ++;
                    }
                }
                counter = 0;
                for(let j = 0; j < attackingParty[0].statusArray.length; j++){
                    if(attackingParty[0].statusArray[counter].currentCharges <= 0){
                        attackingParty[0].statusArray[counter].onRemove();
                        attackingParty[0].statusArray.splice(counter, 1);
                    }else{
                        counter ++;
                    }
                }
                theController.updateCharacterStats();
                theController.updateEnemyStats();
                let casualtyTypes = [];
                let casualties = [];
                if(this.friendlyParty[0].currentHP <= 0){
                    casualtyTypes.push("friendly");
                    casualties.push(this.friendlyParty[0]);
                    if(this.friendlyParty[0].isSummon == false){
                        theController.wanderingCompanions.push(this.friendlyParty[0]);
                    }
                    this.friendlyParty.splice(0, 1);//this also makes "current player" next character in line
                    if(this.friendlyParty.length <= 0){
                        this.endBattle();
                        return;
                    }
                }
                if(this.hostileParty[0].currentHP <= 0){
                    casualtyTypes.push("hostile");
                    casualties.push(this.hostileParty[0]);
                    let drop = this.hostileParty[0].dropLoot();
                    if(drop != ""){
                        this.loot.push(drop);
                    }
                    for(let i = 0; i < this.friendlyParty.length; i++){
                        if(this.hostileParty[0].isSummon == false){
                            this.friendlyParty[i].currentXP = this.friendlyParty[i].currentXP + Math.floor(this.hostileParty[0].xp/this.friendlyParty.length);
                        }
                    }
                    this.hostileParty.splice(0, 1);
                    if(this.hostileParty.length <= 0){
                        this.endBattle();
                        return;
                    }
                }
                if(this.battlePhase == "retreat"){
                    this.endBattle();
                    return;
                }
                if(casualties.length != 0){
                    this.displayCasualties(casualties, casualtyTypes);
                    return;
                }
                resolve();
            }, 2000); 
         });
    }
    endBattle(){
        let remainingFriendlyParty = this.friendlyParty.filter((entity)=>{
            return entity.isSummon == false;
        });
        this.friendlyParty = remainingFriendlyParty;
        theController.party = this.friendlyParty;
        for(let x = 0; x < this.friendlyParty; x++){
            for(let y = 0; y < this.friendlyParty[x].statusArray.length; y++){
                this.friendlyParty[x].statusArray[y].onRemove();
            }
            theController.calcCharacterAbilitiesAndStats(x)   
        }
        let remainingHostileParty = this.hostileParty.filter((entity)=>{
            return entity.isSummon == false;
        });
        this.hostileParty = remainingHostileParty;
        for(let x = 0; x < this.hostileParty.length; x++){
            for(let y = 0; y < this.hostileParty[x].statusArray.length; y++){
                this.hostileParty[x].statusArray[y].onRemove();
            }
            this.hostileParty[x].resetStats();   
        }    
        theController.endBattle();
    }
    displayCasualties(casualties, casualtyTypes){
        setTimeout(()=>{
            if(casualties.length == 1){
                theController.printToGameConsole(`${casualties[0].name} has been slain!`)
            }
            if(casualties.length == 2){
                theController.printToGameConsole(`${casualties[0].name} and ${casualties[1].name} have been slain!`)
            }
            this.updateParties(casualties, casualtyTypes);
        }, 2000)
    }
    updateParties(casualties, casualtyTypes){
        setTimeout(()=>{
            for(let i = 0; i < casualties.length; i ++){
                if(casualtyTypes[i]=="friendly"){
                    theController.updateParty();
                    theController.printToGameConsole(`${this.friendlyParty[0].name} joins the fight!`)
                }
                if(casualtyTypes[i]=="hostile"){
                    theController.updateEnemyStats();
                    theController.printToGameConsole(`${this.hostileParty[0].name} joins the fight!`);
                    if(this.hostileParty[0].isBoss == true){
                        if(document.getElementById('music-player').src != this.hostileParty[0].battleMusicSrc){
                            document.getElementById('music-player').src = this.hostileParty[0].battleMusicSrc;
                            document.getElementById('music-player').play();
                        }
                    }
                }
            }
            theController.enableCharacterBattleControls();
        }, 2000);
    }
    lootEnemies(){
        if(this.loot.length != 0 || this.gold > 0){
            theController.printToGameConsole(`${this.friendlyParty[0].name} loots:`);
            if(this.loot.length != 0){
                for(let i = 0; i < this.loot.length; i++){
                    theController.partyInventory.push(this.loot[i]);
                    theController.printToGameConsole(`${this.loot[i].name}.`);
                }
            }
            if(this.gold > 0){
                theController.partyGold = theController.partyGold + this.gold;
                theController.printToGameConsole(`${this.gold} gold.`);
            }
        }
        theController.updatePartyInventoryTab(theController.partyInventory);
    }
}
