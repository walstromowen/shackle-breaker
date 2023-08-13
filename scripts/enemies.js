import {Slash, Block, Bite, Pounce, LeechLife, ArcaneDart, ArcaneBlast, SpitBile, Devour, Channel, Fireball} from "./abilities.js"
import {LinenShirt, LinenPants, WoodDagger, WoodSpear, WoodSword, 
        WoodSideDagger, WoodSheild, WoodFireStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, IronSheild, IronHelmet, IronGuantlets, IronChainmail, 
        IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedThrowingKnife} from "./items.js";

class Enemy{
    constructor(){
        this.statusArray = [];
    }
    chooseAttack(){
        return this.abilityArray[Math.floor(Math.random()*this.abilityArray.length)];
    }
    dropLoot(){
        if(Math.floor(Math.random()*this.lootChanceMultiplier < 1)){
            return this.lootArray[Math.floor(Math.random()*this.lootArray.length)];
        }else{
            return "";
        }
    }
}
export class Skeleton extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "skeleton";
        this.imageSrc = "media/skeleton.jpg"
        this.maxHP = 8 + playerLevel; 
        this.currentHP = this.maxHP;
        this.maxStamina = 8 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 8 + playerLevel;
        this.currentMagic = this.maxMagic;
        this.basePhysicalDefense = 1;
        this.currentPhysicalDefense = this.basePhysicalDefense;
        this.baseMagicDefense = 1;
        this.currentMagicDefense =  this.baseMagicDefense;
        this.basePhysicalAttack = 2 + playerLevel;
        this.currentPhysicalAttack = this.basePhysicalAttack;
        this.baseMagicAttack = 2 + playerLevel;
        this.currentMagicAttack = this.baseMagicAttack;
        this.baseSpeed = 1;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Slash, new Block];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new LinenShirt, new LinenPants, new WoodDagger, 
                          new WoodSpear, new WoodSword, new WoodSideDagger, 
                          new WoodSheild, new LeatherHelmet, new LeatherHood, 
                          new LeatherGloves, new LeatherChestplate, new LeatherGreaves, 
                          new LeatherBoots, new IronSheild, new IronHelmet, new IronGuantlets, 
                          new IronChainmail, new IronGreaves, new IronBoots, 
                          new HealthPotion, new StaminaPotion, new ThrowingKnife];
    }
}
export class Bat extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "bat";
        this.imageSrc = "media/bat.jpg"
        this.maxHP = 4 + playerLevel ; 
        this.currentHP = this.maxHP;
        this.maxStamina = 10 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0 + playerLevel;
        this.currentMagic = this.maxMagic;
        this.basePhysicalDefense = 0;
        this.currentPhysicalDefense = this.basePhysicalDefense;
        this.baseMagicDefense = 0;
        this.currentMagicDefense =  this.baseMagicDefense;
        this.basePhysicalAttack = 2 + playerLevel;
        this.currentPhysicalAttack = this.basePhysicalAttack;
        this.baseMagicAttack = 2 + playerLevel;
        this.currentMagicAttack = this.baseMagicAttack;
        this.baseSpeed = 2;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new LeechLife];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion];
    }
}
export class Wolf extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "wolf";
        this.imageSrc = "media/wolf.jpg"
        this.maxHP = 6 + playerLevel;
        this.currentHP = this.maxHP;
        this.maxStamina = 12 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0;
        this.currentMagic = this.maxMagic;
        this.basePhysicalDefense = 0;
        this.currentPhysicalDefense = this.basePhysicalDefense;
        this.baseMagicDefense = 0;
        this.currentMagicDefense =  this.baseMagicDefense;
        this.basePhysicalAttack = 2 + playerLevel;
        this.currentPhysicalAttack = this.basePhysicalAttack;
        this.baseMagicAttack = 2 + playerLevel;
        this.currentMagicAttack = this.baseMagicAttack;
        this.baseSpeed = 2;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Pounce];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion];
    }
}
export class Royalmage extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "royal mage";
        this.imageSrc = "media/royal-mage.jpg"
        this.maxHP = 15 + playerLevel;
        this.currentHP = this.maxHP;
        this.maxStamina = 15 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 15 + playerLevel;
        this.currentMagic = this.maxMagic;
        this.basePhysicalDefense = 1;
        this.currentPhysicalDefense = this.basePhysicalDefense;
        this.baseMagicDefense = 3;
        this.currentMagicDefense =  this.baseMagicDefense;
        this.basePhysicalAttack = 2 + playerLevel;
        this.currentPhysicalAttack = this.basePhysicalAttack;
        this.baseMagicAttack = 2 + playerLevel;
        this.currentMagicAttack = this.baseMagicAttack;
        this.baseSpeed = 1;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new ArcaneDart, new ArcaneBlast];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new WoodFireStaff, new MagicPotion];
    }
}
export class CaveSpider extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "cave spider";
        this.imageSrc = "media/cave-spider.jpg"
        this.maxHP = 6 + playerLevel ; 
        this.currentHP = this.maxHP;
        this.maxStamina = 10 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0 + playerLevel;
        this.currentMagic = this.maxMagic;
        this.basePhysicalDefense = 0;
        this.currentPhysicalDefense = this.basePhysicalDefense;
        this.baseMagicDefense = 0;
        this.currentMagicDefense =  this.baseMagicDefense;
        this.basePhysicalAttack = 2 + playerLevel;
        this.currentPhysicalAttack = this.basePhysicalAttack;
        this.baseMagicAttack = 2 + playerLevel;
        this.currentMagicAttack = this.baseMagicAttack;
        this.baseSpeed = 2;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new SpitBile];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion, new PoisonedThrowingKnife];
    }
}
export class Groveguardian extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "grove guardian";
        this.imageSrc = "media/grove-guardian.jpg"
        this.maxHP = 20 + playerLevel*2 ; 
        this.currentHP = this.maxHP;
        this.maxStamina = 20 + playerLevel*2 ; 
        this.currentStamina = this.maxStamina;
        this.maxMagic = 20 + playerLevel*2 ; 
        this.currentMagic = this.maxMagic;
        this.basePhysicalDefense = 2;
        this.currentPhysicalDefense = this.basePhysicalDefense;
        this.baseMagicDefense = 2;
        this.currentMagicDefense =  this.baseMagicDefense;
        this.basePhysicalAttack = 3 + playerLevel;
        this.currentPhysicalAttack = this.basePhysicalAttack;
        this.baseMagicAttack = 3 + playerLevel;
        this.currentMagicAttack = this.baseMagicAttack;
        this.baseSpeed = 1;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Devour];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion];
    }
}