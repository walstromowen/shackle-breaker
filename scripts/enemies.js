import {Slash, Strike, Stab, Eviscerate, Block, Fireball, Channel, Cleanse, SheildBash, LightBeam, DrinkHealthPotion, DrinkStaminaPotion, DrinkMagicPotion, ThrowKnife, ThrowPoisonedKnife, SmashMeteorite, UseAntidote, UseAloeRemedy,
    ThrowNet, Immolate, LightningBolt, Energize, IceShard, IceBarrier, DrainLife, Siphon, ArcaneDart, ArcaneBlast, Bite, SpitBile, LeechLife, Devour, Pounce, BlinkStrike} from "./abilities.js"
import {LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, 
        Shiv, Buckler, FireStaff, LightningStaff, IceStaff, ArcaneStaff, LightStaff, DarkStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, KiteSheild, IronHelmet, IronGuantlets, IronChainmail, 
        IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net,
        } from "./items.js";
import { Energized, Invigorated } from "./statusEffects.js";

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
    incrementStats(playerLevel, maxHPInc, maxStaminaInc, maxMagicInc, 
                    baseBluntAttackInc, basePierceAttackInc, baseArcaneAttackInc, baseElementalAttackInc, 
                    baseBluntDefenseInc, basePierceDefenseInc, baseArcaneDefenseInc, baseElementalDefenseInc){
        this.maxHP = this.maxHP + playerLevel*maxHPInc; 
        this.currentHP = this.currentHP + playerLevel*maxHPInc;
        this.maxStamina = this.maxStamina + playerLevel*maxStaminaInc; 
        this.currentStamina = this.currentStamina + playerLevel*maxStaminaInc;
        this.maxMagic = this.maxMagic + playerLevel*maxMagicInc; 
        this.currentMagic = this.currentMagic + playerLevel*maxMagicInc;
        this.baseBluntAttack = this.baseBluntAttack + playerLevel*baseBluntAttackInc; 
        this.currentBluntAttack = this.currentBluntAttack + playerLevel*baseBluntAttackInc;
        this.basePierceAttack = this.basePierceAttack + playerLevel*basePierceAttackInc; 
        this.currentPierceAttack = this.currentPierceAttack + playerLevel*basePierceAttackInc;
        this.baseArcaneAttack = this.baseArcaneAttack + playerLevel*baseArcaneAttackInc; 
        this.currentArcaneAttack = this.currentArcaneAttack + playerLevel*baseArcaneAttackInc;
        this.baseElementalAttack = this.baseElementalAttack + playerLevel*baseElementalAttackInc; 
        this.currentElementalAttack = this.currentElementalAttack + playerLevel*baseElementalAttackInc;
        this.baseBluntDefense = this.baseBluntDefense + playerLevel*baseBluntDefenseInc; 
        this.currentBluntDefense = this.currentBluntDefense + playerLevel*baseBluntDefenseInc;
        this.basePierceDefense = this.basePierceDefense + playerLevel*basePierceDefenseInc; 
        this.currentPierceDefense = this.currentPierceDefense + playerLevel*basePierceDefenseInc;
        this.baseArcaneDefense = this.baseArcaneDefense + playerLevel*baseArcaneDefenseInc; 
        this.currentArcaneDefense = this.currentArcaneDefense + playerLevel*baseArcaneDefenseInc;
        this.baseElementalDefense = this.baseElementalDefense + playerLevel*baseElementalDefenseInc; 
        this.currentElementalDefense = this.currentElementalDefense + playerLevel*baseElementalDefenseInc;
    }
}
export class Skeleton extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "skeleton";
        this.imageSrc = "media/skeleton.jpg"
        this.maxHP = 35;
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 40;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Slash, new Stab, new Strike, new Block];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Spear, new Shortsword, new Dagger, new Shiv, 
                          new Buckler, new LeatherHelmet, new LeatherHood, 
                          new LeatherGloves, new LeatherChestplate, new LeatherGreaves, 
                          new LeatherBoots, new KiteSheild, new IronHelmet, new IronGuantlets, 
                          new IronChainmail, new IronGreaves, new IronBoots, 
                          new HealthPotion, new StaminaPotion, new ThrowingKnife];
        this.gold = 0;
        this.XP = 0;             
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,1,1,2,2,2,1,1,1,2,1,1);
        this.gold = Math.floor(Math.random() * ((10 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 35;
    }
}
export class Bat extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "bat";
        this.imageSrc = "media/bat.jpg"
        this.maxHP = 20;
        this.currentHP = this.maxHP;
        this.maxStamina = 20;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 20;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new LeechLife];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,2,1,2,2,2,1,1,1,1,1);
        this.gold = Math.floor(Math.random() * ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 20;
    }
}
export class Wolf extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "wolf";
        this.imageSrc = "media/wolf.jpg"
        this.maxHP =  30;
        this.currentHP = this.maxHP;
        this.maxStamina = 30;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 15;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Pounce];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,3,1,2,2,1,1,1,1,1,1);
        this.gold = Math.floor(Math.random() * ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 30;
    }
}
export class AltusMage extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "altus mage";
        this.imageSrc = "media/altus-mage.jpg"
        this.maxHP = 45;
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 45;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 40;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 40; 
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 40;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new ArcaneDart, new ArcaneBlast, new Fireball, new Cleanse];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new FireStaff, new LightningStaff, new IceStaff, new ArcaneStaff, new LightStaff, new DarkStaff, new MagicPotion];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,1,2,1,1,2,1,1,1,2,1);
        this.gold = Math.floor(Math.random() * ((20 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 50;
    }
}
export class CaveSpider extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "cave spider";
        this.imageSrc = "media/cave-spider.jpg"
        this.maxHP = 20;
        this.currentHP = this.maxHP;
        this.maxStamina = 20;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 20;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 30;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 30;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 30;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new SpitBile];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion, new PoisonedKnife];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 1,2,2,1,2,1,1,1,1,2,1);
        this.gold = Math.floor(Math.random() * ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 20;
    }
}
export class Groveguardian extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "grove guardian";
        this.imageSrc = "media/grove-guardian.jpg"
        this.maxHP = 50;
        this.currentHP = this.maxHP;
        this.maxStamina = 25;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 50;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 50;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 45;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 30;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 20;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Devour];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new AloeRemedy, new Antidote];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,2,2,2,2,2,2,2,2,2,2);
        this.gold = Math.floor(Math.random() * ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 50;
    }
}
export class EmperorDolos extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "emperor dolos";
        this.imageSrc = "media/emperor-dolos.jpg"
        this.maxHP = 150;
        this.currentHP = this.maxHP;
        this.maxStamina = 150;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 150;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 45;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 45;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 45;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 45;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new ArcaneDart, new DrainLife, new Siphon, new LightningBolt, new Energize, new Cleanse];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,2,2,2,2,2,2,2,2,2,2);
        this.gold = Math.floor(Math.random() * ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 100;
    }
}
export class TerrorBear extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "terror bear";
        this.imageSrc = "media/terror-bear.jpg"
        this.maxHP = 60; 
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 50;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 45;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 40;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 40;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new Devour, new LightningBolt];
        this.statusArray = [new Energized(this), new Invigorated(this)]
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,2,2,2,2,2,2,2,2,2,2);
        this.gold = Math.floor(Math.random() * ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 75;
    }
}
export class ShadowStrider extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "shadow strider";
        this.imageSrc = "media/shadow-strider.jpg"
        this.maxHP =  30;
        this.currentHP = this.maxHP;
        this.maxStamina = 30;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 30;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 45;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 45;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 45;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 45;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 35;
        this.currentSpeed = this.baseSpeed;
        this.abilityArray = [new Bite, new LightningBolt, new BlinkStrike];
        this.statusArray = [new Energized(this), new Invigorated(this)]
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion];
        this.gold = 0;
        this.XP = 0;
        this.levelUp(playerLevel);
    }
    levelUp(playerLevel){
        this.incrementStats(playerLevel, 2,3,1,2,2,1,1,1,1,1,1);
        this.gold = Math.floor(Math.random() * ((5 + playerLevel*2) - (0 + playerLevel*2) + 1)) + (0 + playerLevel*2);
        this.XP = 40;
    }
}