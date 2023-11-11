import {Slash, Strike, Stab, Flurry, Eviscerate, Block, Fireball, Meditate, Cleanse, ShieldBash, LightBeam, DrinkHealthPotion, DrinkStaminaPotion, DrinkMagicPotion, ThrowKnife, ThrowPoisonedKnife, SmashMeteorite, UseAntidote, UseAloeRemedy,
    ThrowNet, Immolate, LightningBolt, Channel, IceShard, IceBarrier, DrainLife, Siphon, ArcaneDart, ArcaneBlast, Bite, SpitBile, LeechLife, Devour, Pounce, BlinkStrike, ThrowSmokebomb, Shockwave, GuardBreak} from "./abilities.js"
import {LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, Longsword, Handaxe, WarHammer,
        Shiv, Buckler, FireStaff, LightningStaff, IceStaff, ArcaneStaff, LightStaff, DarkStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, KiteShield, IronHelmet, IronGauntlets, IronChainmail, 
        IronGreaves, IronBoots, CrystalBall, ClothHood, ClothRobe, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net, SmokeBomb, Hide
        } from "./items.js";
import { Channeled, Invigorated } from "./statusEffects.js";

class Enemy{
    constructor(){
        this.level = 0;
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
    incrementStats(averagePartyLevel, maxHPRange, maxStaminaRange, maxMagicRange, 
        baseBluntAttackRange, basePierceAttackRange, baseArcaneAttackRange, baseElementalAttackRange, 
        baseBluntDefenseRange, basePierceDefenseRange, baseArcaneDefenseRange, baseElementalDefenseRange){
        for(let i = 0; i < (averagePartyLevel - this.level); i++){
            let value = Math.floor(Math.random()*(maxHPRange[1] - maxHPRange[0] + 1) + maxHPRange[0]);
            this.maxHP = this.maxHP + value; 
            this.currentHP = this.currentHP + value;
            value = Math.floor(Math.random()*(maxStaminaRange[1] - maxStaminaRange[0] + 1) + maxStaminaRange[0]);
            this.maxStamina = this.maxStamina + value; 
            this.currentStamina = this.currentStamina + value; 
            value = Math.floor(Math.random()*(maxMagicRange[1] - maxMagicRange[0] + 1) + maxMagicRange[0]);
            this.maxMagic = this.maxMagic + value; 
            this.currentMagic = this.currentMagic + value; 
            value = Math.floor(Math.random()*(baseBluntAttackRange[1] - baseBluntAttackRange[0] + 1) + baseBluntAttackRange[0]);
            this.baseBluntAttack = this.baseBluntAttack + value; 
            this.currentBluntAttack = this.currentBluntAttack + value; 
            value = Math.floor(Math.random()*(basePierceAttackRange[1] - basePierceAttackRange[0] + 1) + basePierceAttackRange[0]);
            this.basePierceAttack = this.basePierceAttack + value; 
            this.currentPierceAttack = this.currentPierceAttack + value; 
            value = Math.floor(Math.random()*(baseArcaneAttackRange[1] - baseArcaneAttackRange[0] + 1) + baseArcaneAttackRange[0]);
            this.baseArcaneAttack = this.baseArcaneAttack + value; 
            this.currentArcaneAttack = this.currentArcaneAttack + value; 
            value = Math.floor(Math.random()*(baseElementalAttackRange[1] - baseElementalAttackRange[0] + 1) + baseElementalAttackRange[0]);
            this.baseElementalAttack = this.baseElementalAttack + value; 
            this.currentElementalAttack = this.currentElementalAttack + value; 
            value = Math.floor(Math.random()*(baseBluntDefenseRange[1] - baseBluntDefenseRange[0] + 1) + baseBluntDefenseRange[0]);
            this.baseBluntDefense = this.baseBluntDefense + value; 
            this.currentBluntDefense = this.currentBluntDefense + value; 
            value = Math.floor(Math.random()*(basePierceDefenseRange[1] - basePierceDefenseRange[0] + 1) + basePierceDefenseRange[0]);
            this.basePierceDefense = this.basePierceDefense + value; 
            this.currentPierceDefense = this.currentPierceDefense + value; 
            value = Math.floor(Math.random()*(baseArcaneDefenseRange[1] - baseArcaneDefenseRange[0] + 1) + baseArcaneDefenseRange[0]);
            this.baseArcaneDefense = this.baseArcaneDefense + value; 
            this.currentArcaneDefense = this.currentArcaneDefense + value; 
            value = Math.floor(Math.random()*(baseElementalDefenseRange[1] - baseElementalDefenseRange[0] + 1) + baseElementalDefenseRange[0]);
            this.baseElementalDefense = this.baseElementalDefense + value; 
            this.currentElementalDefense = this.currentElementalDefense + value;
        }
        this.level = averagePartyLevel;
    }
}
export class Skeleton extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "skeleton";
        this.imageSrc = "media/skeleton.jpg"
        this.maxHP = 30;
        this.currentHP = this.maxHP;
        this.maxStamina = 30;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 30;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 30;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 40;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 10;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Slash, new Stab, new Strike, new Block];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Spear, new Shortsword, new Longsword, new Handaxe, new Dagger, new Shiv, new BlacksmithHammer,
                          new Buckler, new LeatherHelmet, new LeatherHood, new WarHammer, 
                          new LeatherGloves, new LeatherChestplate, new LeatherGreaves, 
                          new LeatherBoots, new KiteShield, new IronHelmet, new IronGauntlets, 
                          new IronChainmail, new IronGreaves, new IronBoots, 
                          new HealthPotion, new StaminaPotion, new ThrowingKnife, new SmokeBomb];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [0,4], [2,3], [2,3], [0,2], [0,2], [1,2], [2,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/2));
        this.xp = 35;
    }
}
export class Bat extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "bat";
        this.imageSrc = "media/bat.jpg"
        this.maxHP = 25;
        this.currentHP = this.maxHP;
        this.maxStamina = 25;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 25;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 50;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 60;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
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
        this.baseEvasion = 20;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new LeechLife];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new Antidote];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,4], [2,6], [0,4], [1,3], [2,3], [1,2], [1,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (10 - 5 + 1) + 5) * (1 + averagePartyLevel/5));
        this.xp = 20;
    }
}
export class Wolf extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "wolf";
        this.imageSrc = "media/wolf.jpg"
        this.maxHP =  30;
        this.currentHP = this.maxHP;
        this.maxStamina = 40;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 30;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 50;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 60;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
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
        this.baseEvasion = 12;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new Pounce];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Hide];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [4,6], [0,4], [1,3], [2,3], [0,2], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (10 - 5 + 1) + 5) * (1 + averagePartyLevel/2));
        this.xp = 30;
    }
}
export class AltusMage extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "altus mage";
        this.imageSrc = "media/altus-mage.jpg"
        this.maxHP = 35;
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 40;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
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
        this.baseEvasion = 10;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new ArcaneDart, new ArcaneBlast, new Fireball, new Cleanse];
        this.lootChanceMultiplier = 1; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new FireStaff, new LightningStaff, new IceStaff, new ArcaneStaff, new LightStaff, new DarkStaff, new CrystalBall, new MagicPotion, new ClothHood, new ClothRobe];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [0,2], [2,6], [1,3], [0,1], [2,3], [2,3], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (20 - 5 + 1) + 5) * (1 + averagePartyLevel/5));
        this.xp = 50;
    }
}
export class CaveSpider extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "cave spider";
        this.imageSrc = "media/cave-spider.jpg"
        this.maxHP = 25;
        this.currentHP = this.maxHP;
        this.maxStamina = 25;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 25;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
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
        this.baseEvasion = 15;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new SpitBile];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion, new PoisonedKnife, new Antidote];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,4], [2,6], [0,4], [1,3], [2,3], [1,2], [1,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (10 - 5 + 1) + 5) * (1 + averagePartyLevel/5));
        this.xp = 20;
    }
}
export class Groveguardian extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "grove guardian";
        this.imageSrc = "media/grove-guardian.jpg"
        this.maxHP = 60;
        this.currentHP = this.maxHP;
        this.maxStamina = 40;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 40;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 40;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 40;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 20;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 5;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new Devour, new GuardBreak];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new AloeRemedy, new Antidote];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [4,8], [2,4], [0,2], [2,3], [2,3], [0,1], [1,2], [2,3], [1,2], [1,2], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/5));
        this.xp = 50;
    }
}
export class EmperorDolos extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "emperor dolos";
        this.imageSrc = "media/emperor-dolos.jpg"
        this.maxHP = 150;
        this.currentHP = this.maxHP;
        this.maxStamina = 150;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 150;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
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
        this.baseEvasion = 15;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Flurry, new ArcaneDart, new DrainLife, new Siphon, new LightningBolt, new Channel, new Cleanse];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = true;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [8,16], [2,6], [1,3], [2,4], [2,4], [2,4], [2,4], [1,3], [1,3], [1,3], [1,3]);
        this.gold = 500;
        this.xp = 100;
    }
}
export class TerrorBear extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "terror bear";
        this.imageSrc = "media/terror-bear.jpg"
        this.maxHP = 60; 
        this.currentHP = this.maxHP;
        this.maxStamina = 50;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 50;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 40;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 30;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 40;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 40;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 5;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new Devour, new LightningBolt];
        this.statusArray = [new Channeled(this), new Invigorated(this)]
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new LightningStaff, new Meteorite];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [4,8], [2,4], [0,2], [2,3], [2,3], [0,1], [1,2], [2,3], [1,2], [1,2], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 10 + 1) + 10) * (1 + averagePartyLevel/5));
        this.xp = 75;
    }
}
export class ShadowStrider extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "shadow strider";
        this.imageSrc = "media/shadow-strider.jpg"
        this.maxHP =  35;
        this.currentHP = this.maxHP;
        this.maxStamina = 55;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 50;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
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
        this.baseEvasion = 15;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new LightningBolt, new BlinkStrike];
        this.statusArray = [new Channeled(this), new Invigorated(this)]
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion, new Meteorite];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [2,6], [1,3], [2,4], [2,4], [2,4], [1,3], [1,3], [2,4], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/5));
        this.xp = 40;
    }
}
export class Bandit extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "bandit";
        this.imageSrc = "media/bandit.jpg"
        this.maxHP = 35;
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 27;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 12;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new ThrowSmokebomb, new Slash, new Stab, new Eviscerate, new ThrowKnife];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Shortsword, new Longsword, new Dagger, new Shiv, new Handaxe, new LeatherHelmet, new LeatherHood, 
                          new LeatherGloves, new LeatherChestplate, new LeatherGreaves, 
                          new LeatherBoots, new HealthPotion, new StaminaPotion, new ThrowingKnife, new SmokeBomb];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [0,4], [2,3], [2,3], [0,2], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (20 - 15 + 1) + 15) * (1 + averagePartyLevel/5));
        this.xp = 35;
    }
}
export class SkeletonMage extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "skeleton mage";
        this.imageSrc = "media/skeleton-mage.jpg"
        this.maxHP = 35;
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 30;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 27;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 12;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new IceShard, new Shockwave, new Channel];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new ClothHood, new ClothRobe, new LinenShirt, new LinenPants, new HealthPotion, new MagicPotion, new IceStaff];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [0,4], [2,6], [0,2], [0,2], [2,3], [2,3], [1,2], [2,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (20 - 15 + 1) + 15) * (1 + averagePartyLevel/5));
        this.xp = 35;
    }
}
export class Ghost extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "ghost";
        this.imageSrc = "media/shost.jpg"
        this.maxHP = 35;
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 35;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 55;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 55;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 55; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 55;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 200;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 200;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 15;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new DrainLife, new Siphon, new Slash];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new MagicPotion];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [0,4], [2,6], [0,2], [2,3], [2,3], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (20 - 15 + 1) + 15) * (1 + averagePartyLevel/5));
        this.xp = 50;
    }
}

