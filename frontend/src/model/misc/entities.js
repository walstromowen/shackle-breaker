import { MagicMissile, Slash, Strike, Cleave, ThrowPosionedKnife, Bite, Earthquake, ShootWeb, ShootArrow, LightningBolt, Pounce, Punch, DrainLife, VineLash, Siphon, Roar, Howl, Eviscerate, ChannelMagic, DarkOrb, Bless, Brace, Inferno, SetBearTrap, Uppercut, Flurry, IceShard, Fly, Barrage, Rage, IceWall, HailStorm, CallOfSterben, ThrowSmokeBomb, ThrowNet, Hide, CastShadow, Shockwave, AbsorbSoul, Shapeshift, Ability, Impale, Cleanse, LesserHeal, Fireball} from "./abilities.js";
import { Poison, Burn, Bleed, Shielded, InstaDeath, Blessed, PhysicalAttackBuff, MagicalAttackBuff, StatusEffect} from "./statusEffects.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, FireStaff, LightningStaff, LightStaff, LinenShirt, LinenPants, Handaxe, LeatherHelmet, LeatherHood, Shortbow, Buckler, LeatherChestplate, LeatherGreaves, LeatherBoots, DarkStaff, IceStaff, ForestStaff, IronHelm, IronChainmail, IronGauntlets, IronGreaves, IronBoots, ClothHood, ClothRobe, LeatherGloves, GreatSword, Flintlock, SmokeBomb, PanzerkamferArmor, ScrollOfHailStorm,  IronShield, IceSickle, Net, ScrollOfCastShadow, Item} from "./items.js";
import {HealthPotion, PoisonedKnife, KurtussBrewOfMadness, StaminaPotion, MagicPotion, Antidote, ParalysisTonic, AloeRemedy, Bandage, PineWood, Pelt} from "./items.js";
import { statusEffectRegistry } from "./registries/statusEffectRegistry.js";
import { itemRegistry } from "./registries/itemRegistry.js";
import { abilityRegistry } from "./registries/abilityRegistry.js";

export class Entity{
    constructor(config, isRehydrate = false){
        this.name = config.name || 'Entity';
        this.type = config.type || 'Entity';
        this.apperance = config.apperance || './assets/media/entities/knight-1.jpg';
        this.size = config.size || 'medium';
        this.level = config.level || 1;
        this.vigor = config.vigor || 1;
        this.strength = config.strength || 1;
        this.dexterity = config.dexterity || 1;
        this.intelligence = config.intelligence || 1;
        this.attunement = config.attunement || 1;
        if(!isRehydrate) this.autoLevel();
        this.maxHP = config.maxHP || 0;
        this.maxStamina = config.maxStamina || 0;
        this.maxMagic = config.maxMagic || 0;
        this.baseHpRecovery = config.baseHpRecovery || 0;
        this.baseStaminaRecovery = config.baseStaminaRecovery || 0;
        this.baseMagicRecovery = config.baseMagicRecovery || 0;
        this.baseBluntAttack = config.baseBluntAttack || 0;
        this.basePierceAttack = config.basePierceAttack || 0;
        this.baseArcaneAttack = config.baseArcaneAttack || 0;
        this.baseElementalAttack = config.baseElementalAttack || 0;
        this.baseBluntDefense = config.baseBluntDefense || 0;
        this.basePierceDefense = config.basePierceDefense || 0;
        this.baseArcaneDefense = config.baseArcaneDefense || 0;
        this.baseElementalDefense = config.baseElementalDefense || 0;
        this.baseBluntResistance = config.baseBluntResistance || 0;
        this.basePierceResistance = config.basePierceResistance || 0;
        this.baseArcaneResistance = config.baseArcaneResistance || 0;
        this.baseElementalResistance = config.baseElementalResistance || 0;
        this.baseSpeed = config.baseSpeed || 0;
        this.baseEvasion = config.baseEvasion || 0;
        this.baseCritical = config.baseCritical || 0;
        this.isHostile = config.isHostile || false;
        if(!isRehydrate) this.scaleAttributes(config.difficulty || 'normal');
        this.currentHP = config.currentHP || this.maxHP;
        this.currentStamina = config.currentStamina || this.maxStamina;
        this.currentMagic = config.currentMagic || this.maxMagic;
        this.currentHpRecovery = config.currentHpRecovery || this.baseHpRecovery;
        this.currentStaminaRecovery = config.currentStaminaRecovery || this.baseStaminaRecovery;
        this.currentMagicRecovery = config.currentMagicRecovery || this.baseMagicRecovery;
        this.currentBluntAttack = config.currentBluntAttack || this.baseBluntAttack;
        this.currentPierceAttack = config.currentPierceAttack || this.basePierceAttack;
        this.currentArcaneAttack = config.currentArcaneAttack || this.baseArcaneAttack;
        this.currentElementalAttack = config.currentElementalAttack || this.baseElementalAttack;
        this.currentBluntDefense = config.currentBluntDefense || this.baseBluntDefense;
        this.currentPierceDefense = config.currentPierceDefense || this.basePierceDefense;
        this.currentArcaneDefense = config.currentArcaneDefense || this.baseArcaneDefense;
        this.currentElementalDefense = config.currentElementalDefense || this.baseElementalDefense;
        this.currentBluntResistance = config.currentBluntResistance || this.baseBluntResistance;
        this.currentPierceResistance = config.currentPierceResistance || this.basePierceResistance;
        this.currentArcaneResistance = config.currentArcaneResistance || this.baseArcaneResistance;
        this.currentElementalResistance = config.currentElementalResistance || this.baseElementalResistance;
        this.currentSpeed = config.currentSpeed || this.baseSpeed;
        this.currentEvasion = config.currentEvasion || this.baseEvasion;
        this.currentCritical = config.currentCritical || this.baseCritical;
        this.currentCorruption = config.currentCorruption || 0.0;

        this.currentXP = config.currentXP || 0;
        this.skillPoints = config.skillPoints || 0;

        this.equipment = config.equipment || 
        {
            mainHand: '',
            offhand: '',
            head: '',
            torso: '',
            arms: '',
            legs: '',
            feet: '',
        }; 
        this.statusArray = config.statusArray || []; //  new Poison({holder: this}), new Burn({holder: this}) 
        this.abilityArray = config.abilityArray || [];//new Strike(), new MagicMissile(), new ThrowPosionedKnife(),
        
        this.partyId = config.partyId || '';
        this.battleId = config.battleId || '';
       
        this.isSelectable = true;
        this.nextAbility = config.nextAbility || '';
        this.abilityTargets = config.abilityTargets || [];
        this.immunities = config.immunities || [];
        this.factions = config.factions || [];
        this.lootTable = config.lootTable || [
            {item: new HealthPotion({}), weight: 1},
        ];
        if(!isRehydrate) this.addAttachableStats(Object.keys(this.equipment));
        this.nextForm = config.nextForm || null;
        
    }
    setAttributes(props){
        this.vigor = props.vigor || this.vigor;
        this.strength = props.strength || this.strength;
        this.dexterity = props.dexterity || this.dexterity;
        this.intelligence = props.intelligence || this.intelligence ;
        this.attunement = props.attunement || this.attunement;
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 10)  + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 25;
        this.baseEvasion = 0.10;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
    applyDifficultyMultiplier(difficulty){
        let difficultyMultiplier = 1.0;
        switch(difficulty){
            case 'easy':
                difficultyMultiplier = 0.9;
                break;
            case 'normal':
                difficultyMultiplier = 1.0;
                break;
            case 'hard':
                difficultyMultiplier = 1.1;
                break;
            case 'nightmare':
                difficultyMultiplier = 1.2;
                break;
        }
        this.maxHP = Math.floor(this.maxHP * difficultyMultiplier);
        this.maxStamina = Math.floor(this.maxStamina * difficultyMultiplier);
        this.maxMagic = Math.floor(this.maxMagic * difficultyMultiplier);
        this.baseHpRecovery = Math.floor(this.baseHpRecovery * difficultyMultiplier);
        this.baseStaminaRecovery = Math.floor(this.baseStaminaRecovery * difficultyMultiplier);
        this.baseMagicRecovery = Math.floor(this.baseMagicRecovery * difficultyMultiplier);
        this.baseBluntAttack = Math.floor(this.baseBluntAttack * difficultyMultiplier);
        this.basePierceAttack = Math.floor(this.basePierceAttack * difficultyMultiplier);
        this.baseArcaneAttack = Math.floor(this.baseArcaneAttack * difficultyMultiplier);
        this.baseElementalAttack = Math.floor(this.baseElementalAttack * difficultyMultiplier);
        this.baseBluntDefense = Math.floor(this.baseBluntDefense * difficultyMultiplier);
        this.basePierceDefense = Math.floor(this.basePierceDefense * difficultyMultiplier);
        this.baseArcaneDefense = Math.floor(this.baseArcaneDefense * difficultyMultiplier);
        this.baseElementalDefense = Math.floor(this.baseElementalDefense * difficultyMultiplier);
        this.baseSpeed = Math.floor(this.baseSpeed * difficultyMultiplier);
        this.baseEvasion = Math.floor(this.baseEvasion * difficultyMultiplier * 100)/100; 
        this.baseCritical = Math.floor(this.baseCritical * difficultyMultiplier * 100)/100;
    }
    getEquipment(slots){
        let currentlyEquippedArray = [];
        for(let i = 0; i < slots.length; i++){
            if(this.equipment[slots[i]] != ''){
                currentlyEquippedArray.push(this.equipment[slots[i]]);
            }
        }
        return currentlyEquippedArray;
    }
    getAttributes(){
        return [
            this.level,
            this.vigor,
            this.strength,
            this.dexterity,
            this.intelligence,
            this.attunement,
        ]
    }
    resetStats(){
        this.currentHP = this.maxHP;
        this.currentStamina = this.maxStamina;
        this.currentMagic = this.maxMagic;
        this.currentHpRecovery = this.baseHpRecovery;
        this.currentStaminaRecovery = this.baseStaminaRecovery;
        this.currentMagicRecovery = this.baseMagicRecovery;
        this.currentBluntAttack = this.baseBluntAttack;
        this.currentPierceAttack = this.basePierceAttack;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.currentElementalAttack = this.baseElementalAttack;
        this.currentBluntDefense = this.baseBluntDefense;
        this.currentPierceDefense = this.basePierceDefense;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.currentElementalDefense = this.baseElementalDefense;
        this.currentBluntResistance = this.baseBluntResistance;
        this.currentPierceResistance = this.basePierceResistance;
        this.currentArcaneResistance = this.baseArcaneResistance;
        this.currentElementalResistance = this.baseElementalResistance;
        this.currentSpeed = this.baseSpeed;
        this.currentEvasion = this.baseEvasion;
        this.currentCritical = this.baseCritical;
    }

