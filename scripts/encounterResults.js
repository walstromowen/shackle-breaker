import {controller as theController} from "./main.js"
import {getRandomItem } from "./items.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian} from "./enemies.js";
import {UnlockedTreasureChest, MysteriousDoor2, MysteriousDoor3} from  "./encounters.js";
import {MoveOn} from "./encounterDecisions.js";


export function leave(player){
    theController.printToGameConsole(`${player.name} moves on.`);
    theController.endEncounter();
}
export function showTravelingMerchantInventory(player){
    theController.printToGameConsole(`${player.name} offers to trade.`);
    theController.encounter.decisionArray = [new MoveOn()];
    theController.toggleTrading([getRandomItem(), getRandomItem(), getRandomItem(), getRandomItem(), getRandomItem()]);
    theController.disablePlayerEncounterControls();
    setTimeout(()=>{
        document.getElementById("merchant-inventory-container").style.display = "block";
        theController.enablePlayerEncounterControls();
    }, 2000);

}
class RecieveDebuff{
    checkDamage(damageOutput, target){
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
}

export class LootChest{
    trigger(player){
        let newItem = getRandomItem();
        player.inventory.push(newItem);
        if(Math.floor(Math.random()*2 == 0)){
            let newItem2 = getRandomItem();
            player.inventory.push(newItem2);
            theController.printToGameConsole(`${player.name} opens the chest and finds ${newItem.name} and ${newItem2.name}.`);
        }else{
            theController.printToGameConsole(`${player.name} opens the chest and finds ${newItem.name}.`);
        }
        theController.updatePlayerInventoryTab(player.inventory);
        theController.endEncounter();
    }
}
export class OpenChestArrowTrap extends RecieveDebuff{
    trigger(player){
        let damageOutput = Math.floor(Math.random() * ((player.currentHP * 0.25) - (player.currentHP * 0.15) + 1) + (player.currentHP * 0.15));
        damageOutput = this.checkDamage(damageOutput, player);
        player.currentHP = player.currentHP - damageOutput;
        theController.printToGameConsole(`${player.name} opens the chest but triggers a trap! An arrrow flies up from the chest hits ${player.name} for ${damageOutput} damage!`);
        theController.endEncounter();
    }
}
export class OpenChestAttractEnemy{
    trigger(player){
        theController.printToGameConsole(`Just as ${player.name} reaches to open the chest, something emerges from the shadows and races towards ${player.name}!`);
        theController.endEncounter(true);
        let newEnemy = theController.map.mapEnviorment.generateEnemy(player.level);
        theController.toggleBattle(newEnemy);
        player.nextRoom.enemy = newEnemy;
    }
}
export class UnlockTreasureChest{
     trigger(player){
        theController.printToGameConsole(`${player.name} unlocks the chest!`);
        theController.disablePlayerEncounterControls();
        theController.toggleEncounter(new UnlockedTreasureChest());
    }
}
export class SucessfulAltusAssasination{
    trigger(player){
        let newItem = getRandomItem();
        player.inventory.push(newItem);
        theController.updatePlayerInventoryTab(player.inventory);
        theController.printToGameConsole(`${player.name} eliminates the offical without a sound. After searching the offical, ${player.name} slips away quietly with the official's ${newItem.name}.`);
        theController.endEncounter();
    }
}
export class FailedAltusAssasination{
    trigger(player){
        theController.printToGameConsole(`${player.name} approaches the official quietly, only to find the offical has found ${player.name} first!`);
        theController.endEncounter(true);
        let newEnemy = new AltusMage(player.level);
        theController.toggleBattle(newEnemy);
        player.nextRoom.enemy = newEnemy;
    }
}
export class MysteriousDoorCollapses{
    trigger(player){
        theController.printToGameConsole(`The gate collapses into a heap of rubble! The magic glow recedes...`);
        theController.endEncounter();
    }
}
export class BreakSealMysteriousDoor1{
    trigger(player){
       theController.printToGameConsole(`The door's mechanism shudders...`);
       theController.disablePlayerEncounterControls();
       theController.toggleEncounter(new MysteriousDoor2());
   }
}
export class BreakSealMysteriousDoor2{
    trigger(player){
       theController.printToGameConsole(`The door's mechanism shudders violently...`);
       theController.disablePlayerEncounterControls();
       theController.toggleEncounter(new MysteriousDoor3());
   }
}
export class BreakSealMysteriousDoor3{
    trigger(player){
        theController.printToGameConsole(`The gate opens and pulls ${player.name} inside!`);
        theController.generateNewMap("portal");
        theController.endEncounter();
    }
}
export class RestfulSleep{
    trigger(player){
        let hp = Math.floor(player.maxHP * 0.5);
        if(player.currentHP + hp > player.maxHP){
            hp = player.maxHP - player.currentHP;
        }
        weilder.currentHP = weilder.currentHP + hp;
        theController.printToGameConsole(`${player.name} sleeps soundly and resotres ${hp} health!`);
        theController.endEncounter();
    }
}
export class LootCabin{
    trigger(player){
        let newItem = getRandomItem();
        player.inventory.push(newItem);
        if(Math.floor(Math.random()*2 == 0)){
            let newItem2 = getRandomItem();
            player.inventory.push(newItem2);
            theController.printToGameConsole(`${player.name} loots the cabin and finds ${newItem.name} and ${newItem2.name}.`);
        }else{
            theController.printToGameConsole(`${player.name} loots the cabin and finds ${newItem.name}.`);
        }
        theController.updatePlayerInventoryTab(player.inventory);
        theController.endEncounter();
    }
}
export class EnterCabinAttractEnemy{
    trigger(player){
        theController.printToGameConsole(`${player.name} enters the cabin and finds it is already occupied!`);
        theController.endEncounter(true);
        let newEnemy = theController.map.mapEnviorment.generateEnemy(player.level);
        theController.toggleBattle(newEnemy);
        player.nextRoom.enemy = newEnemy;
    }
}