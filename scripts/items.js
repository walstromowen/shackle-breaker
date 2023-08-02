import {Slash, Stab, Eviscerate, Block, Fireball, Channel, DrinkHealthPotion, DrinkStaminaPotion, DrinkMagicPotion, ThrowKnife, ThrowPoisonedKnife} from "./abilities.js"

class Equipment{}
class Consumable{}
export class LinenShirt extends Equipment{
    constructor(){
        super();
        this.name = "linen shirt";
        this.type = "torso";
        this.level = 0;
        this.attack = 0;
        this.armor = 1;
        this.speed = 0;
        this.abilityArray = [];
    }
}
export class LinenPants extends Equipment{
    constructor(){
        super();
        this.name = "linen pants";
        this.type = "legs";
        this.level = 0;
        this.attack = 0;
        this.armor = 1;
        this.speed = 0;
        this.abilityArray = [];
    }
}
export class WoodDagger extends Equipment{
    constructor(){
        super();
        this.name = "wood dagger";
        this.type = "weapon";
        this.level = 0;
        this.attack = 2;
        this.armor = 0;
        this.speed = 4;
        this.abilityArray = [new Stab(), new Slash()];
    }
}
export class WoodSpear extends Equipment{
    constructor(){
        super();
        this.name = "wood spear";
        this.type = "weapon";
        this.level = 0;
        this.attack = 4;
        this.armor = 0;
        this.speed = 1;
        this.abilityArray = [new Stab()];
    }
}
export class WoodSword extends Equipment{
    constructor(){
        super();
        this.name = "wood sword";
        this.type = "weapon";
        this.level = 0;
        this.attack = 3;
        this.armor = 0;
        this.speed = 2;
        this.abilityArray = [new Stab(), new Slash()];
    }
}
export class WoodSideDagger extends Equipment{
    constructor(){
        super();
        this.name = "wood side dagger";
        this.type = "offhand";
        this.level = 0;
        this.attack = 1;
        this.armor = 0;
        this.speed = 1;
        this.abilityArray = [new Eviscerate];
    }
}
export class WoodSheild extends Equipment{
    constructor(){
        super();
        this.name = "wood sheild";
        this.type = "offhand";
        this.level = 0;
        this.attack = 0;
        this.armor = 1;
        this.speed = -1;
        this.abilityArray = [new Block()];
    }
}
export class WoodFireStaff extends Equipment{
    constructor(){
        super();
        this.name = "wood fire staff";
        this.type = "weapon";
        this.level = 0;
        this.attack = 3;
        this.armor = 0;
        this.speed = 1;
        this.abilityArray = [new Fireball(), new Channel()];
    }
}
export class LeatherHelmet extends Equipment{
    constructor(){
        super();
        this.name = "leather helmet";
        this.type = "head";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherHood extends Equipment{
    constructor(){
        super();
        this.name = "leather helmet";
        this.type = "head";
        this.level = 0;
        this.attack = 0;
        this.armor = 1;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherGloves extends Equipment{
    constructor(){
        super();
        this.name = "iron gloves";
        this.type = "arms";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherChestplate extends Equipment{
    constructor(){
        super();
        this.name = "leather chestplate";
        this.type = "torso";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherGreaves extends Equipment{
    constructor(){
        super();
        this.name = "leather greaves";
        this.type = "legs";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class LeatherBoots extends Equipment{
    constructor(){
        super();
        this.name = "leather boots";
        this.type = "feet";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = 1;
        this.abilityArray = [];
    }
}
export class IronSheild extends Equipment{
    constructor(){
        super();
        this.name = "iron sheild";
        this.type = "offhand";
        this.level = 0;
        this.attack = 0;
        this.armor = 4;
        this.speed = -1;
        this.abilityArray = [new Block()];
    }
}
export class IronHelmet extends Equipment{
    constructor(){
        super();
        this.name = "iron helmet";
        this.type = "head";
        this.level = 0;
        this.attack = 0;
        this.armor = 4;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronGuantlets extends Equipment{
    constructor(){
        super();
        this.name = "iron guantlets";
        this.type = "arms";
        this.level = 0;
        this.attack = 0;
        this.armor = 4;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronChainmail extends Equipment{
    constructor(){
        super();
        this.name = "iron chainmail";
        this.type = "torso";
        this.level = 0;
        this.attack = 0;
        this.armor = 4;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronGreaves extends Equipment{
    constructor(){
        super();
        this.name = "iron greaves";
        this.type = "legs";
        this.level = 0;
        this.attack = 0;
        this.armor = 4;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronBoots extends Equipment{
    constructor(){
        super();
        this.name = "iron boots";
        this.type = "feet";
        this.level = 0;
        this.attack = 0;
        this.armor = 4;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class HealthPotion extends Consumable{
    constructor(){
        super();
        this.name = "healing potion";
        this.type = "consumable";
        this.abilityArray = [new DrinkHealthPotion];
    }
}

export class StaminaPotion extends Consumable{
    constructor(){
        super();
        this.name = "stamina potion";
        this.type = "consumable";
        this.abilityArray = [new DrinkStaminaPotion];
    }
}

export class MagicPotion extends Consumable{
    constructor(){
        super();
        this.name = "magic potion";
        this.type = "consumable";
        this.abilityArray = [new DrinkMagicPotion];
    }
}

export class ThrowingKnife extends Consumable{
    constructor(){
        super();
        this.name = "throwing knife";
        this.type = "consumable";
        this.level = 0;
        this.abilityArray = [new ThrowKnife];
    }
}
export class PoisonedThrowingKnife extends Consumable{
    constructor(){
        super();
        this.name = "poisoned throwing knife";
        this.type = "consumable";
        this.level = 0;
        this.abilityArray = [new ThrowPoisonedKnife];
    }
}