    getCurrentStats(){
        return [
            this.currentHP,
            this.currentStamina,
            this.currentMagic,
            this.currentHpRecovery,
            this.currentStaminaRecovery,
            this.currentMagicRecovery,
            this.currentBluntAttack,
            this.currentPierceAttack,
            this.currentArcaneAttack,
            this.currentElementalAttack,
            this.currentBluntDefense,
            this.currentPierceDefense,
            this.currentArcaneDefense,
            this.currentElementalDefense,
            this.currentBluntResistance,
            this.currentPierceResistance,
            this.currentArcaneResistance,
            this.currentElementalResistance,
            this.currentSpeed,
            this.currentEvasion,
            this.currentCritical,
            this.currentCorruption,//maybe remove?
        ];
    }
    recoverHP(){
        this.currentHP += this.currentHpRecovery;
        if(this.currentHP > this.maxHP){
            this.currentHP = this.maxHP;
        }

    }
    recoverStamina(){
        this.currentStamina += this.currentStaminaRecovery;
        if(this.currentStamina > this.maxStamina){
            this.currentStamina = this.maxStamina;
        }

    }
    recoverMagic(){
        this.currentMagic += this.currentMagicRecovery;
        if(this.currentMagic > this.maxMagic){
            this.currentMagic = this.maxMagic;
        }

    }
    equipAttatchables(attatchables){
        for(let x = 0; x < attatchables.length; x++){
            switch(attatchables[x].slot){
                case 'oneHand':
                    if(this.equipment['mainHand'] != '' && this.equipment['offhand'] == ''){
                        this.equipment['offhand'] = attatchables[x];
                    }else{
                        this.equipment['mainHand'] = attatchables[x];
                    }
                    break;
                case 'twoHand':
                    this.equipment['mainHand'] = attatchables[x];
                    this.equipment['offhand'] = attatchables[x];
                    break;
                default:
                    this.equipment[attatchables[x].slot] = attatchables[x];
                    break;
            }
        }
    }
    unequipAttatchables(slots){
        let unequippedAttatchables = [];
        for(let i = 0; i < slots.length; i++){
            if(this.equipment[slots[i]] != ''){
                if(slots[i] == 'mainHand' && this.equipment[slots[i]].slot == 'twoHand'){
                    this.equipment['offhand'] = '';
                }
                if(slots[i] == 'offhand' && this.equipment[slots[i]].slot == 'twoHand'){
                    this.equipment['mainHand'] = '';
                }
                unequippedAttatchables.push(this.equipment[slots[i]]);
            }
            this.equipment[slots[i]] = '';
            
        }
        return(unequippedAttatchables);
    }
    addAttachableStats(slots){
        let twoHandCount = 0;
        for(let i = 0; i < slots.length; i++){
            if(this.equipment[slots[i]].slot == 'twoHand' && twoHandCount >= 1){
                //skip iteration
            }else{
                if(this.equipment[slots[i]] != ''){
                    this.currentHP += this.equipment[slots[i]].hp;
                    this.currentStamina += this.equipment[slots[i]].stamina;
                    this.currentMagic += this.equipment[slots[i]].magic;
                    this.currentHpRecovery += this.equipment[slots[i]].hpRecovery
                    this.currentStaminaRecovery += this.equipment[slots[i]].staminaRecovery;
                    this.currentMagicRecovery += this.equipment[slots[i]].magicRecovery;
                    this.currentBluntAttack += this.equipment[slots[i]].bluntAttack;
                    this.currentPierceAttack += this.equipment[slots[i]].pierceAttack;
                    this.currentArcaneAttack += this.equipment[slots[i]].arcaneAttack;
                    this.currentElementalAttack += this.equipment[slots[i]].elementalAttack;
                    this.currentBluntDefense += this.equipment[slots[i]].bluntDefense;
                    this.currentPierceDefense += this.equipment[slots[i]].pierceDefense;
                    this.currentArcaneDefense += this.equipment[slots[i]].arcaneDefense;
                    this.currentElementalDefense += this.equipment[slots[i]].elementalDefense;
                    this.currentBluntResistance += this.equipment[slots[i]].bluntResistance;
                    this.currentPierceResistance += this.equipment[slots[i]].pierceResistance;
                    this.currentArcaneResistance += this.equipment[slots[i]].arcaneResistance;
                    this.currentElementalResistance += this.equipment[slots[i]].elementalResistance;
                    this.currentSpeed += this.equipment[slots[i]].speed;
                    this.currentEvasion += this.equipment[slots[i]].evasion;
                    this.currentCritical += this.equipment[slots[i]].critical;
                    this.adjustFloatingPointErrors();
                    if(this.equipment[slots[i]].slot == 'twoHand'){
                        twoHandCount++
                    }
                }
            }
        }
    }
    subtractAttachableStats(slots){
        let twoHandCount = 0;
        for(let i = 0; i < slots.length; i++){
            if(this.equipment[slots[i]].slot == 'twoHand' && twoHandCount >= 1){
                //skip iteration
            }else{
                if(this.equipment[slots[i]] != ''){
                    this.currentHP -= this.equipment[slots[i]].hp;
                    this.currentStamina -= this.equipment[slots[i]].stamina;
                    this.currentMagic -= this.equipment[slots[i]].magic;
                    this.currentHpRecovery -= this.equipment[slots[i]].hpRecovery
                    this.currentStaminaRecovery -= this.equipment[slots[i]].staminaRecovery;
                    this.currentMagicRecovery -= this.equipment[slots[i]].magicRecovery;
                    this.currentBluntAttack -= this.equipment[slots[i]].bluntAttack;
                    this.currentPierceAttack -= this.equipment[slots[i]].pierceAttack;
                    this.currentArcaneAttack -= this.equipment[slots[i]].arcaneAttack;
                    this.currentElementalAttack -= this.equipment[slots[i]].elementalAttack;
                    this.currentBluntDefense -= this.equipment[slots[i]].bluntDefense;
                    this.currentPierceDefense -= this.equipment[slots[i]].pierceDefense;
                    this.currentArcaneDefense -= this.equipment[slots[i]].arcaneDefense;
                    this.currentElementalDefense -= this.equipment[slots[i]].elementalDefense;
                    this.currentBluntResistance -= this.equipment[slots[i]].bluntResistance;
                    this.currentPierceResistance -= this.equipment[slots[i]].pierceResistance;
                    this.currentArcaneResistance -= this.equipment[slots[i]].arcaneResistance;
                    this.currentElementalResistance -= this.equipment[slots[i]].elementalResistance;
                    this.currentSpeed -= this.equipment[slots[i]].speed;
                    this.currentEvasion -= this.equipment[slots[i]].evasion;
                    this.currentCritical -= this.equipment[slots[i]].critical;
                    this.adjustFloatingPointErrors();
                    if(this.equipment[slots[i]].slot == 'twoHand'){
                        twoHandCount++
                    }
                }
            }
        }
    }
    adjustFloatingPointErrors(){ //eliminates floating point rounding consequence when doing operations on floats
        this.currentBluntResistance = Math.round(this.currentBluntResistance * 100)/100; 
        this.currentPierceResistance = Math.round(this.currentPierceResistance * 100)/100; 
        this.currentArcaneResistance = Math.round(this.currentArcaneResistance * 100)/100; 
        this.currentElementalResistance = Math.round(this.currentElementalResistance * 100)/100; 
        this.currentEvasion = Math.round(this.currentEvasion * 100)/100; 
        this.currentCritical = Math.round(this.currentCritical * 100)/100; 
    }
    dropLoot(count){
        let generatedItems = [];
        for(let i = 0; i < count; i++){
            let allWeightSum = this.lootTable.reduce((ac, itemProbability)=> ac + itemProbability.weight, 0);
            let threshold = Math.random() * allWeightSum;
            for(let itemProbability of this.lootTable){
                threshold -= itemProbability.weight;
                if(threshold < 0){
                    generatedItems.push(itemProbability.item);
                    break;
                }
            }
        }
        return generatedItems;
    }
    awardSkillPoints(){
        let requiredXP = Math.floor(((this.level + 10)**2)*0.5)
        if(this.currentXP >= requiredXP){
            this.skillPoints++;
            this.level ++;
            this.currentXP = this.currentXP - requiredXP;
            this.awardSkillPoints();
        }
    }
    dropXP(){
        let amount = Math.floor(((Math.random() * (0.75 - 0.25 + 1) + 0.25)*((this.maxHP + this.maxStamina + this.maxMagic)/3)) *(1 + this.level*0.05))
        return amount;
    }
    dropGold(){
        let amount = Math.floor(((Math.random() * (0.75 - 0.25 + 1) + 0.25)*((this.maxHP + this.maxStamina + this.maxMagic)/3)) *(1 + this.level*0.1))
        return amount;
    }
    autoLevel(){
        for(let i = 1; i < this.level; i++){
            let chance = Math.floor(Math.random()*5)
            switch(chance){
                case 0:
                    this.vigor++;
                break;
                case 1:
                    this.strength++;
                break;
                case 2:
                    this.dexterity++;
                break;
                case 3:
                    this.intelligence++;
                break;
                case 4:
                    this.attunement++
                break;
            }
        }
        //this.scaleAttributes();
        //this.resetStats();
        //this.addAttachableStats(Object.keys(this.equipment));
    }
    toSaveObject(){
        let saveObject = {
            name: this.name,
            type: this.type,
            apperance : this.apperance,
            size: this.size,
            level: this.level,
            vigor: this.vigor,
            strength: this.strength,
            dexterity: this.dexterity,
            intelligence: this.intelligence,
            attunement: this.attunement,
            maxHP: this.maxHP,
            maxStamina: this.maxStamina,
            maxMagic: this.maxMagic,
            baseHpRecovery: this.baseHpRecovery,
            baseStaminaRecovery: this.baseStaminaRecovery,
            baseMagicRecovery: this.baseMagicRecovery,
            baseBluntAttack: this.baseBluntAttack,
            basePierceAttack: this.basePierceAttack,
            baseArcaneAttack: this.baseArcaneAttack,
            baseElementalAttack: this.baseElementalAttack,
            baseBluntDefense: this.baseBluntDefense,
            basePierceDefense: this.basePierceDefense,
            baseArcaneDefense: this.baseArcaneDefense,
            baseElementalDefense: this.baseElementalDefense,
            baseBluntResistance: this.baseBluntResistance,
            basePierceResistance: this.basePierceResistance,
            baseArcaneResistance: this.baseArcaneResistance,
            baseElementalResistance: this.baseElementalResistance,
            baseSpeed: this.baseSpeed,
            baseEvasion: this.baseEvasion,
            baseCritical: this.baseCritical,
            isHostile: this.isHostile,
            currentHP: this.currentHP,
            currentStamina: this.currentStamina,
            currentMagic: this.currentMagic,
            currentHpRecovery: this.currentHpRecovery,
            currentStaminaRecovery: this.currentStaminaRecovery,
            currentMagicRecovery: this.currentMagicRecovery,
            currentBluntAttack: this.currentBluntAttack,
            currentPierceAttack: this.currentPierceAttack,
            currentArcaneAttack: this.currentArcaneAttack,
            currentElementalAttack: this.currentElementalAttack,
            currentBluntDefense: this.currentBluntDefense,
            currentPierceDefense: this.currentPierceDefense,
            currentArcaneDefense: this.currentArcaneDefense,
            currentElementalDefense: this.currentElementalDefense,
            currentBluntResistance: this.currentBluntResistance,
            currentPierceResistance: this.currentPierceResistance,
            currentArcaneResistance: this.currentArcaneResistance,
            currentElementalResistance: this.currentElementalResistance,
            currentSpeed: this.currentSpeed,
            currentEvasion: this.currentEvasion,
            currentCritical: this.currentCritical,
            currentCorruption: this.currentCorruption,
            currentXP: this.currentXP,
            skillPoints:this.skillPoints,
            equipment: this.equipment ? Object.fromEntries(Object.entries(this.equipment).map(([slot, item]) => [slot, item ? item.toSaveObject() : ''])) : null,
            statusArray: this.statusArray.map(status => status.toSaveObject()), 
            abilityArray: this.abilityArray.map(ability => ability.toSaveObject()),
            partyId: this.partyId,
            battleId: this.battleId,
            isSelectable: this.isSelectable,
            nextAbility: '', //this.nextAbility ? this.nextAbility.toSaveObject() : '',
            abilityTargets: [], //this.abilityTargets.map(abilityTarget => abilityTarget.toSaveObject()), //Don't need to be saved live.
            immunities: this.immunities,
            factions: this.factions, 
            lootTable: this.lootTable.map(itemProbability => ({
                item: itemProbability.item.toSaveObject(),
                weight: itemProbability.weight
            })),
            nextForm: this.nextForm,
        }
        /*
        if(saveObject.nextForm){
            if(saveObject.nextForm.entity){
                saveObject.nextForm.entity = saveObject.nextForm.entity.toSaveObject();
            }
        }
        */
        return saveObject
    }
    static fromSaveObject(entityData, entityRegistry) {
        let statusArray = entityData.statusArray.map((statusData)=>{
            return StatusEffect.fromSaveObject(statusData, statusEffectRegistry)
        })
        let equipment = entityData.equipment;
        if(entityData.equipment){ 
            equipment = Object.fromEntries(
                Object.entries(entityData.equipment).map(([slot, itemData]) => {
                    let item = ""
                    if(entityData.equipment[slot]){
                        item = Item.fromSaveObject(itemData, itemRegistry)
                    } 
                    return [slot, item];
                })
            )
        }
        let abilityArray = entityData.abilityArray.map((abilitydata)=>{
            return Ability.fromSaveObject(abilitydata, abilityRegistry)
        })
        let nextAbility = '';
        if(entityData.nextAbility) nextAbility = Ability.fromSaveObject(entityData.nextAbility, abilityRegistry)
        let lootTable = entityData.lootTable.map((itemProbability)=>{
            return {item: itemRegistry[itemProbability.item.type](itemProbability.item), weight: itemProbability.weight}
        })
        let nextForm = null;
        if(entityData.nextForm){
            if(entityData.nextForm.entity){
                nextForm = {
                    ...entityData.nextForm,
                    entity: entityRegistry[entityData.nextForm.entity.type](entityData.nextForm.entity, true)
                }
            }
        }
        let entityConfig = {
            ...entityData,
            equipment: equipment,
            statusArray: statusArray,   
            abilityArray: abilityArray,
            nextAbility: nextAbility,
            lootTable: lootTable,
        };
        let entity = entityRegistry[entityData.type](entityConfig, true);
        entity.statusArray.forEach((status)=>{
            status.holder = entity;
        })
        return entity;
    }
}

