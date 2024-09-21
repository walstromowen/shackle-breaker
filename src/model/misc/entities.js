import { MagicMissile, Slash, Strike, Cleave, ThrowPosionedKnife} from "./abilities.js";
import { Poison, Burn} from "./statusEffects.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, LinenShirt, LinenPants, PineWood, Handaxe, Shortbow } from "./items.js";
export class Entity{
    constructor(config){
        this.name = config.name || 'entity';
        this.apperance = config.apperance || './assets/media/entities/knight-1.jpg';
        
        this.level = config.level || 1;
        this.vigor = config.vigor || 1;
        this.strength = config.strength || 1;
        this.dexterity = config.strength || 1;
        this.intelligence = config.intelligence || 1;
        this.attunement = config.attunement || 1;

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
        this.statusArray = []; //  new Poison({holder: this}), new Burn({holder: this})
        this.abilityArray = config.abilityArray || [];//new Strike(), new MagicMissile(), new ThrowPosionedKnife(),
        
        this.partyId = '';
        this.battleId = '';
        this.isHostile = config.isHostile || false;
        this.isSelectable = true;
        this.nextAbility = '';
        this.abilityTargets = [];
        this.lootTable = config.lootTable || {};
        this.addAttatchableStats(Object.keys(this.equipment));
        
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
    addAttatchableStats(slots){
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
    subtractAttatchableStats(slots){
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
}


export class Dog extends Entity{
    constructor(config){
        super({
            name: 'Dog',
            apperance: './assets/media/entities/dog.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            baseBluntResistance: config.baseBluntResistance || 0.1,
            basePierceResistance: config.basePierceResistance || 0.1,
            baseArcaneResistance: config.baseArcaneResistance || 0.1,
            baseElementalResistance: config.baseElementalResistance || 0.1,
            isHostile: config.isHostile || false,
            equipment: {
                dogArmor: '',
            },
            abilityArray: [new Slash({})],
        })
    }
}

export class Hawk extends Entity{
    constructor(config){
        super({
            name: 'Hawk',
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

export class Skeleton extends Entity{
    constructor(config){
        super({
            name: 'skeleton',
            apperance: './assets/media/entities/skeleton.jpg',
            vigor: config.vigor || 5,
            strength: config.strength || 5,
            dexterity: config.dexterity || 5,
            intelligence: config.intelligence || 5,
            attunement: config.attunement || 5,
            equipment: {
                mainHand: new Handaxe({level: 1}),
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
                {item: new ShortSword({level: 1}), weight: 1},
                {item: new Handaxe({level: 1}), weight: 2},
                {item: new PineWood(), weight: 3}
            ],
        });
    }
}
export class Wolf extends Entity{
    constructor(config){
        super({
            name: 'wolf',
            apperance: './assets/media/entities/wolf.jpg',
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
                dogArmor: '',
            },
            abilityArray: [new Slash({})],
            lootTable: [
                {item: new Dagger({level: 1}), weight: 1},
                {item: new Shortbow({level: 1}), weight: 1}
            ],
        })
    }
}
