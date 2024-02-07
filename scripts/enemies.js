import {Slash, Strike, Stab, Flurry, Eviscerate, Block, Fireball, Meditate, Cleanse, ShieldBash, LightBeam, DrinkHealthPotion, DrinkStaminaPotion, DrinkMagicPotion, ThrowKnife, ThrowPoisonedKnife, SmashMeteorite, UseAntidote, UseAloeRemedy,
    ThrowNet, Immolate, LightningBolt, Channel, IceShard, IceBarrier, DrainLife, Siphon, ArcaneDart, ArcaneBlast, Bite, SpitBile, LeechLife, Devour, Pounce, CastShadow, ThrowSmokebomb, Shockwave, GuardBreak, BlinkStrike, Punch, WildSwing,
    Roar, ShootArrow, TripleShot, MeteorShower, SummonSkeleton, VineLash, ThrowThistles, VortexSheild, Retreat, ArcaneSalvo, Curse, FlameLash, BolaShot} from "./abilities.js"
    import {getRandomItem, LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, Longsword, Handaxe, WarHammer, NightbladeSword,
        Shiv, Buckler, FireStaff, LightningStaff, IceStaff, ArcaneStaff, LightStaff, DarkStaff, LeatherHelmet, NightbladeHelm, NightbladeChestplate, RoyalAltusRobes, RoyalAltusPants,
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, KiteShield, IronHelmet, IronGauntlets, IronChainmail, Shortbow, ForestStaff,
        IronGreaves, IronBoots, PanzerianGuantlets, CrystalBall, ClothHood, ClothRobe, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net, SmokeBomb, Hide, Bandage, FrostbiteTonic, ParalysisTonic, PineWood, TigerClaw, DogPaw, HawkTalons
        } from "./items.js";
