import {Slash, Block, Bite, Pounce, LeechLife, ArcaneDart, ArcaneBlast} from "./abilities.js"
import {Dagger, Spear, IronSheild, IronHelmet, IronChainmail, IronGuantlets, IronGreaves, IronBoots, HealingPotion, StaminaPotion, ThrowingKnife} from "./item.js";

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
    updateStatusEffects(type){
        for(var i = 0; i < this.statusArray.length; i++){
            this.statusArray[i].update(type, i);
        }
    }
}
export class Skeleton extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "skeleton";
        this.imageSrc = "media/skeleton.jpg"
        this.maxHP = 10 + playerLevel; 
        this.currentHP = this.maxHP;
        this.maxStamina = 10 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 10 + playerLevel;
        this.currentMagic = this.maxMagic;
        this.baseArmor = 1;
        this.currentArmor = this.baseArmor;
        this.baseAttack = 2 + playerLevel;
        this.currentAttack = this.baseAttack;
        this.baseSpeed = 1;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Slash, new Block];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new ThrowingKnife, new Dagger, new Spear, new StaminaPotion];
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
        this.currentArmor = 0;
        this.baseAttack = 2 + playerLevel;
        this.currentAttack = this.baseAttack;
        this.baseSpeed = 2;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new LeechLife];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealingPotion];
    }
}
export class Wolf extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "wolf";
        this.imageSrc = "media/wolf.jpg"
        this.maxHP = 8 + playerLevel;
        this.currentHP = this.maxHP;
        this.maxStamina = 12 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0;
        this.currentMagic = this.maxMagic;
        this.currentArmor = 0;
        this.baseAttack = 2 + playerLevel;
        this.currentAttack = this.baseAttack;
        this.baseSpeed = 2;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Pounce];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion, new ThrowingKnife];
    }
}
export class Royalmage extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "royal mage";
        this.imageSrc = "media/royal-mage.jpg"
        this.maxHP = 20 + playerLevel*4;
        this.currentHP = this.maxHP;
        this.maxStamina = 20 + playerLevel;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 20 + playerLevel;
        this.currentMagic = this.maxMagic;
        this.currentArmor = 1;
        this.baseAttack = 2 + playerLevel;
        this.currentAttack = this.baseAttack;
        this.baseSpeed = 1;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new ArcaneDart, new ArcaneBlast];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new IronHelmet, new IronChainmail, new IronGuantlets, new IronGreaves, new IronBoots, new IronSheild];
    }
}