export class Traveler extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Traveler',
            type: 'Traveler',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: './assets/media/entities/traveler.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            equipment: config.equipment || {
                mainHand: new Handaxe({level: 1}),
                offhand: new Buckler({level: 1}),
                head: '',
                torso: new LinenShirt({level: 1}),
                arms: '',
                legs: new LinenPants({level: 1}),
                feet:  new LeatherBoots({level: 1}),
            },
            isHostile: config.isHostile || false,
            abilityArray: [],
        }, isRehydrate);
    }
}

export class Dog extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Dog',
            type: 'Dog',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: './assets/media/entities/dog.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.2,
            baseArcaneResistance: config.baseArcaneResistance || 0.2,
            baseElementalResistance: config.baseElementalResistance || 0.2,
            isHostile: config.isHostile || false,
            equipment: {
                mediumAnimalArmor: '',
            },
            abilityArray: [new Bite({}), new Pounce({}), new Howl({})],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 6)  + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 10;
        this.baseMagicRecovery = 8;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 25;
        this.baseEvasion = 0.10;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}

export class Hawk extends Entity{
    constructor(config, isRehydrate = false){
        super({
            ...config,
            name: 'Hawk',
            type: 'Hawk',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: './assets/media/entities/hawk.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            equipment: {},
            isHostile: config.isHostile || false,
            abilityArray: [new Slash({}), new Fly({})],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 5)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 4) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 2) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 35;
        this.baseEvasion = 0.30;
        this.baseCritical = 0.15;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}

