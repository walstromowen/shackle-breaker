import {Slash, Strike, Stab, Eviscerate, Block, Fireball, Channel, Cleanse, SheildBash, LightBeam, DrinkHealthPotion, DrinkStaminaPotion, DrinkMagicPotion, ThrowKnife, ThrowPoisonedKnife, SmashMeteorite, UseAntidote, UseAloeRemedy,
        ThrowNet, Immolate, LightningBolt, Energize, IceShard, IceBarrier, DrainLife, Siphon, ArcaneDart, ArcaneBlast} from "./abilities.js"

export function getRandomItem(){
    let itemArray = [new LinenShirt, new LinenPants, new Dagger, new BlacksmithHammer, new Spear, new Shortsword, 
                new Shiv, new Buckler, new FireStaff, new LightningStaff, new IceStaff, new ArcaneStaff, new LightStaff, new DarkStaff, new LeatherHelmet, 
                new LeatherHood, new LeatherGloves, new LeatherChestplate, new LeatherGreaves, 
                new LeatherBoots, new KiteSheild, new IronHelmet, new IronGuantlets, new IronChainmail, 
                new IronGreaves, new IronBoots, new HealthPotion, new StaminaPotion, new MagicPotion, 
                new ThrowingKnife, new PoisonedKnife, new Meteorite, new Antidote, new AloeRemedy, new Net];
                return itemArray[Math.floor(Math.random() * itemArray.length)];
    }
