import { MagicMissile, Slash, Strike, Cleave, ThrowPosionedKnife, Bite, Earthquake, ShootWeb, ShootArrow, LightningBolt, Pounce, Punch, DrainLife, VineLash, Siphon, Roar, Howl, Eviscerate, ChannelMagic, DarkOrb, Bless, Brace, Inferno} from "./abilities.js";
import { Poison, Burn, Bleed, Shielded, InstaDeath} from "./statusEffects.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, FireStaff, LightningStaff, LightStaff, LinenShirt, LinenPants, Handaxe, LeatherHelmet, LeatherHood, Shortbow, Buckler, LeatherChestplate, LeatherGreaves, LeatherBoots, DarkStaff, IceStaff, ForestStaff, IronHelm, IronChainmail, IronGauntlets, IronGreaves, IronBoots, ClothHood, ClothRobe, LeatherGloves, GreatSword} from "./items.js";
import {HealthPotion, PoisonedKnife, KurtussBrewOfMadness, StaminaPotion, MagicPotion, Antidote, ParalysisTonic, AloeRemedy, Bandage, PineWood, Hide} from "./items.js";


export class Entity{
    constructor(config){
        this.name = config.name || 'entity';
        this.apperance = config.apperance || './assets/media/entities/knight-1.jpg';
        this.size = config.size || 'medium';
        this.level = config.level || 1;
        this.vigor = config.vigor || 1;
        this.strength = config.strength || 1;
        this.dexterity = config.dexterity || 1;
        this.intelligence = config.intelligence || 1;
        this.attunement = config.attunement || 1;
        this.autoLevel();
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
        this.scaleAttributes();
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

        this.currentXP = 0;
        this.skillPoints = 0;

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
        
        this.partyId = '';
        this.battleId = '';
        this.isHostile = config.isHostile || false;
        this.isSelectable = true;
        this.nextAbility = '';
        this.abilityTargets = [];
        this.lootTable = config.lootTable || {};
        this.addAttachableStats(Object.keys(this.equipment));
        
    }
    setAttributes(props){
        this.vigor = props.vigor || this.vigor;
        this.strength = props.strength || this.strength;
        this.dexterity = props.dexterity || this.dexterity;
        this.intelligence = props.intelligence || this.intelligence ;
        this.attunement = props.attunement || this.attunement;
    }
    scaleAttributes(){
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
        let amount = Math.floor(((Math.random() * (0.75 - 0.25 + 1) + 0.25)*((this.maxHP + this.maxStamina + this.maxMagic)/3)) *(1 + this.level*0.1))
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
}


export class Dog extends Entity{
    constructor(config){
        super({
            name: 'Dog',
            level: config.level || 1,
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
        })
    }
    scaleAttributes(){
        this.maxHP = (this.vigor * 6)  + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.maxStamina = (this.vigor * 2) + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 1) + (this.attunement * 1);
        this.maxMagic = (this.vigor * 2)  + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 3) + (this.attunement * 3);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 8;
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
    }
}

export class Hawk extends Entity{
    constructor(config){
        super({
            name: 'Hawk',
            level: config.level || 1,
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
            abilityArray: [new Slash({})],
        });
    }
}

