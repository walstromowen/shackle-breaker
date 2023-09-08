import {Slash, Stab, Strike, Block, Bite, Pounce, LeechLife, ArcaneDart, ArcaneBlast, SpitBile, Devour, Channel, Fireball, DrainLife, Recover, Cleanse} from "./abilities.js"
import {LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, 
        Shiv, Buckler, FireStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, KiteSheild, IronHelmet, IronGuantlets, IronChainmail, 
        IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net,
        SpellbookOfCleasning} from "./items.js";

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
        this.maxHP = 35 + playerLevel*2; 
        this.currentHP = this.maxHP;
        this.maxStamina = 35 + playerLevel*1; 
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35 + playerLevel*1; 
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45 + playerLevel*2; 
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45 + playerLevel*2; 
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45 + playerLevel*1; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45 + playerLevel*1; 
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35 + playerLevel*1; 
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 40 + playerLevel*2; 
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35 + playerLevel*1; 
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35 + playerLevel*1; 
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25 + playerLevel;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Slash, new Stab, new Strike, new Block];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Spear, new Shortsword, new Dagger, new Shiv, 
                          new Buckler, new LeatherHelmet, new LeatherHood, 
                          new LeatherGloves, new LeatherChestplate, new LeatherGreaves, 
                          new LeatherBoots, new KiteSheild, new IronHelmet, new IronGuantlets, 
                          new IronChainmail, new IronGreaves, new IronBoots, 
                          new HealthPotion, new StaminaPotion, new ThrowingKnife];
        this.gold = Math.floor(Math.random() *  ((10 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
    }
}
export class Bat extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "bat";
        this.imageSrc = "media/bat.jpg"
        this.maxHP = 20 + playerLevel*2; 
        this.currentHP = this.maxHP;
        this.maxStamina = 20 + playerLevel*2; 
        this.currentStamina = this.maxStamina;
        this.maxMagic = 20 + playerLevel*1; 
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45 + playerLevel*2; 
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45 + playerLevel*2; 
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45 + playerLevel*2; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45 + playerLevel*1; 
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35 + playerLevel*1; 
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35 + playerLevel*1; 
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35 + playerLevel*1; 
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35 + playerLevel*1; 
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30 + playerLevel; 
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new LeechLife];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion];
        this.gold = Math.floor(Math.random() *  ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
    }
}
export class Wolf extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "wolf";
        this.imageSrc = "media/wolf.jpg"
        this.maxHP =  30 + playerLevel*2; 
        this.currentHP = this.maxHP;
        this.maxStamina = 30 + playerLevel*3; 
        this.currentStamina = this.maxStamina;
        this.maxMagic = 15 + playerLevel*1; 
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45 + playerLevel*2; 
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45 + playerLevel*2; 
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45 + playerLevel*1; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45 + playerLevel*1; 
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35 + playerLevel*1; 
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35 + playerLevel*1; 
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35 + playerLevel*1; 
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35 + playerLevel*1; 
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Pounce];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion];
        this.gold = Math.floor(Math.random() *  ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
    }
}
export class AltusMage extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "altus mage";
        this.imageSrc = "media/altus-mage.jpg"
        this.maxHP = 45 + playerLevel*2; 
        this.currentHP = this.maxHP;
        this.maxStamina = 35 + playerLevel*1; 
        this.currentStamina = this.maxStamina;
        this.maxMagic = 45 + playerLevel*2; 
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 40 + playerLevel*1; 
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 40 + playerLevel*1; 
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45 + playerLevel*2; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 40 + playerLevel*1; 
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35 + playerLevel*1; 
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35 + playerLevel*1; 
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35 + playerLevel*2; 
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35 + playerLevel*1; 
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new ArcaneDart, new ArcaneBlast, new Fireball, new Cleanse];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new FireStaff, new MagicPotion];
        this.gold = Math.floor(Math.random() *  ((20 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
    }
}
export class CaveSpider extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "cave spider";
        this.imageSrc = "media/cave-spider.jpg"
        this.maxHP = 20 + playerLevel*2; 
        this.currentHP = this.maxHP;
        this.maxStamina = 20 + playerLevel*2;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 20 + playerLevel*2;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45 + playerLevel*2;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45 + playerLevel*2;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45 + playerLevel*2;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45 + playerLevel*2;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 30 + playerLevel*2;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35 + playerLevel*2;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 30 + playerLevel*2;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 30 + playerLevel*2;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new SpitBile];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion, new PoisonedKnife];
        this.gold = Math.floor(Math.random() *  ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
    }
}
export class Groveguardian extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "grove guardian";
        this.imageSrc = "media/grove-guardian.jpg"
        this.maxHP = 50 + playerLevel*2 ; 
        this.currentHP = this.maxHP;
        this.maxStamina = 25 + playerLevel*2 ; 
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35 + playerLevel*2; 
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 50 + playerLevel*2 ; 
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45 + playerLevel*2 ; 
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45 + playerLevel*2 ; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 50 + playerLevel*2 ; 
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 45 + playerLevel*2 ; 
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 30 + playerLevel*2 ; 
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35 + playerLevel*2 ; 
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35 + playerLevel*2 ; 
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 20;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Devour];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new AloeRemedy, new Antidote];
        this.gold = Math.floor(Math.random() *  ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
    }
}
export class EmperorDolos extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "emperor dolos";
        this.imageSrc = "media/emperor-dolos.jpg"
        this.maxHP = 150 + playerLevel*1; 
        this.currentHP = this.maxHP;
        this.maxStamina = 150 + playerLevel*1; 
        this.currentStamina = this.maxStamina;
        this.maxMagic = 150 + playerLevel*1; 
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45 + playerLevel*2; 
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45 + playerLevel*2; 
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45 + playerLevel*2; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45 + playerLevel*2; 
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 45 + playerLevel*1; 
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 45 + playerLevel*1; 
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 45 + playerLevel*1; 
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 45 + playerLevel*1; 
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new ArcaneDart, new DrainLife, new Slash];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [];
        this.gold = Math.floor(Math.random() *  ((100 + playerLevel*2) - (75 + playerLevel*2) + 1)) + (0 + playerLevel*2);
    }
}