export class LinenShirt {
    constructor(){
        this.name = "linen shirt";
        this.type = "torso";
        this.level = 0;
        this.price = 5;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.abilityArray = [];
    }
}
export class LinenPants {
    constructor(){
        this.name = "linen pants";
        this.type = "legs";
        this.level = 0;
        this.price = 5;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.abilityArray = [];
    }
}
export class Dagger {
    constructor(){
        this.name = "dagger";
        this.type = "weapon";
        this.level = 0;
        this.price = 10;
        this.bluntAttack = 1;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 4;
        this.abilityArray = [new Stab(), new Slash()];
    }
}
export class BlacksmithHammer {
    constructor(){
        this.name = "blacksmith hammer";
        this.type = "weapon";
        this.level = 0;
        this.price = 20;
        this.bluntAttack = 2;
        this.pierceAttack = 1;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 4;
        this.abilityArray = [new Strike()];
    }
}
export class Spear {
    constructor(){
        this.name = "spear";
        this.type = "weapon";
        this.level = 0;
        this.price = 20;
        this.bluntAttack = 2;
        this.pierceAttack = 4;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 1;
        this.abilityArray = [new Stab()];
    }
}
export class Shortsword {
    constructor(){
        this.name = "shortsword";
        this.type = "weapon";
        this.level = 0;
        this.price = 20;
        this.bluntAttack = 3;
        this.pierceAttack = 3;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 2;
        this.abilityArray = [new Stab(), new Slash()];
    }
}
export class Shiv {
    constructor(){
        this.name = "shiv";
        this.type = "offhand";
        this.level = 0;
        this.price = 20;
        this.bluntAttack = 1;
        this.pierceAttack = 1;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 1;
        this.abilityArray = [new Eviscerate];
    }
}
export class Buckler {
    constructor(){
        this.name = "Buckler";
        this.type = "offhand";
        this.level = 0;
        this.price = 20;
        this.bluntAttack = 1;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 0;
        this.abilityArray = [new Block()];
    }
}
export class FireStaff {
    constructor(){
        this.name = "fire staff";
        this.type = "weapon";
        this.level = 0;
        this.price = 300;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 1;
        this.elementalAttack = 3;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 1;
        this.speed = 0;
        this.abilityArray = [new Fireball(), new Immolate(), new Strike(), new Channel()];
    }
}
export class LightningStaff {
    constructor(){
        this.name = "fire staff";
        this.type = "weapon";
        this.level = 0;
        this.price = 300;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 1;
        this.elementalAttack = 3;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 1;
        this.speed = 0;
        this.abilityArray = [new LightningBolt(), new Energize(), new Strike(), new Channel()];
    }
}
export class IceStaff {
    constructor(){
        this.name = "ice staff";
        this.type = "weapon";
        this.level = 0;
        this.price = 300;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 1;
        this.elementalAttack = 3;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 1;
        this.speed = 0;
        this.abilityArray = [new IceShard(), new IceBarrier(), new Strike(), new Channel()];
    }
}
export class ArcaneStaff {
    constructor(){
        this.name = "arcane staff";
        this.type = "weapon";
        this.level = 0;
        this.price = 300;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 3;
        this.elementalAttack = 1;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 1;
        this.elementalDefense = 0;
        this.speed = 0;
        this.abilityArray = [new ArcaneDart(), new ArcaneBlast(), new Strike(), new Channel()];
    }
}
export class LightStaff {
    constructor(){
        this.name = "light staff";
        this.type = "weapon";
        this.level = 0;
        this.price = 300;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 2;
        this.elementalAttack = 2;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 1;
        this.elementalDefense = 0;
        this.speed = 0;
        this.abilityArray = [new LightBeam(), new Cleanse(), new Strike(), new Channel()];
    }
}
export class DarkStaff {
    constructor(){
        this.name = "dark staff";
        this.type = "weapon";
        this.level = 0;
        this.price = 300;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 3;
        this.elementalAttack = 1;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 1;
        this.elementalDefense = 0;
        this.speed = 0;
        this.abilityArray = [new DrainLife(), new Siphon(), new Strike(), new Channel()];
    }
}
export class LeatherHelmet {
    constructor(){
        this.name = "leather helmet";
        this.type = "head";
        this.level = 0;
        this.price = 30;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherHood {
    constructor(){
        this.name = "leather hood";
        this.type = "head";
        this.level = 0;
        this.price = 35;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 3;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherGloves {
    constructor(){
        this.name = "leather gloves";
        this.type = "arms";
        this.level = 0;
        this.price = 30;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherChestplate {
    constructor(){
        this.name = "leather chestplate";
        this.type = "torso";
        this.level = 0;
        this.price = 50;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherGreaves {
    constructor(){
        this.name = "leather greaves";
        this.type = "legs";
        this.level = 0;
        this.price = 40;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherBoots {
    constructor(){
        this.name = "leather boots";
        this.type = "feet";
        this.level = 0;
        this.price = 30;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class KiteSheild {
    constructor(){
        this.name = "kite sheild";
        this.type = "offhand";
        this.level = 0;
        this.price = 150;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -5;
        this.abilityArray = [new Block(), new SheildBash()];
    }
}
export class IronHelmet {
    constructor(){
        this.name = "iron helmet";
        this.type = "head";
        this.level = 0;
        this.price = 200;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronGuantlets {
    constructor(){
        this.name = "iron guantlets";
        this.type = "arms";
        this.level = 0;
        this.price = 200;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronChainmail {
    constructor(){
        this.name = "iron chainmail";
        this.type = "torso";
        this.level = 0;
        this.price = 200;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronGreaves {
    constructor(){
        this.name = "iron greaves";
        this.type = "legs";
        this.level = 0;
        this.price = 200;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronBoots {
    constructor(){
        this.name = "iron boots";
        this.type = "feet";
        this.level = 0;
        this.price = 200;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class HealthPotion {
    constructor(){
        this.name = "healing potion";
        this.type = "consumable";
        this.price = 50;
        this.abilityArray = [new DrinkHealthPotion()];
    }
}

export class StaminaPotion {
    constructor(){
        this.name = "stamina potion";
        this.type = "consumable";
        this.price = 20;
        this.abilityArray = [new DrinkStaminaPotion()];
    }
}

export class MagicPotion {
    constructor(){
        this.name = "magic potion";
        this.type = "consumable";
        this.price = 20;
        this.abilityArray = [new DrinkMagicPotion()];
    }
}

export class ThrowingKnife {
    constructor(){
        this.name = "throwing knife";
        this.type = "consumable";
        this.level = 0;
        this.price = 20;
        this.abilityArray = [new ThrowKnife()];
    }
}
export class PoisonedKnife {
    constructor(){  
        this.name = "poisoned knife";
        this.type = "consumable";
        this.level = 0;
        this.price = 50;
        this.abilityArray = [new ThrowPoisonedKnife()];
    }
}
export class Meteorite {
    constructor(){
        this.name = "meteorite";
        this.type = "consumable";
        this.level = 0;
        this.price = 150;
        this.abilityArray = [new SmashMeteorite()];
    }
}
export class Antidote {
    constructor(){
        this.name = "antidote";
        this.type = "consumable";
        this.level = 0;
        this.price = 100;
        this.abilityArray = [new UseAntidote()];
    }
}
export class AloeRemedy {
    constructor(){
        this.name = "aloe remedy";
        this.type = "consumable";
        this.level = 0;
        this.price = 100;
        this.abilityArray = [new UseAloeRemedy()];
    }
}
export class Net {
    constructor(){
        this.name = "net";
        this.type = "consumable";
        this.level = 0;
        this.price = 50;
        this.abilityArray = [new ThrowNet()];
    }
}