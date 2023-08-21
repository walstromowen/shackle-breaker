import {controller as theController} from "./main.js"
import {getRandomItem } from "./items.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian} from "./enemies.js";
export function leave(player){
    theController.printToGameConsole(`${player.name} moves on.`);
    theController.endEncounter();
}
export function progressEncounter(followingEncounter){
    theController.toggleEncounter(followingEncounter);
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
        theController.updatePlayerInventoryTab(player.inventory);
        theController.printToGameConsole(`${player.name} opens the chest and finds a ${newItem.name}`);
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