import { Channeled, Invigorated, Vortexed } from "./statusEffects.js";

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
    resetStats(){
        this.currentBluntAttack = this.baseBluntAttack;
        this.currentPierceAttack = this.basePierceAttack; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.currentElementalAttack = this.baseElementalAttack;
        this.currentBluntDefense = this.baseBluntDefense;
        this.currentPierceDefense = this.basePierceDefense; 
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.currentElementalDefense = this.baseElementalDefense;
        this.currentSpeed = this.baseSpeed;
        this.currentEvasion = this.baseEvasion;
    }
}
export class Skeleton extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "skeleton";
        this.apperance = "media/skeleton.jpg"
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
                          new HealthPotion, new StaminaPotion, new ThrowingKnife, new SmokeBomb, new Bandage];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [0,4], [2,3], [2,3], [0,2], [0,2], [1,2], [2,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(35 * (1 + this.level/10));
    }
}
export class Bat extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "bat";
        this.apperance = "media/bat.jpg"
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
        this.baseEvasion = 15;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new LeechLife];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Antidote];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,4], [2,6], [0,4], [1,3], [2,3], [1,2], [1,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(20 * (1 + this.level/10 ));
    }
}
export class Wolf extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "wolf";
        this.apperance = "media/wolf.jpg"
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
        this.baseEvasion = 10;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new Pounce];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Hide];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [4,6], [0,4], [1,3], [2,3], [0,2], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (10 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(30 * (1 + this.level/10 ));
    }
}
export class AltusMage extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "altus mage";
        this.apperance = "media/altus-mage.jpg"
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
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [0,2], [2,6], [1,3], [0,1], [2,3], [2,3], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(50 * (1 + this.level/10 ));
        if(this.level == 5){
            this.abilityArray.push(new FlameLash());
        }
    }
}
export class CaveSpider extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "cave spider";
        this.apperance = "media/cave-spider.jpg"
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
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,4], [2,6], [0,4], [1,3], [2,3], [1,2], [1,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(20 * (1 + this.level/10 ));
    }
}
export class Groveguardian extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "grove guardian";
        this.apperance = "media/grove-guardian.jpg"
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
        this.abilityArray = [new Bite, new GuardBreak, new VineLash, new ThrowThistles];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new AloeRemedy, new Antidote, new PineWood, new ForestStaff];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [4,8], [2,4], [0,2], [2,3], [2,3], [0,1], [1,2], [2,3], [1,2], [1,2], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(50 * (1 + this.level/10 ));
        if(this.level == 5){
            this.abilityArray.push(new VortexSheild());
        }
    }
}
export class EmperorDolos extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "emperor dolos";
        this.apperance = "media/emperor-dolos.jpg"
        this.maxHP = 250;
        this.currentHP = this.maxHP;
        this.maxStamina = 150;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 150;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 60;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 60;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 60; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 60;
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
        this.abilityArray = [new Flurry, new LightningBolt, new Cleanse, new DrainLife, new Siphon, new Curse];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = true;
        this.isSummon = false;
        this.battleMusicSrc = './audio/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3';
        this.canRetreatFrom = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [8,16], [2,6], [1,3], [2,4], [2,4], [2,4], [2,4], [1,3], [1,3], [1,3], [1,3]);
        this.gold = 500;
        this.xp = 500;
    }
}
export class TerrorBear extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "terror bear";
        this.apperance = "media/terror-bear.jpg"
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
        this.abilityArray = [new Bite, new Devour, new LightningBolt, new CastShadow];
        this.statusArray = []
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new Meteorite];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [4,8], [2,4], [0,2], [2,3], [2,3], [0,1], [1,2], [2,3], [1,2], [1,2], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(75 * (1 + this.level/10 ));
    }
}
export class ShadowStrider extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "shadow strider";
        this.apperance = "media/shadow-strider.jpg"
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
        this.statusArray = []
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new StaminaPotion, new Meteorite];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [2,6], [1,3], [2,4], [2,4], [2,4], [1,3], [1,3], [2,4], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(40 * (1 + this.level/10 ));
    }
}
export class Bandit extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "bandit";
        this.apperance = "media/bandit.jpg"
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
                          new LeatherGloves, new LeatherChestplate, new LeatherGreaves, new Shortbow, 
                          new LeatherBoots, new HealthPotion, new StaminaPotion, new ThrowingKnife, new SmokeBomb, new Bandage];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [0,4], [2,3], [2,3], [0,2], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(35 * (1 + this.level/10 ));
    }
}
export class SkeletonMage extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "skeleton mage";
        this.apperance = "media/skeleton-mage.jpg"
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
        this.baseBluntDefense = 30;
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
        this.abilityArray = [new IceShard, new Shockwave, new Channel, new VortexSheild];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new ClothHood, new ClothRobe, new LinenShirt, new LinenPants, new HealthPotion, new MagicPotion, new IceStaff, new FrostbiteTonic, new ParalysisTonic];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [0,4], [2,6], [0,2], [0,2], [2,3], [2,3], [1,2], [2,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(35 * (1 + this.level/10 ));
    }
}
export class Ghost extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "ghost";
        this.apperance = "media/ghost.jpg"
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
        this.abilityArray = [new DrainLife, new Siphon, new Slash, new Curse];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new MagicPotion];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [0,4], [2,6], [0,2], [2,3], [2,3], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(50 * (1 + this.level/10 ));
    }
}
export class AltusGuard extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "altus guard";
        this.apperance = "media/altus-guard.jpg"
        this.maxHP = 40;
        this.currentHP = this.maxHP;
        this.maxStamina = 35;
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
        this.baseBluntDefense = 40;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 40;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 40;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 40;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 10;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Slash, new Stab, new Strike, new Flurry, new Block, new GuardBreak];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Spear, new Shortsword, new Longsword, new Handaxe, new Dagger, new Shiv, new BlacksmithHammer,
            new Buckler, new LeatherHelmet, new LeatherHood, new WarHammer, 
            new LeatherGloves, new LeatherChestplate, new LeatherGreaves, 
            new LeatherBoots, new KiteShield, new IronHelmet, new IronGauntlets, 
            new IronChainmail, new IronGreaves, new IronBoots, 
            new HealthPotion, new StaminaPotion, new ThrowingKnife, new Bandage];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false; 
        this.isSummon = false;            
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [0,4], [2,3], [2,3], [0,2], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(35 * (1 + this.level/10 ));
    }
}
export class Yeti extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "yeti";
        this.apperance = "media/yeti.jpg"
        this.maxHP = 50;
        this.currentHP = this.maxHP;
        this.maxStamina = 50;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 40;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 60;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 50;
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
        this.baseSpeed = 20;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 5;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Strike, new GuardBreak, new Punch, new IceBarrier, new WildSwing, new Roar];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new FrostbiteTonic];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [4,8], [2,4], [0,2], [3,4], [1,2], [0,1], [1,2], [2,3], [2,3], [2,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(50 * (1 + this.level/10 ));
    }
}
export class Tiger extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "tiger";
        this.apperance = "media/tiger.jpg"
        this.maxHP =  50;
        this.currentHP = this.maxHP;
        this.maxStamina = 50;
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
        this.baseSpeed = 32;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 8;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new Slash, new Pounce];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new Hide];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [4,6], [0,4], [1,3], [2,3], [1,3], [1,3], [1,3], [0,2], [1,3], [0,2]);
        this.gold = Math.floor((Math.random() * (10 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(30 * (1 + this.level/10 ));
    }
}
export class TwilightDragon extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "twilight dragon";
        this.apperance = "media/twilight-dragon.jpg"
        this.maxHP = 300;
        this.currentHP = this.maxHP;
        this.maxStamina = 200;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 200;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 60;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 60;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 60; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 60;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 20;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 10;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Bite, new MeteorShower, new Roar, new CastShadow];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new NightbladeSword];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = true;
        this.isSummon = false;
        this.battleMusicSrc = './audio/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3';
        this.canRetreatFrom = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [8,16], [2,6], [1,3], [2,4], [2,4], [2,4], [2,4], [1,3], [1,3], [1,3], [1,3]);
        this.gold = 500;
        this.xp = 500;
    }
}
export class AncientAltusKing extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "ancient altus king";
        this.apperance = "media/ancient-altus-king.jpg"
        this.maxHP = 100;
        this.currentHP = this.maxHP;
        this.maxStamina = 100;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 300;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 50;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 50;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 60; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 60;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 35;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 35;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 35;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 35;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 5;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 25;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new Siphon, new DrainLife, new IceShard, new SummonSkeleton, new Curse];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new IceStaff, new DarkStaff, new RoyalAltusRobes, new RoyalAltusPants];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = true;
        this.isSummon = false;
        this.battleMusicSrc = './audio/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3';
        this.canRetreatFrom = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [8,16], [2,6], [1,3], [2,4], [2,4], [2,4], [2,4], [1,3], [1,3], [1,3], [1,3]);
        this.gold = 500;
        this.xp = 500;
    }
}
export class Merchant extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "merchant";
        this.apperance = "media/traveling-merchant.jpg"
        this.maxHP = 55;
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
        this.baseEvasion = 15;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new ThrowSmokebomb, new Slash, new Stab, new Retreat, new ThrowPoisonedKnife, new ThrowNet];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [getRandomItem()];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;             
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,6], [0,4], [2,3], [2,3], [0,2], [0,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(35 * (1 + this.level/10 ));
    }
}
export class FloatingSkull extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "floating skull";
        this.apperance = "media/floating-skull.jpg"
        this.maxHP = 25;
        this.currentHP = this.maxHP;
        this.maxStamina = 20;
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
        this.baseEvasion = 15;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new ArcaneDart];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealthPotion, new MagicPotion];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = false;
        this.isSummon = false;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,4], [0,4], [2,6], [1,3], [1,2], [2,3], [1,2], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(20 * (1 + this.level/10 ));
        if(this.level == 3){
            this.abilityArray.push(new Curse());
        }
        if(this.level == 5){
            this.abilityArray.push(new DrainLife());
        }
    }
}
export class Pursuer extends Enemy{
    constructor(averagePartyLevel){
        super();
        this.name = "the pursuer";
        this.apperance = "media/the-pursuer.jpg"
        this.maxHP = 100;
        this.currentHP = this.maxHP;
        this.maxStamina = 100;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 100;
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 60;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 60;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 60; 
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 60;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 55;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 55;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 55;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 55;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 30;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 10;
        this.currentEvasion = this.baseEvasion;
        this.abilityArray = [new FlameLash, new Flurry, new GuardBreak, new ThrowNet, new BolaShot, new Retreat];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new PanzerianGuantlets];
        this.gold = 0;
        this.xp = 0;
        this.isBoss = true; 
        this.isSummon = false;
        this.battleMusicSrc = './audio/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3';
        this.canRetreatFrom = true;
        this.levelUp(averagePartyLevel);
    }
    levelUp(averagePartyLevel){
        this.incrementStats(averagePartyLevel, [2,6], [2,4], [2,4], [1,3], [1,3], [1,3], [1,3], [1,3], [1,3], [1,3], [1,3]);
        this.gold = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + averagePartyLevel/3));
        this.xp = Math.floor(35 * (1 + this.level/10 ));
    }
}