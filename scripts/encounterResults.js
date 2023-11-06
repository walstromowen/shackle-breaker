import {controller as theController} from "./main.js"

export function leave(message){
    theController.printToGameConsole(message);
    theController.endEncounter();
}
export function retry(message){
    theController.printToGameConsole(message);
    theController.disableCharacterEncounterControls();
    theController.toggleEncounter(theController.encounter);
}
export function removeDecision(message, name){
    theController.printToGameConsole(message);
    theController.disableCharacterEncounterControls();
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
       theController.disableCharacterEncounterControls();
       theController.toggleEncounter(nextEncounter);
}
export function toggleBattle(message, enemy){
    theController.printToGameConsole(message);
    theController.endEncounter(true);
    theController.toggleBattle(enemy);
    theController.nextRoom.enemy = enemy;
}
export function loot(message, itemArray, goldMin, goldMax){
    let itemList = "\n";
    for(let i = 0; i < itemArray.length; i++){
        theController.currentCharacter.inventory.push(itemArray[i]);
        itemList = itemList + itemArray[i].name + "\n";
    }
    let goldAmount = Math.floor(Math.random() * (goldMax - goldMin) + goldMin);
    if(goldAmount > 0){
        theController.currentCharacter.currentGold += goldAmount;
        itemList = itemList + `${goldAmount} gold.`;
    }
    theController.printToGameConsole(message + `${theController.currentCharacter.name} finds the following items: ${itemList}`);
    theController.updatePartyInventoryTab(theController.currentCharacter.inventory);
    theController.endEncounter();
}
export function takeDamage(message, minPercentage, maxPercentage){
    let damageOutput = Math.floor(Math.random() * ((theController.currentCharacter.currentHP * maxPercentage) - (theController.currentCharacter.currentHP * minPercentage) + 1) + (theController.currentCharacter.currentHP * minPercentage));
    damageOutput = checkDamage(damageOutput, theController.currentCharacter);
    theController.currentCharacter.currentHP = theController.currentCharacter.currentHP - damageOutput;
    theController.printToGameConsole(message + ` ${theController.currentCharacter.name} takes ${damageOutput} damage.`);
    theController.endEncounter();
}
export function regainHP(message, percentage){
    let hp = Math.floor(theController.currentCharacter.maxHP * percentage);
    if(theController.currentCharacter.currentHP + hp > theController.currentCharacter.maxHP){
        hp = theController.currentCharacter.maxHP - theController.currentCharacter.currentHP;
    }
    theController.currentCharacter.currentHP = theController.currentCharacter.currentHP + hp;
    theController.printToGameConsole(`${message}` + ` ${theController.currentCharacter.name} restores ${hp} health`);
    theController.endEncounter();
}
export function recieveStatusEffect(message, statusEffect){
    theController.printToGameConsole(message + ` ${theController.currentCharacter.name} is ${statusEffect.name}.`);
    let flag = true;
    for(let i = 0; i < theController.currentCharacter.statusArray.length; i++){
        if(theController.currentCharacter.statusArray[i].name == statusEffect.name){
            theController.currentCharacter.statusArray[i].currentCharges = theController.currentCharacter.statusArray[i].maxCharges;
            flag = false;
            break;
        }
    }
    if(flag == true){
        theController.currentCharacter.statusArray.push(statusEffect);
    }
    theController.endEncounter();
}
export function changeMap(message, biome, layout){
    theController.printToGameConsole(message);
    theController.generateNewMap(biome, layout);
    theController.endEncounter();
}
export function initiateTrade(message, inventoryArray){
    removeDecision(message, "trade");
    theController.toggleTrading(inventoryArray);
    theController.disableCharacterEncounterControls();
    setTimeout(()=>{
        document.getElementById("merchant-inventory-container").style.display = "block";
        theController.enableCharacterEncounterControls();
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
