import {controller as theController} from "./main.js"

export function leave(message){
    theController.printToGameConsole(message);
    theController.endEncounter();
}
export function retry(message){
    theController.printToGameConsole(message);
    theController.disablePlayerEncounterControls();
    theController.toggleEncounter(theController.encounter);
}
export function removeDecision(message, name){
    theController.printToGameConsole(message);
    theController.disablePlayerEncounterControls();
    for(let i = 0; i < theController.encounter.decisionArray.length; i++){
        if(theController.encounter.decisionArray[i].name == name){
            theController.encounter.decisionArray.splice(i, 1);
            break;
        }
    }
    theController.toggleEncounter(theController.encounter);
}
export function toggleNewEncounter(message, nextEncounter){
       theController.printToGameConsole(message);
       theController.disablePlayerEncounterControls();
       theController.toggleEncounter(nextEncounter);
}
export function toggleBattle(message, enemy){
    theController.printToGameConsole(message);
    theController.endEncounter(true);
    theController.toggleBattle(enemy);
    theController.player.nextRoom.enemy = enemy;
}
export function loot(message, itemArray, goldMin, goldMax){
    let itemList = "\n";
    for(let i = 0; i < itemArray.length; i++){
        theController.player.inventory.push(itemArray[i]);
        itemList = itemList + itemArray[i].name + "\n";
    }
    let goldAmount = Math.floor(Math.random() * (goldMax - goldMin) + goldMin);
    if(goldAmount > 0){
        itemList = itemList + `${goldAmount} gold.`;
    }
    theController.printToGameConsole(message + `${theController.player.name} finds the following items: ${itemList}.`);
    theController.updatePlayerInventoryTab(theController.player.inventory);
    theController.endEncounter();
}
export function takeDamage(message, minPercentage, maxPercentage){
    let damageOutput = Math.floor(Math.random() * ((theController.player.currentHP * maxPercentage) - (theController.player.currentHP * minPercentage) + 1) + (theController.player.currentHP * minPercentage));
    damageOutput = checkDamage(damageOutput, theController.player);
    theController.player.currentHP = theController.player.currentHP - damageOutput;
    theController.printToGameConsole(message + ` ${theController.player.name} takes ${damageOutput} damage.`);
    theController.endEncounter();
}
export function regainHP(message, percentage){
    let hp = Math.floor(theController.player.maxHP * percentage);
    if(theController.player.currentHP + hp > theController.player.maxHP){
        hp = theController.player.maxHP - theController.player.currentHP;
    }
    theController.player.currentHP = theController.player.currentHP + hp;
    theController.printToGameConsole(`${message}` + ` ${theController.player.name} restores ${hp} health`);
    theController.endEncounter();
}
export function recieveStatusEffect(message, statusEffect){
    theController.printToGameConsole(message + ` ${theController.player.name} is ${statusEffect.name}.`);
    let flag = true;
    for(let i = 0; i < theController.player.statusArray.length; i++){
        if(theController.player.statusArray[i].name == statusEffect.name){
            theController.player.statusArray[i].currentCharges = theController.player.statusArray[i].maxCharges;
            flag = false;
            break;
        }
    }
    if(flag == true){
        theController.player.statusArray.push(statusEffect);
    }
    theController.endEncounter();
}
export function changeMap(message, biome){
    theController.printToGameConsole(message);
    theController.generateNewMap(biome, theController.player.level);
    theController.endEncounter();
}
export function initiateTrade(message, inventoryArray){
    removeDecision(message, "trade");
    theController.toggleTrading(inventoryArray);
    theController.disablePlayerEncounterControls();
    setTimeout(()=>{
        document.getElementById("merchant-inventory-container").style.display = "block";
        theController.enablePlayerEncounterControls();
    }, 2000);
}
function checkDamage(damageOutput, target){
    if(damageOutput < 0){
        return 0;
    }
    if(target.currentHP - damageOutput < 0){
        theController.animateVitalBar(target, "health");
        return target.currentHP;
    }
    else{
        theController.animateVitalBar(target, "health");
        return damageOutput;
    }
}