export class Tiger extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Tiger',
            type: 'Tiger',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance ||'./assets/media/entities/snowy-tiger.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 8,
            dexterity: config.dexterity || 7,
            intelligence: config.intelligence || 2,
            attunement: config.attunement || 3,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || false,
            equipment: {
                mediumAnimalArmor: '',
            },
            abilityArray: [new Bite({}), new Pounce({}), new Roar({})],
            lootTable: [
                {item: new Pelt({}), weight: 1},
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 7)  + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 12;
        this.baseMagicRecovery = 8;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 2) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 25;
        this.baseEvasion = 0.10;
        this.baseCritical = 0.20;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class Madman extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Madman',
            type: 'Madman',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/cursed-villager-1.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 7,
            dexterity: config.dexterity || 7,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 3,
            equipment: config.equipment || {
                mainHand: '',
                offhand: '',
                head: '',
                torso: new LinenShirt({level: 1}),
                arms: '',
                legs: new LinenPants({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Bite({})],
            lootTable: [
                {item: new LeatherHood({level: 1}), weight: 1},
                {item: new LeatherHelmet({level: 1}), weight: 1},
                {item: new LeatherChestplate({level: 1}), weight: 1},
                {item: new LeatherGreaves({level: 1}), weight: 1},
                {item: new LeatherBoots({level: 1}), weight: 1},

                {item: new LinenShirt({level: 1}), weight: 1},
                {item: new LinenPants({level: 1}), weight: 1},

                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 1},
                {item: new MagicPotion({}), weight: 1},
                {item: new Bandage({}), weight: 1},
                
            ],
            
        }, isRehydrate);
    }
}
export class MadBandit extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Mad Bandit',
            type: 'Mad Bandit',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/mad-bandit.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 7,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 5,
            equipment: config.equipment || {
                mainHand: new Dagger({level: 1}),
                offhand: '',
                head: '',
                torso: new LeatherChestplate({level: 1}),
                arms: '',
                legs: new LeatherGreaves({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Eviscerate({})],
            lootTable: [
                {item: new LeatherHood({level: 1}), weight: 1},
                {item: new LeatherHelmet({level: 1}), weight: 1},
                {item: new LeatherChestplate({level: 1}), weight: 1},
                {item: new LeatherGreaves({level: 1}), weight: 1},
                {item: new LeatherBoots({level: 1}), weight: 1},

                {item: new Dagger({level: 1}), weight: 2},
                {item: new PoisonedKnife({level: 1}), weight: 2},
                {item: new SmokeBomb({level: 1}), weight: 2},
                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 1},
                {item: new Bandage({}), weight: 1},
                
            ],
            
        });
    }
}
export class MadMage extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Mad Mage',
            type: 'Mad Mage',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/mad-mage.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 3,
            dexterity: config.dexterity || 3,
            intelligence: config.intelligence || 7,
            attunement: config.attunement || 7,
            equipment: config.equipment || {
                mainHand: new FireStaff({level: 1}),
                offhand: '',
                head: '',
                torso: new LinenShirt({level: 1}),
                arms: '',
                legs: new LinenPants({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [],
            lootTable: [
                {item: new ArcaneStaff({level: 1}), weight: 1},
                {item: new LightStaff({level: 1}), weight: 1},
                {item: new DarkStaff({level: 1}), weight: 1},
                {item: new FireStaff({level: 1}), weight: 1},
                {item: new LightningStaff({level: 1}), weight: 1},
                {item: new IceStaff({level: 1}), weight: 1},

                {item: new ClothHood({level: 1}), weight: 1},
                {item: new ClothRobe({level: 1}), weight: 1},

                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 1},
                {item: new MagicPotion({}), weight: 1},
                {item: new Bandage({}), weight: 1},
                
            ],
            
        }, isRehydrate);
    }
}
export class AlterianWarrior extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: config.name || 'Alterian Warrior',
            type: 'Alterian Warrior',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/alterian-warrior.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 6,
            dexterity: config.dexterity || 6,
            intelligence: config.intelligence || 4,
            attunement: config.attunement || 4,
            equipment: config.equipment || {
                mainHand: new ShortSword({level: 1}),
                offhand: '',
                head: '',
                torso: new IronChainmail({level: 1}),
                arms: '',
                legs: new IronGreaves({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Flurry({})],
            lootTable: [
                {item: new IronShield({level: 1}), weight: 1},
                {item: new IronHelm({level: 1}), weight: 1},
                {item: new IronChainmail({level: 1}), weight: 1},
                {item: new IronGauntlets({level: 1}), weight: 1},
                {item: new IronGreaves({level: 1}), weight: 1},
                {item: new IronBoots({level: 1}), weight: 1},
                {item: new ShortSword({level: 1}), weight: 1},
                {item: new Handaxe({level: 1}), weight: 1},
                {item: new Buckler({level: 1}), weight: 1},
                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 2},
                {item: new Bandage({}), weight: 1},
                
            ],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 10)  + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 8;
        this.baseMagicRecovery = 2;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 20;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class Wolf extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Wolf',
            type: 'Wolf',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/wolf.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || true,
            equipment: {
                mediumAnimalArmor: '',
            },
            abilityArray: [new Bite({}), new Pounce({}), new Howl({})],
            lootTable: [
                {item: new Pelt({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 5)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 1)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class WoodWhisperer extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Wood Whisperer',
            type: 'Wood Whisperer',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/wood-whisperer.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 6,
            dexterity: config.dexterity || 3,
            intelligence: config.intelligence || 4,
            attunement: config.attunement || 7,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            equipment: {},
            isHostile: config.isHostile || true,
            abilityArray: [new VineLash({}), new Strike({})],
            lootTable: [
                {item: new ForestStaff({level: 1}), weight: 1},
                {item: new HealthPotion({level: 1}), weight: 3},
                {item: new PineWood({}), weight: 5}
            ],
            
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 4)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 1)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 2;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 5;
        this.baseEvasion = 0.01;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class MurderMutt extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Murder Mutt',
            type: 'Murder Mutt',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/murder-mutt.png',
            vigor: config.vigor || 8,
            strength: config.strength || 8,
            dexterity: config.dexterity || 6,
            intelligence: config.intelligence || 1,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Eviscerate({damageModifier: 1.5}), new Howl({}), new Impale({})],
            lootTable: [
                {item: new HealthPotion({level: 1}), weight: 1},
                {item: new Pelt({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 8)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 20;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 30;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.40;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class GroveGuardian extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Grove Guardian',
            type: 'Grove Guardian',
            size: 'large',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/grove-guardian.jpg',
            vigor: config.vigor || 8,
            strength: config.strength || 6,
            dexterity: config.dexterity || 3,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.15,
            basePierceResistance: config.basePierceResistance || 0.15,
            baseArcaneResistance: config.baseArcaneResistance || 0.15,
            baseElementalResistance: config.baseElementalResistance || 0.15,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Bite({}), new VineLash({}), new Earthquake({}), new Roar({})],
            lootTable: [
                {item: new ForestStaff({level: 1}), weight: 1},
                {item: new HealthPotion({level: 1}), weight: 1},
                {item: new PineWood({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 10)  + (this.strength * 8) + (this.dexterity * 8) + (this.intelligence * 8) + (this.attunement * 8);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 5;
        this.baseStaminaRecovery = 10;
        this.baseMagicRecovery = 10;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.01;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class Skeleton extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: config.name || 'Skeleton',
            type: 'Skeleton',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/skeleton.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            equipment: config.equipment || {
                mainHand: new Handaxe({level: 1}),
                offhand: new Buckler({level: 1}),
                head: '',
                torso: '',
                arms: '',
                legs: '',
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [],
            lootTable: [
                {item: new IronHelm({level: 1}), weight: 1},
                {item: new IronChainmail({level: 1}), weight: 1},
                {item: new IronGauntlets({level: 1}), weight: 1},
                {item: new IronGreaves({level: 1}), weight: 1},
                {item: new IronBoots({level: 1}), weight: 1},
                {item: new LeatherHood({level: 1}), weight: 1},
                {item: new LeatherHelmet({level: 1}), weight: 1},
                {item: new LeatherChestplate({level: 1}), weight: 1},
                {item: new LeatherGreaves({level: 1}), weight: 1},
                {item: new LeatherBoots({level: 1}), weight: 1},
                {item: new GreatSword({level: 1}), weight: 1},
                {item: new ShortSword({level: 1}), weight: 1},
                {item: new Handaxe({level: 1}), weight: 1},
                {item: new Buckler({level: 1}), weight: 1},
                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 2},
                {item: new Bandage({}), weight: 1},
                
            ],
            
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 8)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 1)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class ArmoredSkeleton extends Skeleton{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: config.name || 'Armored Skeleton',
            type: 'Amored Skeleton',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/armored-skeleton.jpg',
            equipment: config.equipment || {
                mainHand: new ShortSword({level: 1}),
                offhand: new Buckler({level: 1}),
                head: '',
                torso: new IronChainmail({level: 1}),
                arms: '',
                legs: new IronGreaves({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Brace({})],
            lootTable: [
                {item: new IronHelm({level: 1}), weight: 1},
                {item: new IronChainmail({level: 1}), weight: 1},
                {item: new IronGauntlets({level: 1}), weight: 1},
                {item: new IronGreaves({level: 1}), weight: 1},
                {item: new IronBoots({level: 1}), weight: 1},
                {item: new GreatSword({level: 1}), weight: 1},
                {item: new Handaxe({level: 1}), weight: 1},
                {item: new Buckler({level: 1}), weight: 1},
                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 2},
                {item: new MagicPotion({}), weight: 2},
                {item: new Bandage({}), weight: 1},
                
            ],
        }, isRehydrate);
    }
}
export class FloatingSkull extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Floating Skull',
            type: 'Floating Skull',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/floating-skull.jpg',
            vigor: config.vigor || 3,
            strength: config.strength || 4,
            dexterity: config.dexterity || 4,
            intelligence: config.intelligence || 7,
            attunement: config.attunement || 7,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new ChannelMagic({}), new DarkOrb({})],
            lootTable: [
                {item: new HealthPotion({level: 1}), weight: 1},
                {item: new MagicPotion({level: 1}), weight: 3}
            ],
        })
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 3)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxStamina = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 1)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 4) + (this.attunement * 3);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 30;
        this.baseEvasion = 0.5;
        this.baseCritical = 0.15;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class SkeletonCultist extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Skeleton Cultist',
            type: 'Skeleton Cultist',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.skeleton || './assets/media/entities/skeleton-light-mage.jpg',
            vigor: config.vigor || 4,
            strength: config.strength || 4,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 7,
            attunement: config.attunement || 5,
            equipment: config.equipment || {
                mainHand: new LightStaff({level: 1}),
                offhand: new FireStaff({level: 1}),
                head: '',
                torso: new ClothRobe({level: 1}),
                arms: '',
                legs:  new LinenPants({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [],
            lootTable: [
                {item: new ArcaneStaff({level: 1}), weight: 1},
                {item: new LightStaff({level: 1}), weight: 1},
                {item: new DarkStaff({level: 1}), weight: 1},
                {item: new FireStaff({level: 1}), weight: 1},
                {item: new LightningStaff({level: 1}), weight: 1},
                {item: new IceStaff({level: 1}), weight: 1},

                {item: new ClothHood({level: 1}), weight: 1},
                {item: new ClothRobe({level: 1}), weight: 1},

                {item: new HealthPotion({}), weight: 2},
                {item: new MagicPotion({}), weight: 2},
                {item: new Bandage({}), weight: 1},
            ],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 8)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 1)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class SkeletonColossus extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Skeleton Colossus',
            type: 'Skeleton Colossus',
            size: 'large',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/skeleton-colossus.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            equipment: config.equipment || {},
            isHostile: config.isHostile || true,
            abilityArray: [new Punch({damageModifier: 1}), new Pounce({}), new Rage({})],
            baseBluntResistance: config.baseBluntResistance || 0.05,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            lootTable: [
                {item: new DarkStaff({level: 1}), weight: 1},
                {item: new HealthPotion({level: 1}), weight: 1},
                
            ],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 12)  + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.maxStamina = (this.vigor * 3) + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxMagic = (this.vigor * 3)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 5) + (this.attunement * 5);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 15;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 5) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 10;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class Spider extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Spider',
            type: 'Spider',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/spider.jpg',
            vigor: config.vigor || 4,
            strength: config.strength || 4,
            dexterity: config.dexterity || 6,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 6,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Bite({}), new ShootWeb({})],
            lootTable: [
                {item: new ParalysisTonic({level: 1}), weight: 1},
                {item: new PoisonedKnife({level: 1}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 3)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 1)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class InferiorLord extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'InferiorLord',
            type: 'InferiorLord',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/inferior-lord-2.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.2,
            baseArcaneResistance: config.baseArcaneResistance || 0.4,
            baseElementalResistance: config.baseElementalResistance || 0.4,
            equipment: config.equipment || {
                mainHand: '',
                offhand: '',
                head: '',
                torso: '',
                arms: '',
                legs: '',
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new DarkOrb({}), new Cleanse({}), new LesserHeal({}), new Fireball({}), new MagicMissile({})],
            lootTable: [new DarkStaff({level: 1}), new IceStaff({level: 1}), new FireStaff({level: 1})],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 15)  + (this.strength * 8) + (this.dexterity * 8) + (this.intelligence * 8) + (this.attunement * 8);
        this.maxStamina = (this.vigor * 5) + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.maxMagic = (this.vigor * 5)  + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 35;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.basePierceAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 4) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseElementalAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 4);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.10;
        this.baseCritical = 0.20;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class SandStalker extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Sand Stalker',
            type: 'Sand Stalker',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/sand-stalker.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            equipment: config.equipment || {
                mainHand: new ShortSword({level: 1}),
                offhand: '',
                head: '',
                torso: '',
                arms: '',
                legs: '',
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [],
            lootTable: [
                {item: new GreatSword({level: 1}), weight: 1},
                {item: new ShortSword({level: 1}), weight: 1},
                {item: new LeatherHood({level: 1}), weight: 1},
                {item: new LeatherHelmet({level: 1}), weight: 1},
                {item: new LeatherChestplate({level: 1}), weight: 1},
                {item: new LeatherGreaves({level: 1}), weight: 1},
                {item: new LeatherBoots({level: 1}), weight: 1},
                {item: new HealthPotion({level: 1}), weight: 2},
                {item: new Bandage({}), weight: 1},
                
            ],
            nextForm: config.nextForm || {
                animation: 'twister',
                animationDuration: 3000,
                animationSoundEffect: './assets/audio/soundEffects/tornado.wav',
                entity: null,
            }
        }, isRehydrate);
        this.statusArray = config.statusArray || [new InstaDeath({holder:this})];
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 2)  + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 1)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 30;
        this.baseEvasion = 0.20;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
    createNextForm(difficulty){
        let newEntity = new SandStalker({level: this.level, statusArray: [], nextForm: null, difficulty: difficulty});
        newEntity.nextForm = null; //have to do don't know why might be able to get rid of this?
        return newEntity
    }
    playNextFormMessage(){
        return `The ${this.name} disentegrates and quickly rematerializes!`;
    }
}
export class DryShark extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Dry Shark',
            type: 'Dry Shark',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/dry-shark.jpg',
            vigor: config.vigor || 6,
            strength: config.strength || 6,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.05,
            baseArcaneResistance: config.baseArcaneResistance || 0.05,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Bite({damageModifier: 1.5}), new Roar({})],
            lootTable: [
                {item: new HealthPotion({}), weight: 1},
                {item: new Pelt({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 8)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 20;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.20;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class DryEel extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Dry Eel',
            type: 'Dry Eel',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/dry-eel.jpg',
            vigor: config.vigor || 3,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 7,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.2,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Bite({}), new LightningBolt({})],
            lootTable: [
                {item: new ParalysisTonic({level: 1}), weight: 1},
                {item: new Pelt({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 2)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 25;
        this.baseEvasion = 0.1;
        this.baseCritical = 0.1;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class DryKraken extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Dry Kraken',
            type: 'Dry Kraken',
            size: 'large',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/dry-kraken.jpg',
            vigor: config.vigor || 0,
            strength: config.strength || 6,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 3,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.05,
            baseArcaneResistance: config.baseArcaneResistance || 0.05,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Bite({damageModifier: 1.5}), new Roar({}), new Earthquake({})],
            lootTable: [
                {item: new HealthPotion({level: 1}), weight: 1},
                {item: new Pelt({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 20)  + (this.strength * 20) + (this.dexterity * 20) + (this.intelligence * 20) + (this.attunement * 20);
        this.maxStamina = (this.vigor * 20) + (this.strength * 20) + (this.dexterity * 20) + (this.intelligence * 20) + (this.attunement * 20);
        this.maxMagic = (this.vigor * 10)  + (this.strength * 10) + (this.dexterity * 10) + (this.intelligence * 30) + (this.attunement * 30);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.1;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class DryKrakenTentacle extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Tentacle',
            type: 'Tentacle',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/dry-kraken-tentacle.jpg',
            vigor: config.vigor || 8,
            strength: config.strength || 7,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.2,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Strike({})],
            lootTable: [],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 2)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 25;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.1;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class TheSandShade extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'The Sand Shade',
            type: 'The Sand Shade',
            size: 'large',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/the-sand-shade.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            equipment: config.equipment || {
                mainHand: '',
                offhand: '',
                head: '',
                torso: '',
                arms: '',
                legs: '',
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: config.abilityArray || [new Slash({}), new DrainLife({}), new DarkOrb({}), new ChannelMagic({})],
            lootTable: [new DarkStaff({level: 1})],
        }, isRehydrate);
        this.nextForm = config.nextForm || {
            animation: 'twister',
            animationDuration: 6000,
            animationSoundEffect: './assets/audio/soundEffects/tornado.wav',
            entity: '',
        }
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 20)  + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.maxStamina = (this.vigor * 5) + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.maxMagic = (this.vigor * 5)  + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 15;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.basePierceAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 4) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseArcaneAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 4) + (this.attunement * 3);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 25;
        this.baseEvasion = 0.20;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
    createNextForm(difficulty){
        let newEntity = new TheSandShade({level: this.level, difficulty: difficulty, nextForm: null, abilityArray: [new Slash({}), new DrainLife({}), new Earthquake({}), new DarkOrb({})],});
        newEntity.nextForm = null; //have to do don't know why might be able to get rid of this?
        return newEntity
    }
    playNextFormMessage(){
        return `The ${this.name} disentegrates and quickly rematerializes!`;
    }
}
export class PanzerianKnight extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: config.name || 'Panzerian Knight',
            type: 'Panzerian Knight',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/panzerian-knight.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 7,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 4,
            attunement: config.attunement || 4,
            equipment: config.equipment || {
                mainHand: new GreatSword({level: 1}),
                offhand: new GreatSword({level: 1}),
                head: '',
                torso: new IronChainmail({level: 1}),
                arms: '',
                legs: new IronGreaves({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Brace({}), new Uppercut({})],
            lootTable: [
                {item: new IronShield({level: 1}), weight: 1},
                {item: new IronHelm({level: 1}), weight: 1},
                {item: new IronChainmail({level: 1}), weight: 1},
                {item: new IronGauntlets({level: 1}), weight: 1},
                {item: new IronGreaves({level: 1}), weight: 1},
                {item: new IronBoots({level: 1}), weight: 1},
                {item: new GreatSword({level: 1}), weight: 1},
                {item: new Handaxe({level: 1}), weight: 1},
                {item: new Buckler({level: 1}), weight: 1},
                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 2},
                {item: new Bandage({}), weight: 1},
                
            ],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 10)  + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 8;
        this.baseMagicRecovery = 2;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 20;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class MadEngineer extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Mad Engineer',
            type: 'Mad Engineer',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/mad-engineer.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 6,
            dexterity: config.dexterity || 4,
            intelligence: config.intelligence || 6,
            attunement: config.attunement || 4,
            equipment: config.equipment || {
                mainHand: new Flintlock({level: 1}),
                offhand: '',
                head: '',
                torso: new LeatherChestplate({level: 1}),
                arms: new LeatherGloves({level: 1}),
                legs: new LeatherGreaves({level: 1}),
                feet: new LeatherBoots({level: 1}),
            },
            isHostile: config.isHostile || true,
            abilityArray: [new SetBearTrap({})],
            lootTable: [

                {item: new LinenShirt({level: 1}), weight: 1},
                {item: new LinenPants({level: 1}), weight: 1},

                {item: new HealthPotion({}), weight: 2},
                {item: new Bandage({}), weight: 1},
                
            ],
        }, isRehydrate);
    }
}
export class IcePhoenix extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Ice Phoenix',
            type: 'Ice Phoenix',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/ice-phoenix.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 4,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 8,
            baseBluntResistance: config.baseBluntResistance || 0.15,
            basePierceResistance: config.basePierceResistance || 0.20,
            baseArcaneResistance: config.baseArcaneResistance || 0.15,
            baseElementalResistance: config.baseElementalResistance || 0.15,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Fly({}), new IceShard({}), new ChannelMagic({})],
            lootTable: [
                {item: new IceStaff({level: 1}), weight: 1},
                {item: new HealthPotion({}), weight: 1},
                {item: new ScrollOfHailStorm({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 8)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 2) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 8;
        this.baseMagicRecovery = 15;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 2) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 2) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 20;
        this.baseEvasion = 0.15;
        this.baseCritical = 0.20;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class Panzerkamfer extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: config.name || 'Panzerkamfer',
            type: 'Panzerkamfer',
            size: 'large',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/panzerkamfer.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 6,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 6,
            attunement: config.attunement || 3,
            equipment: {
                mediumAnimalArmor: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Pounce({}), new Roar({}), new Barrage({})],
            lootTable: [
                {item: new PanzerkamferArmor({level: 1}), weight: 1},
            ],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 20)  + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.maxStamina = (this.vigor * 8) + (this.strength * 8) + (this.dexterity * 8) + (this.intelligence * 8) + (this.attunement * 8);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 10;
        this.baseMagicRecovery = 10;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 3) + (this.intelligence * 4) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 20;
        this.baseEvasion = 0.1;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class Sterben extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Sterben',
            type: 'Sterben',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/sterben.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.2,
            baseArcaneResistance: config.baseArcaneResistance || 0.4,
            baseElementalResistance: config.baseElementalResistance || 0.4,
            equipment: config.equipment || {
                mainHand: '',
                offhand: '',
                head: '',
                torso: '',
                arms: '',
                legs: '',
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Flurry({}), new IceWall({}), new CallOfSterben({})],
            lootTable: [new IceSickle({level: 1}), new IceStaff({level: 1}), new ScrollOfHailStorm()],
            immunities: ['blunt', 'pierce'],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 20)  + (this.strength * 8) + (this.dexterity * 8) + (this.intelligence * 8) + (this.attunement * 8);
        this.maxStamina = (this.vigor * 5) + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.maxMagic = (this.vigor * 5)  + (this.strength * 5) + (this.dexterity * 5) + (this.intelligence * 5) + (this.attunement * 5);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 35;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.basePierceAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 4) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseElementalAttack = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 4);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 15;
        this.baseEvasion = 0.10;
        this.baseCritical = 0.20;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class SterbensBeast extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: config.name || "Sterben's Beast",
            type: "Sterben's Beast",
            size: 'large',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/sterbens-beast.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            equipment: {
                mediumAnimalArmor: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Pounce({}), new Roar({}), new IceShard({}), new HailStorm({})],
            lootTable: [],
        }, isRehydrate);
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 20)  + (this.strength * 12) + (this.dexterity * 12) + (this.intelligence * 12) + (this.attunement * 12);
        this.maxStamina = (this.vigor * 8) + (this.strength * 8) + (this.dexterity * 8) + (this.intelligence * 8) + (this.attunement * 8);
        this.maxMagic = (this.vigor * 8) + (this.strength * 8) + (this.dexterity * 8) + (this.intelligence * 8) + (this.attunement * 8);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 35;
        this.baseMagicRecovery = 10;
        this.baseBluntAttack = (this.vigor * 2) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 3) + (this.intelligence * 4) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 20;
        this.baseEvasion = 0.1;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class ShackledHunter extends Entity{
    constructor(config, isRehydrate = false){
        super({
            ...config,
            name: 'Shackled Hunter',
            type: 'Shackled Hunter',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/shackled-hunter.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 7,
            dexterity: config.dexterity || 7,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 3,
            equipment: config.equipment || {
                mainHand: new Dagger({level: 1}),
                offhand: new Flintlock({level: 1}),
                head: new LeatherHood({level: 1}),
                torso: new LeatherChestplate({level: 1}),
                arms: '',
                legs: new LeatherGreaves({level: 1}),
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Eviscerate({}), new ThrowSmokeBomb({}), new ThrowNet({}), new Hide({})],
            lootTable: [
                {item: new LeatherHood({level: 1}), weight: 1},
                {item: new LeatherHelmet({level: 1}), weight: 1},
                {item: new LeatherChestplate({level: 1}), weight: 1},
                {item: new LeatherGreaves({level: 1}), weight: 1},
                {item: new LeatherBoots({level: 1}), weight: 1},

                {item: new Dagger({level: 1}), weight: 2},
                {item: new Flintlock({level: 1}), weight: 2},
                {item: new PoisonedKnife({level: 1}), weight: 2},
                {item: new SmokeBomb({}), weight: 2},
                {item: new Net({}), weight: 2},
                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 1},
                {item: new Bandage({}), weight: 1},
                
            ],
            
        }, isRehydrate);
    }
}
export class ShackledSpirit extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Shackled Spirit',
            type: 'Shackled Spirit',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/shackled-spirit.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 3,
            dexterity: config.dexterity || 3,
            intelligence: config.intelligence || 7,
            attunement: config.attunement || 7,
            equipment: config.equipment || {
                mainHand: '',
                offhand: '',
                head: '',
                torso: '',
                arms: '',
                legs: '',
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new DrainLife({}), new Siphon({})],
            lootTable: [

                {item: new ClothHood({level: 1}), weight: 1},
                {item: new ClothRobe({level: 1}), weight: 1},

                {item: new ScrollOfCastShadow({level: 1}), weight: 2},
                {item: new HealthPotion({}), weight: 2},
                {item: new StaminaPotion({}), weight: 1},
                {item: new MagicPotion({}), weight: 1},
                {item: new Bandage({}), weight: 1},
                
            ],
            immunities: ['blunt', 'pierce'],
            
        }, isRehydrate);
    }
}
export class TerrorBear extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Terror Bear',
            type: 'Terror Bear',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/terror-bear.jpg',
            vigor: config.vigor || 6,
            strength: config.strength || 7,
            dexterity: config.dexterity || 6,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 3,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Bite({damageModifier: 1.5}), new Roar({}), new Shockwave({})],
            lootTable: [
                {item: new HealthPotion({level: 1}), weight: 1},
                {item: new Pelt({}), weight: 1}
            ],
        }, isRehydrate)
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 8)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 5;
        this.baseMagicRecovery = 5;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 0) + (this.attunement * 0);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 0) + (this.attunement * 1);
        this.baseSpeed = 20;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.20;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
}
export class Nightblade extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Nightblade',
            type: 'Nightblade',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: './assets/media/entities/nightblade.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 7,
            intelligence: config.intelligence || 7,
            attunement: config.attunement || 1,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            equipment: config.equipment || {
                mainHand: new ShortSword({level: 3}),
                offhand: '',
                head: new LeatherHood({level: 1}),
                torso: new LeatherChestplate({level: 1}),
                arms: new LeatherGloves({level: 1}),
                legs: new LeatherGreaves({level: 1}),
                feet:  new LeatherBoots({level: 1}),
            },
            isHostile: config.isHostile || true,
            abilityArray: [new CastShadow({})],
        }, isRehydrate);
    }
}
export class EmperorDolos extends Entity{
    constructor(config, isRehydrate = false){
         super({
            ...config,
            name: 'Emperor Dolos',
            type: 'Emperor Dolos',
            size: 'large',
            level: config.level || 1,
            difficulty: config.difficulty || 'normal',
            apperance: config.apperance || './assets/media/entities/emperor-dolos.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.2,
            baseArcaneResistance: config.baseArcaneResistance || 0.2,
            baseElementalResistance: config.baseElementalResistance || 0.2,
            equipment: config.equipment || {
                mainHand: '',
                offhand: '',
                head: '',
                torso: '',
                arms: '',
                legs: '',
                feet: '',
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Flurry({}), new DrainLife({}), new DarkOrb({}), new Inferno({}), new ChannelMagic({}), new LightningBolt({}), new Siphon({}), new Bless({})],
            lootTable: [],
        }, isRehydrate);
        this.statusArray = config.statusArray || [];
        this.nextForm = config.nextForm || {
            animation: 'twister',
            animationDuration: 6000,
            animationSoundEffect: './assets/audio/soundEffects/tornado.wav',
            entity: null,
        }
    }
    scaleAttributes(difficulty){
        this.maxHP = (this.vigor * 20)  + (this.strength * 20) + (this.dexterity * 20) + (this.intelligence * 20) + (this.attunement * 20);
        this.maxStamina = (this.vigor * 10) + (this.strength * 10) + (this.dexterity * 10) + (this.intelligence * 10) + (this.attunement * 10);
        this.maxMagic = (this.vigor * 10)  + (this.strength * 10) + (this.dexterity * 10) + (this.intelligence * 10) + (this.attunement * 10);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 15;
        this.baseBluntAttack = (this.vigor * 3) + (this.strength * 4) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
        this.basePierceAttack = (this.vigor * 3) + (this.strength * 3) + (this.dexterity * 4) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseArcaneAttack = (this.vigor * 3) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 4) + (this.attunement * 3);
        this.baseElementalAttack = (this.vigor * 3) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 4);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 20;
        this.baseEvasion = 0.10;
        this.baseCritical = 0.10;
        if(this.isHostile){
            this.applyDifficultyMultiplier(difficulty)
        }
    }
    createNextForm(difficulty){
        let newEntity = new EmperorDolos({level: this.level, difficulty: difficulty, nextForm: null, abilityArray: [new Flurry({}), new AbsorbSoul({}), new DrainLife({}), new Inferno({}), new MagicMissile({}), new ChannelMagic({}), new LightningBolt({}), new Siphon({}), new Bless({})]});
        newEntity.statusArray = [new Blessed({holder:newEntity}), new PhysicalAttackBuff({holder:newEntity}), new MagicalAttackBuff({holder:newEntity})];
        newEntity.nextForm = null; //have to do don't know why might be able to get rid of this?
        return newEntity
    }
    playNextFormMessage(){
        return `"Hope.... is an illusion....."`;
    }
}


