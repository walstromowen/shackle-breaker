import { MagicMissile, Slash, Strike} from "./abilities.js";
import { Poison, Burn} from "./statusEffects.js";
export class Entity{
    constructor(config){
        this.name = config.name || 'entity';
        this.apperance = config.apperance || './assets/media/entities/knight-1.jpg';
        
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
        this.currentSpeed = this.baseSpeed;
        this.currentEvasion = this.baseEvasion;
        this.currentCritical = this.baseCritical;

        this.level = config.level || 1;
        this.currentXP = 0;

        this.equipment = config.equipment || 
        {
            mainhand: '',
            offhand: '',
            head: '',
            torso: '',
            arms: '',
            legs: '',
            feet: '',
        }; 
        this.statusArray = [new Poison({holder: this}), new Burn({holder: this})]; //  new Poison({holder: this}), new Burn({holder: this})
        this.abilityArray = config.abilityArray || [new Slash(), new Strike(), new MagicMissile()];
        
        this.battleId = '';
        this.isHostile = config.isHostile || false;
        this.nextAbility = '';
        this.abilityTargets = [];

        
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
        this.baseStaminaRecovery = 0;
        this.baseMagicRecovery = 0;
        this.baseBluntAttack = (this.vigor * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.intelligence * 2) + (this.attunement * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 3) + (this.attunement * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.intelligence * 2) + (this.attunement * 3);
        this.baseBluntDefense = (this.vigor * 1)  + (this.strength * 2) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.intelligence * 1) + (this.attunement * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 2) + (this.attunement * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.intelligence * 1) + (this.attunement * 2);
        this.baseSpeed = 25;
        this.baseEvasion = 0.1;
        this.baseCritical = 0.1;
    }
    getEquipment(){
        return Object.values(this.equipment);
    }
    getAttributes(){
        return [
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
            this.currentSpeed,
            this.currentEvasion,
            this.currentCritical,
        ];
    }
}

export class Dog extends Entity{
    constructor(config){
        super({
            name: 'Dog',
            apperance: './assets/media/entities/dog.jpg',
            vigor: 5,
            strength: 5,
            dexterity: 5,
            intelligence: 5,
            attunement: 5,
            equipment: {
                dogArmor: '',
            },
        })
    }
}

export class Hawk extends Entity{
    constructor(config){
        super({
            name: 'Hawk',
            apperance: './assets/media/entities/hawk.jpg',
            vigor: 5,
            strength: 5,
            dexterity: 5,
            intelligence: 5,
            attunement: 5,
            equipment: {},
            abilityArray: [new Slash()]
        });
    }
}

export class Skeleton extends Entity{
    constructor(config){
        super({
            name: 'skeleton',
            apperance: './assets/media/entities/skeleton.jpg',
            vigor: 1,
            strength: 5,
            dexterity: 5,
            intelligence: 5,
            attunement: 5,
            isHostile: true,
        });
    }
}

export const companionArray = [
    new Entity({
        name: 'Ragnar Ninarsk',
        apperance: './assets/media/entities/companion-warrior-male-1.jpg',
        vigor: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        attunement: 5,
        equipment: {
            mainhand: '',
            offhand: '',
            head: '',
            torso: '',
            arms: '',
            legs: '',
            feet: '',
        },
    }),
    new Entity({
        name: 'Nicholi Ninarsk',
        apperance: './assets/media/entities/companion-warrior-male-1.jpg',
        vigor: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        attunement: 5,
        equipment: {
            mainhand: '',
            offhand: '',
            head: '',
            torso: '',
            arms: '',
            legs: '',
            feet: '',
        },
    }),
    new Entity({
        name: 'Julian Memira',
        apperance: './assets/media/entities/companion-mage-male-1.jpg',
        vigor: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        attunement: 5,
        equipment: {
            mainhand: '',
            offhand: '',
            head: '',
            torso: '',
            arms: '',
            legs: '',
            feet: '',
        },
    }),
    new Entity({
        name: 'Revan Sekrav',
        apperance: './assets/media/entities/companion-rogue-male-1.jpg',
        vigor: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        attunement: 5,
        equipment: {
            mainhand: '',
            offhand: '',
            head: '',
            torso: '',
            arms: '',
            legs: '',
            feet: '',
        },
    }),
    new Entity({
        name: 'Gwen Swallowtail',
        apperance: './assets/media/entities/companion-rogue-female-1.jpg',
        vigor: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        attunement: 5,
        equipment: {
            mainhand: '',
            offhand: '',
            head: '',
            torso: '',
            arms: '',
            legs: '',
            feet: '',
        },
    }),
];