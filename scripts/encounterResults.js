import {controller as theController} from "./main.js"
import {LinenShirt, LinenPants, WoodDagger, WoodSpear, WoodSword, 
    WoodSideDagger, WoodSheild, WoodFireStaff, LeatherHelmet, 
    LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
    LeatherBoots, IronSheild, IronHelmet, IronGuantlets, IronChainmail, 
    IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, 
    ThrowingKnife, PoisonedThrowingKnife, Meteorite} from "./items.js";
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

export class OpenChest{
    constructor(item){
        this.item = item;
    }
    trigger(player){
        player.inventory.push(this.item);
        theController.updatePlayerInventoryTab(player.inventory);
        theController.printToGameConsole(`${player.name} opens the chest and finds a ${this.item.name}`);
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
    constructor(item, enemy){
        this.enemy = enemy;
        this.enemy.lootChanceMultiplier = 0;
        this.enemy.lootArray = [item];
    }
    trigger(player){
        theController.printToGameConsole(`Just as ${player.name} reaches to open the chest, a ${this.enemy.name} jumps out of the shadows and races towards ${player.name}!`);
        theController.endEncounter(true);
        theController.toggleBattle(this.enemy);
        player.nextRoom.enemy = this.enemy;
    }
}
export class Leave{
    trigger(player){
        theController.printToGameConsole(`${player.name} moves on.`);
        theController.endEncounter();
    }
}