export class Tiger extends Entity{
    constructor(config){
        super({
            name: 'Tiger',
            level: config.level || 1,
            apperance: config.apperance ||'./assets/media/entities/tiger.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 6,
            dexterity: config.dexterity || 7,
            intelligence: config.intelligence || 4,
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
        })
    }
}
export class Madman extends Entity{
    constructor(config){
        super({
            name: 'Madman',
            level: config.level || 1,
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

                {item: new HealthPotion(), weight: 2},
                {item: new StaminaPotion(), weight: 1},
                {item: new MagicPotion(), weight: 1},
                {item: new Bandage(), weight: 3},
                
            ],
        });
    }
}
export class MadBandit extends Entity{
    constructor(config){
        super({
            name: 'Mad Bandit',
            level: config.level || 1,
            apperance: config.apperance || './assets/media/entities/mad-bandit.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 7,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 5,
            equipment: config.equipment || {
                mainHand: new Dagger({level: 1}),
                offhand: '',
                head: new LeatherHood({level: 1}),
                torso: new LeatherChestplate({level: 1}),
                arms: new LeatherGloves({level: 1}),
                legs: new LeatherGreaves({level: 1}),
                feet: new LeatherBoots({level: 1}),
            },
            isHostile: config.isHostile || true,
            abilityArray: [new Eviscerate({})],
            lootTable: [
                {item: new LeatherHood({level: 1}), weight: 1},
                {item: new LeatherHelmet({level: 1}), weight: 1},
                {item: new LeatherChestplate({level: 1}), weight: 1},
                {item: new LeatherGreaves({level: 1}), weight: 1},
                {item: new LeatherBoots({level: 1}), weight: 1},

                {item: new LinenShirt({level: 1}), weight: 1},
                {item: new LinenPants({level: 1}), weight: 1},

                {item: new Dagger({level: 1}), weight: 2},
                {item: new PoisonedKnife({level: 1}), weight: 2},
                {item: new HealthPotion(), weight: 2},
                {item: new StaminaPotion(), weight: 1},
                {item: new Bandage(), weight: 3},
                
            ],
        });
    }
}
export class MadMage extends Entity{
    constructor(config){
        super({
            name: 'Mad Mage',
            level: config.level || 1,
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

                {item: new LinenShirt({level: 1}), weight: 1},
                {item: new LinenPants({level: 1}), weight: 1},

                {item: new HealthPotion(), weight: 2},
                {item: new StaminaPotion(), weight: 1},
                {item: new MagicPotion(), weight: 1},
                {item: new Bandage(), weight: 3},
                
            ],
        });
    }
}
export class Skeleton extends Entity{
    constructor(config){
        super({
            name: config.name || 'Skeleton',
            level: config.level || 1,
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
                {item: new ShortSword({level: 1}), weight: 1},
                {item: new Handaxe({level: 1}), weight: 1},
                {item: new Buckler({level: 1}), weight: 1},
                {item: new HealthPotion(), weight: 2},
                {item: new StaminaPotion(), weight: 2},
                {item: new MagicPotion(), weight: 2},
                {item: new Bandage(), weight: 3},
                
            ],
        });
    }
    scaleAttributes(){
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
    }
}
export class ArmoredSkeleton extends Skeleton{
    constructor(config){
        super({
            name: config.name || 'Armored Skeleton',
            level: config.level || 1,
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
                {item: new HealthPotion(), weight: 2},
                {item: new StaminaPotion(), weight: 2},
                {item: new MagicPotion(), weight: 2},
                {item: new Bandage(), weight: 3},
                
            ],
        });
    }
}
export class FloatingSkull extends Entity{
    constructor(config){
        super({
            name: 'Floating Skull',
            level: config.level || 1,
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
    scaleAttributes(){
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
    }
}
export class SkeletonCultist extends Entity{
    constructor(config){
        super({
            name: 'Skeleton Cultist',
            level: config.level || 1,
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

                {item: new LinenShirt({level: 1}), weight: 1},
                {item: new LinenPants({level: 1}), weight: 1},

                {item: new HealthPotion(), weight: 2},
                {item: new MagicPotion(), weight: 2},
                {item: new Bandage(), weight: 3},
            ],
        });
    }
    scaleAttributes(){
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
    }
}
export class SkeletonColossus extends Entity{
    constructor(config){
        super({
            name: 'skeleton colossus',
            size: 'large',
            level: config.level || 1,
            apperance: config.apperance || './assets/media/entities/skeleton-colossus.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            equipment: config.equipment || {},
            isHostile: config.isHostile || true,
            abilityArray: [new Punch({damageModifier: 1}), new Pounce({}), new Roar({})],
            baseBluntResistance: config.baseBluntResistance || 0.05,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            lootTable: [
                {item: new DarkStaff({level: 1}), weight: 1},
                {item: new HealthPotion({level: 1}), weight: 1},
                
            ],
        });
    }
    scaleAttributes(){
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
    }
}
export class GroveGuardian extends Entity{
    constructor(config){
        super({
            name: 'Grove Guardian',
            size: 'large',
            level: config.level || 1,
            apperance: config.apperance || './assets/media/entities/grove-guardian.jpg',
            vigor: config.vigor || 8,
            strength: config.strength || 6,
            dexterity: config.dexterity || 3,
            intelligence: config.intelligence || 3,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.2,
            basePierceResistance: config.basePierceResistance || 0.05,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.05,
            isHostile: config.isHostile || true,
            equipment: {},
            abilityArray: [new Bite({}), new VineLash({}), new Earthquake({}), new Roar({})],
            lootTable: [
                {item: new ForestStaff({level: 1}), weight: 1},
                {item: new HealthPotion({level: 1}), weight: 2},
                {item: new PineWood(), weight: 3}
            ],
        })
    }
    scaleAttributes(){
        this.maxHP = (this.vigor * 10)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
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
        this.baseSpeed = 15;
        this.baseEvasion = 0.05;
        this.baseCritical = 0.10;
    }
}
export class Wolf extends Entity{
    constructor(config){
        super({
            name: 'Wolf',
            level: config.level || 1,
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
                {item: new Hide({level: 1}), weight: 1}
            ],
        })
    }
    scaleAttributes(){
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
    }
}
export class Spider extends Entity{
    constructor(config){
        super({
            name: 'Spider',
            level: config.level || 1,
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
                {item: new PoisonedKnife({level: 1}), weight: 3}
            ],
        })
    }
    scaleAttributes(){
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
    }
}
export class SandStalker extends Entity{
    constructor(config){
        super({
            name: 'Sand Stalker',
            level: config.level || 1,
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
                {item: new Bandage(), weight: 3},
                
            ],
        });
        this.statusArray = config.statusArray || [new InstaDeath({holder:this})];
        this.nextForm = config.nextForm || {
            animation: 'twister',
            animationDuration: 3000,
            animationSoundEffect: './assets/audio/soundEffects/tornado.wav',
            createNextForm: ()=>{
                let chance = Math.random()*1;
                if(chance < 1){
                    let hostile = new SandStalker({level: this.level, statusArray: [], nextForm: false});
                    hostile.nextForm = false;//have to do don't know why
                    return hostile
                }else{
                    return new SandStalker({level: this.level});
                }
            },
            messageFn: ()=>{
                return `The ${this.name} disentegrates and quickly rematerializes!`;
            }
        }
    }
    scaleAttributes(){
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
    }
}
export class DryShark extends Entity{
    constructor(config){
        super({
            name: 'Dry Shark',
            size: 'large',
            level: config.level || 1,
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
                {item: new HealthPotion({level: 1}), weight: 2},
                {item: new Hide(), weight: 2}
            ],
        })
    }
    scaleAttributes(){
        this.maxHP = (this.vigor * 10)  + (this.strength * 3) + (this.dexterity * 3) + (this.intelligence * 3) + (this.attunement * 3);
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
    }
}
export class DryEel extends Entity{
    constructor(config){
        super({
            name: 'Dry Eel',
            level: config.level || 1,
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
                {item: new ParalysisTonic({level: 1}), weight: 2},
                {item: new Hide(), weight: 2}
            ],
        })
    }
    scaleAttributes(){
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
    }
}
export class TheSandShade extends Entity{
    constructor(config){
        super({
            name: 'The Sand Shade',
            size: 'large',
            level: config.level || 1,
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
            abilityArray: [new Slash({}), new DrainLife({}), new DarkOrb({}), new ChannelMagic({})],
            lootTable: [],
        });
        this.nextForm = config.nextForm || {
            animation: 'twister',
            animationDuration: 6000,
            animationSoundEffect: './assets/audio/soundEffects/tornado.wav',
            createNextForm: ()=>{
                let hostile = new TheSandShade({level: this.level, nextForm: false, abilityArray: [new Slash({}), new DrainLife({}), new Earthquake({}), new DarkOrb({})],});
                hostile.nextForm = false;//have to do don't know why
                return hostile
           
                
            },
            messageFn: ()=>{
                return `The ${this.name} disentegrates and quickly rematerializes!`;
            }
        }
    }
    scaleAttributes(){
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
    }
}
export class EmperorDolos extends Entity{
    constructor(config){
        super({
            name: 'Emperor Dolos',
            size: 'large',
            level: config.level || 1,
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
            abilityArray: [new DrainLife({}), new DarkOrb({}), new Inferno({}), new ChannelMagic({}), new LightningBolt({}), new Siphon({}), new Bless({})],
            lootTable: [],
        });
        this.nextForm = config.nextForm || {
            animation: 'twister',
            animationDuration: 6000,
            animationSoundEffect: './assets/audio/soundEffects/tornado.wav',
            createNextForm: ()=>{
                let hostile = new EmperorDolos({level: this.level, nextForm: false, abilityArray: [new DrainLife({}), new Inferno({}), new MagicMissile({}), new ChannelMagic({}), new LightningBolt({}), new Siphon({}), new Bless({})],});
                hostile.nextForm = false;//have to do don't know why
                return hostile
           
                
            },
            messageFn: ()=>{
                return `"Hope.... is an illusion....."`;
            }
        }
    }
    scaleAttributes(){
        this.maxHP = (this.vigor * 30)  + (this.strength * 30) + (this.dexterity * 30) + (this.intelligence * 30) + (this.attunement * 30);
        this.maxStamina = (this.vigor * 10) + (this.strength * 10) + (this.dexterity * 10) + (this.intelligence * 10) + (this.attunement * 10);
        this.maxMagic = (this.vigor * 10)  + (this.strength * 10) + (this.dexterity * 10) + (this.intelligence * 10) + (this.attunement * 10);
        this.baseHpRecovery = 0;
        this.baseStaminaRecovery = 15;
        this.baseMagicRecovery = 15;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 20;
        this.baseEvasion = 0.10;
        this.baseCritical = 0.10;
    }
}