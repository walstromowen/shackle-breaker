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
export function toggleBattle(message, enemyArray, canRetreat){
    theController.printToGameConsole(message);
    theController.endEncounter(true);
    theController.toggleBattle(enemyArray, canRetreat);
    theController.nextRoom.enemyArray = enemyArray;
}
export function loot(message, itemArray, goldMin, goldMax){
    let goldAmount = Math.floor(Math.random() * ((goldMax*(Math.floor(theController.calculateAveragePartyLevel()/10)+1)) - goldMin) + goldMin);
    if(itemArray.length != 0 || goldAmount > 0){
        theController.printToGameConsole(message);
        if(itemArray.length != 0){
            for(let i = 0; i < itemArray.length; i++){
                theController.partyInventory.push(itemArray[i]);
                theController.printToGameConsole(`${itemArray[i].name}.`);
            }
        }
        if(goldAmount > 0){
            theController.partyGold = theController.partyGold + goldAmount;
            theController.printToGameConsole(`${goldAmount} gold.`);
        }
    }
    theController.updatePartyInventoryTab(theController.partyInventory);
    theController.endEncounter();
}
export function takeDamage(message, minPercentage, maxPercentage, targets){
    let damageOutput
    switch(targets){
        case "all":
            for(let i = 0; i < theController.party.length; i ++){
                damageOutput = Math.floor(Math.random() * ((theController.party[i].currentHP * maxPercentage) - (theController.party[i].currentHP * minPercentage) + 1) + (theController.party[i].currentHP * minPercentage));
                damageOutput = checkDamage(damageOutput, theController.party[i]);
                theController.party[i].currentHP = theController.party[i].currentHP - damageOutput;
                theController.printToGameConsole(message + ` ${theController.party[i].name} takes ${damageOutput} damage.`);
            }
            break;
        default:
            damageOutput = Math.floor(Math.random() * ((theController.party[0].currentHP * maxPercentage) - (theController.party[0].currentHP * minPercentage) + 1) + (theController.party[0].currentHP * minPercentage));
            damageOutput = checkDamage(damageOutput, theController.party[0]);
            theController.party[0].currentHP = theController.party[0].currentHP - damageOutput;
            theController.printToGameConsole(message + ` ${theController.party[0].name} takes ${damageOutput} damage.`);
            break;
    }
    theController.endEncounter();
}
export function regainHP(message, percentage){
    let hp = Math.floor(theController.party[0].maxHP * percentage);
    if(theController.party[0].currentHP + hp > theController.party[0].maxHP){
        hp = theController.party[0].maxHP - theController.party[0].currentHP;
    }
    theController.party[0].currentHP = theController.party[0].currentHP + hp;
    theController.printToGameConsole(`${message}` + ` ${theController.party[0].name} restores ${hp} health`);
    theController.endEncounter();
}
export function recieveStatusEffect(message, statusEffect){
    theController.printToGameConsole(message + ` ${theController.party[0].name} is ${statusEffect.name}.`);
    let flag = true;
    for(let i = 0; i < theController.party[0].statusArray.length; i++){
        if(theController.party[0].statusArray[i].name == statusEffect.name){
            theController.party[0].statusArray[i].currentCharges = theController.party[0].statusArray[i].maxCharges;
            flag = false;
            break;
        }
    }
    if(flag == true){
        theController.party[0].statusArray.push(statusEffect);
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
export function recruit(message, newCompanion){
    newCompanion.autoLevelUp(theController.party[0].level);
    newCompanion.scaleAttributes();
    theController.printToGameConsole(message);
    theController.party.push(newCompanion);
    theController.updateParty();
    theController.endEncounter();
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
