import { MagicMissile, Slash, Strike, Cleave, ThrowPosionedKnife, Fireball, LesserHeal, ShootWeb, Block, ShootArrow, LightningBolt, Tripleshot, DrainLife, IceShard, VineLash, Earthquake, Shockwave, Bless, Curse, MeteorShower, Thrust, ChannelMagic, Siphon, Eviscerate, DarkOrb, Brace, Inferno, Flurry, Uppercut, ShootBullet, ThrowNet, ThrowSmokeBomb, Shapeshift, Barrage, ShootFlamingArrow, Rage, HailStorm, Hide} from "./abilities.js";
import { DrinkHealthPotion, DrinkStaminaPotion, DrinkMagicPotion, UseAntidote, UseAloeRemedy, UseParalysisTonic, UseBandage, DrinkKurtussBrewOfMadness, SetBearTrap} from "./abilities.js";

let counter = 0;

export class Item{
    constructor(config){
        this.name = config.name || 'item';
        this.description = config.description || `an item.`;
        this.imageSrc = config.imageSrc || './assets/media/icons/knapsack.png';
        this.price = config.price || 1;
        this.itemId = counter;
        counter++;
    }
}

class Attachable extends Item{
    constructor(config){
        super(config);
        this.itemType = 'attachable';
        this.slot = config.slot;
        this.level = config.level;
        this.hp = config.hp || 0;
        this.stamina = config.stamina || 0;
        this.magic = config.magic || 0;
        this.hpRecovery = config.hpRecovery || 0;
        this.staminaRecovery = config.staminaRecovery || 0;
        this.magicRecovery = config.magicRecovery || 0;
        this.bluntAttack = config.bluntAttack || 0;
        this.pierceAttack = config.pierceAttack || 0;
        this.arcaneAttack = config.arcaneAttack || 0;
        this.elementalAttack = config.elementalAttack || 0;
        this.bluntDefense = config.bluntDefense || 0;
        this.pierceDefense = config.pierceDefense || 0;
        this.arcaneDefense = config.arcaneDefense || 0;
        this.elementalDefense = config.elementalDefense || 0;
        this.bluntResistance = config.bluntResistance || 0;
        this.pierceResistance = config.pierceResistance || 0;
        this.arcaneResistance = config.arcaneResistance || 0;
        this.elementalResistance = config.elementalResistance || 0;
        this.speed = config.speed || 0;
        this.evasion = config.evasion || 0;
        this.critical = config.critical || 0;
        this.abilityArray = config.abilityArray || [];
    }
}

class Consumable extends Item{
    constructor(config){
        super(config);
        this.itemType = 'consumable';
        this.abilityArray = config.abilityArray || [];
        this.inProgress = false;
        this.charges = config.charges || 1;
        this.useSituations = config.useSituations || ['overworld', 'battle'];
    }
}

class Material extends Item{
    constructor(config){
        super(config);
        this.itemType = 'material';
    }
}

export class Dagger extends Attachable{
    constructor(config){
        super({
            name: 'dagger',
            description: 'A simple dagger. "Often times, a duel is another way of saying who can draw their weapon fastest" - Commander Mentoras.',
            imageSrc:  './assets/media/icons/bowie-knife.png',
            price: 100,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 3,
            magicRecovery: 0,
            bluntAttack: 1,
            pierceAttack: 2,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Slash({}), new ThrowPosionedKnife({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 2;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 2;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new Eviscerate({}));
            }
        }
    }
}
export class ShortSword extends Attachable{
    constructor(config){
        super({
            name: 'shortsword',
            description: 'A standard shortsword. Standard issue shortsword of the Altus guard. "A shorter longsword is a faster longsword" - Commander Mentoras.',
            imageSrc:  './assets/media/icons/stiletto.png',
            price: 100,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 0,
            bluntAttack: 2,
            pierceAttack: 3,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Slash({}), new Thrust({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new Flurry({}));
            }
        }
    }
}
export class BlacksmithHammer extends Attachable{
    constructor(config){
        super({
            name: 'blacksmith hammer',
            description: "A blacksmith's hammer. Since what many consider to be the fall of Altus kingdom, quality weapons are hard to come by. Perhaps this explains the blood stains on this ordinary hammer",
            imageSrc:  './assets/media/icons/flat-hammer.png',
            price: 100,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 3,
            magicRecovery: 0,
            bluntAttack: 2,
            pierceAttack: 1,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 2;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 2;
            this.pierceAttack = this.pierceAttack + 1;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new Uppercut({}));
            }
        }
    }
}
export class Handaxe extends Attachable{
    constructor(config){
        super({
            name: 'handaxe',
            description: `A battered handaxe. After the fall of Altus kingdom, many common tools were repurposed as weapons much like this well worn axe. "An axe is a simple lever. The harder you pull the lever, the quicker your work becomes." - Commander Mentoras.`,
            imageSrc:  './assets/media/icons/battered-axe.png',
            price: 100,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 0,
            bluntAttack: 2,
            pierceAttack: 3,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Slash({}), new Cleave({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 2){
                this.abilityArray.push(new Rage({}));
            }
        }
    }
}
export class Shortbow extends Attachable{
    constructor(config){
        super({
            name: 'shortbow',
            description: `A wooden shortbow. A standard issue shortbow among scouts and archers of the Altus kingdom. "Shortbows are good at evening the odds in unfair fights. They are also particuarlily popular among those bad at playing the violin." - Commander Mentoras.`,
            imageSrc:  './assets/media/icons/high-shot.png',
            price: 200,
            slot: 'twoHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 4,
            magicRecovery: 0,
            bluntAttack: 1,
            pierceAttack: 5,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new ShootArrow({}), new Tripleshot({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 3;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0.01;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
            if(this.level == 3){
                this.abilityArray.push(new ShootFlamingArrow({}));
            }
        }
    }
}
export class ArcaneStaff extends Attachable{
    constructor(config){
        super({
            name: 'arcane staff',
            description: "A wooden staff imbued with arcane. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time",
            imageSrc:  './assets/media/icons/wizard-staff.png',
            price: 200,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 2,
            bluntAttack: 1,
            pierceAttack: 1,
            arcaneAttack: 3,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({}), new MagicMissile({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 3;
            this.elementalAttack = this.elementalAttack + 1;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new ChannelMagic({}));
            }
        }
    }
}
export class LightStaff extends Attachable{
    constructor(config){
        super({
            name: 'light staff',
            description: "A wooden staff imbued with light. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time",
            imageSrc:  './assets/media/icons/wizard-staff.png',
            price: 200,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 2,
            bluntAttack: 1,
            pierceAttack: 1,
            arcaneAttack: 3,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({}), new LesserHeal({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 3;
            this.elementalAttack = this.elementalAttack + 1;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new Bless({}));
            }
        }
    }
}
export class DarkStaff extends Attachable{
    constructor(config){
        super({
            name: 'dark staff',
            description: "A wooden staff imbued with darkness. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time",
            imageSrc:  './assets/media/icons/wizard-staff.png',
            price: 200,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 2,
            bluntAttack: 1,
            pierceAttack: 1,
            arcaneAttack: 3,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({}), new DarkOrb({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 3;
            this.elementalAttack = this.elementalAttack + 1;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new DrainLife({}));
            }
        }
    }
}
export class FireStaff extends Attachable{
    constructor(config){
        super({
            name: 'fire staff',
            description: "A wooden staff imbued with fire. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time",
            imageSrc:  './assets/media/icons/wizard-staff.png',
            price: 200,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 2,
            bluntAttack: 1,
            pierceAttack: 1,
            arcaneAttack: 0,
            elementalAttack: 3,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({}), new Fireball({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 1;
            this.elementalAttack = this.elementalAttack + 3;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new Inferno({}));
            }
        }
    }
}
export class LightningStaff extends Attachable{
    constructor(config){
        super({
            name: 'lightning staff',
            description: "A wooden staff imbued with lightning. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time",
            imageSrc:  './assets/media/icons/wizard-staff.png',
            price: 200,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 2,
            bluntAttack: 1,
            pierceAttack: 1,
            arcaneAttack: 0,
            elementalAttack: 3,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({}), new LightningBolt({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 1;
            this.elementalAttack = this.elementalAttack + 3;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new Shockwave({}));
            }
        }
    }
}
export class IceStaff extends Attachable{
    constructor(config){
        super({
            name: 'ice staff',
            description: "A wooden staff imbued with ice. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time",
            imageSrc:  './assets/media/icons/wizard-staff.png',
            price: 200,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 2,
            bluntAttack: 1,
            pierceAttack: 1,
            arcaneAttack: 0,
            elementalAttack: 3,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({}), new IceShard({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 1;
            this.elementalAttack = this.elementalAttack + 3;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new HailStorm({}));
            }
        }
    }
}
export class ForestStaff extends Attachable{
    constructor(config){
        super({
            name: 'forest staff',
            description: "A carved walking staff made from the branch of a tree. The discovery of the artifact released the potential of many ordinary things like this former tree branch.",
            imageSrc:  './assets/media/icons/wizard-staff.png',
            price: 200,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 2,
            bluntAttack: 1,
            pierceAttack: 1,
            arcaneAttack: 0,
            elementalAttack: 3,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Strike({}), new VineLash({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 1;
            this.elementalAttack = this.elementalAttack + 3;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 2){
                this.abilityArray.push(new Earthquake({}));
            }
            if(this.level == 3){
                this.abilityArray.push(new Shapeshift({}));
            }
        }
    }
}
export class Flintlock extends Attachable{
    constructor(config){
        super({
            name: 'flintlock',
            description: 'A flintlock pistol commonly held by Panzerian engineers. Firearms were first invented by Panzerians and although often considered more intimidating than bows, they are often less acurate. That being said, a well placed bullet can reach places that no arrow can.',
            imageSrc:  './assets/media/icons/sawed-off-shotgun.png',
            price: 100,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 0,
            bluntAttack: 2,
            pierceAttack: 2,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: 1,
            evasion: 0.01,
            critical: 0.05,
            abilityArray: [new ShootBullet({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 2;
            this.pierceAttack = this.pierceAttack + 2;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new Barrage({}));
            }
        }
    }
}
export class LinenShirt extends Attachable{
    constructor(config){
        super({
            name: 'linen shirt',
            description: 'A heavily worn linen shirt. Standard article of clothing for citizens of the Altus kingdom, or rather, what is left of them.',
            imageSrc:  './assets/media/icons/shirt.png',
            price: 50,
            slot: 'torso',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 0,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 1,
            pierceDefense: 1,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.01,
            pierceResistance: 0.01,
            arcaneResistance: 0.01,
            elementalResistance: 0.01,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
        }
    }
}
export class LinenPants extends Attachable{
    constructor(config){
        super({
            name: 'linen pants',
            description: 'A heavily worn pair of linen trousers. Standard article of clothing for citizens of the Altus kingdom, or rather, what is left of them.',
            imageSrc:  './assets/media/icons/trousers.png',
            price: 50,
            slot: 'legs',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
            magicRecovery: 0,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 1,
            pierceDefense: 1,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.01,
            pierceResistance: 0.01,
            arcaneResistance: 0.01,
            elementalResistance: 0.01,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
        }
    }
}
export class LeatherHelmet extends Attachable{
    constructor(config){
        super({
            name: 'leather helmet',
            description: 'A leather helmet. A standard issue helmet among scouts and archers of the Altus kingdom.',
            imageSrc:  './assets/media/icons/light-helm.png',
            price: 100,
            slot: 'head',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 2,
            pierceDefense: 2,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.02,
            pierceResistance: 0.02,
            arcaneResistance: 0.02,
            elementalResistance: 0.02,
            speed: 1,
            evasion: 0.02,
            critical: 0.02,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 2;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
            if(this.level == 3){
                this.abilityArray.push(new Hide({}))
            }
        }
    }
}
export class LeatherHood extends Attachable{
    constructor(config){
        super({
            name: 'leather hood',
            description: 'A hood that obscures the face made of dark leather. Although most indulged in the discovery of magic, there were a few that found it ominous.',
            imageSrc:  './assets/media/icons/cloak.png',
            price: 100,
            slot: 'head',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 2,
            pierceDefense: 2,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.01,
            pierceResistance: 0.01,
            arcaneResistance: 0.02,
            elementalResistance: 0.02,
            speed: 1,
            evasion: 0.03,
            critical: 0.03,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 2;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
            if(this.level == 3){
                this.abilityArray.push(new Hide({}))
            }
        }
    }
}
export class LeatherChestplate extends Attachable{
    constructor(config){
        super({
            name: 'leather chestplate',
            description: 'A leather chestplate. A standard issue chestplate among scouts and archers of the Altus kingdom.',
            imageSrc:  './assets/media/icons/leather-armor.png',
            price: 100,
            slot: 'torso',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 2,
            pierceDefense: 2,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.02,
            pierceResistance: 0.02,
            arcaneResistance: 0.02,
            elementalResistance: 0.02,
            speed: 1,
            evasion: 0.02,
            critical: 0.02,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 2;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
            if(this.level == 3){
                this.abilityArray.push(new Hide({}))
            }
        }
    }
}
export class LeatherGloves extends Attachable{
    constructor(config){
        super({
            name: 'leather gloves',
            description: 'Leather gloves. A common article of clothing among worker of the Altus kingdom. With the discovery of magic, many in the altus kingdom lost appreciation for common safety practices like hand protection.',
            imageSrc:  './assets/media/icons/gloves.png',
            price: 100,
            slot: 'arms',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 2,
            pierceDefense: 2,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.02,
            pierceResistance: 0.02,
            arcaneResistance: 0.02,
            elementalResistance: 0.02,
            speed: 1,
            evasion: 0.02,
            critical: 0.02,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
            if(this.level == 3){
                this.abilityArray.push(new Hide({}))
            }
        }
    }
}
export class LeatherGreaves extends Attachable{
    constructor(config){
        super({
            name: 'leather greaves',
            description: 'Leather greaves. Standard issue greaves among scouts and archers of the Altus kingdom.',
            imageSrc:  './assets/media/icons/armor-cuisses.png',
            price: 100,
            slot: 'legs',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 2,
            pierceDefense: 2,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.02,
            pierceResistance: 0.02,
            arcaneResistance: 0.02,
            elementalResistance: 0.02,
            speed: 1,
            evasion: 0.02,
            critical: 0.02,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 2;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
            if(this.level == 3){
                this.abilityArray.push(new Hide({}))
            }
        }
    }
}
export class LeatherBoots extends Attachable{
    constructor(config){
        super({
            name: 'leather boots',
            description: 'Reliable leather boots. After discovery of magic, travelers from all over came to Altus kingdom. Few ever left.',
            imageSrc:  './assets/media/icons/boots.png',
            price: 100,
            slot: 'feet',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 2,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 2,
            pierceDefense: 2,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.01,
            pierceResistance: 0.02,
            arcaneResistance: 0.02,
            elementalResistance: 0.02,
            speed: 2,
            evasion: 0.02,
            critical: 0.01,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 2;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
            if(this.level == 3){
                this.abilityArray.push(new Hide({}))
            }
        }
    }
}
export class IronHelm extends Attachable{
    constructor(config){
        super({
            name: 'iron helm',
            description: `A heavy iron helm. A standard issue helm among soldiers and guards of the Altus kingdom.`,
            imageSrc:  './assets/media/icons/barbute.png',
            price: 100,
            slot: 'head',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 4,
            pierceDefense: 4,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.04,
            pierceResistance: 0.03,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: -1,
            evasion: -0.01,
            critical: 0.00,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 3;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.00;
            this.critical = this.critical + 0.00;
            if(this.level == 3){
                this.abilityArray.push(new Brace({}));
            }
        }
    }
}
export class IronChainmail extends Attachable{
    constructor(config){
        super({
            name: 'iron chainmail',
            description: `Heavy iron chainmail. Standard issue chainmail among soldiers and guards of the Altus kingdom.`,
            imageSrc:  './assets/media/icons/chain-mail.png',
            price: 100,
            slot: 'torso',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 4,
            pierceDefense: 4,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.04,
            pierceResistance: 0.03,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: -1,
            evasion: -0.01,
            critical: 0.00,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 3;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.00;
            this.critical = this.critical + 0.00;
            if(this.level == 3){
                this.abilityArray.push(new Brace({}));
            }
        }
    }
}
export class IronGauntlets extends Attachable{
    constructor(config){
        super({
            name: 'iron gauntlets',
            description: `Heavy iron gauntlets. Standard issue gauntlets among soldiers and guards of the Altus kingdom.`,
            imageSrc:  './assets/media/icons/gauntlet.png',
            price: 100,
            slot: 'arms',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 4,
            pierceDefense: 4,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.04,
            pierceResistance: 0.03,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: -1,
            evasion: -0.01,
            critical: 0.00,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 3;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.00;
            this.critical = this.critical + 0.00;
            if(this.level == 3){
                this.abilityArray.push(new Brace({}));
            }
        }
    }
}
export class IronGreaves extends Attachable{
    constructor(config){
        super({
            name: 'iron greaves',
            description: `Heavy iron greaves. Standard issue greaves among soldiers and guards of the Altus kingdom.`,
            imageSrc:  './assets/media/icons/armored-pants.png',
            price: 100,
            slot: 'legs',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 4,
            pierceDefense: 4,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.04,
            pierceResistance: 0.03,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: -1,
            evasion: -0.01,
            critical: 0.00,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 3;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.00;
            this.critical = this.critical + 0.00;
            if(this.level == 3){
                this.abilityArray.push(new Brace({}));
            }
        }
    }
}
export class IronBoots extends Attachable{
    constructor(config){
        super({
            name: 'iron boots',
            description: `Heavy iron boots. Standard issue boots among soldiers and guards of the Altus kingdom.`,
            imageSrc:  './assets/media/icons/leg-armor.png',
            price: 100,
            slot: 'feet',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 4,
            pierceDefense: 4,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.04,
            pierceResistance: 0.03,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: -1,
            evasion: -0.01,
            critical: 0.00,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 3;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.00;
            this.critical = this.critical + 0.00;
            if(this.level == 3){
                this.abilityArray.push(new Brace({}));
            }
        }
    }
}
export class ClothHood extends Attachable{
    constructor(config){
        super({
            name: 'cloth hood',
            description: `A thick cloth hood. Garmets like this were common among the many seeking to gain quick riches from the discovery of magic in the Altus kingdom.`,
            imageSrc:  './assets/media/icons/cowled.png',
            price: 100,
            slot: 'head',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 3,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 1,
            pierceDefense: 1,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.01,
            pierceResistance: 0.01,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: 0,
            evasion: 0.01,
            critical: 0,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 2;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new ChannelMagic({}));
            }
        }
    }
}
export class ClothRobe extends Attachable{
    constructor(config){
        super({
            name: 'cloth robe',
            description: `A thick cloth robe. Garmets like this were common among the many seeking to gain quick riches from the discovery of magic in the Altus kingdom.`,
            imageSrc:  './assets/media/icons/robe.png',
            price: 100,
            slot: 'torso',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 3,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 1,
            pierceDefense: 1,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.01,
            pierceResistance: 0.01,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: 0,
            evasion: 0.01,
            critical: 0,
            abilityArray: [],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 2;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0;
            if(this.level == 3){
                this.abilityArray.push(new ChannelMagic({}));
            }
        }
    }
}
export class Buckler extends Attachable{
    constructor(config){
        super({
            name: 'buckler',
            description: 'A wooden buckler. A buckler fashioned from hard wood. A blue and green symbol of unknown origin is painted on its front.',
            imageSrc:  './assets/media/icons/round-shield.png',
            price: 100,
            slot: 'oneHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 2,
            pierceDefense: 2,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.02,
            pierceResistance: 0.02,
            arcaneResistance: 0.02,
            elementalResistance: 0.02,
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [new Block({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
        }
    }
}
export class IronSheild extends Attachable{
    constructor(config){
        super({
            name: 'iron shield',
            description: 'An iron shield. A heavy shield made of solid iron. Shield weilded by knights of the Royal Altus Guard.',
            imageSrc:  './assets/media/icons/shield.png',
            price: 100,
            slot: 'feet',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 1,
            magicRecovery: 1,
            bluntAttack: 0,
            pierceAttack: 0,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 4,
            pierceDefense: 4,
            arcaneDefense: 1,
            elementalDefense: 1,
            bluntResistance: 0.04,
            pierceResistance: 0.03,
            arcaneResistance: 0.03,
            elementalResistance: 0.02,
            speed: -1,
            evasion: -0.01,
            critical: 0.00,
            abilityArray: [new Block({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 3;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.00;
            this.critical = this.critical + 0.00;
            if(this.level == 3){
                this.abilityArray.push(new Brace({}));
            }
        }
    }
}
export class PanzerkamferArmor extends Attachable{
    constructor(config){
        super({
            name: 'Panzerkamfer armor',
            description: `A carefully engineered armor with an array of weapons. The Panzerkamfers were one of the Panzerian army's greatest weapons and held back the cursed Altus Kingdom following its descent into madness. However, as Panzeria began incorporating magic into the Panzerkamfer armor, the beasts themselves went mad, and Panzeria succumbed to the same madness shortly after.`,
            imageSrc:  './assets/media/icons/leg-armor.png',
            price: 300,
            slot: 'mediumAnimalArmor',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 3,
            staminaRecovery: 5,
            magicRecovery: 5,
            bluntAttack: 3,
            pierceAttack: 0,
            arcaneAttack: 3,
            elementalAttack: 0,
            bluntDefense: 4,
            pierceDefense: 4,
            arcaneDefense: 2,
            elementalDefense: 2,
            bluntResistance: 0.1,
            pierceResistance: 0.1,
            arcaneResistance: 0.05,
            elementalResistance: 0.05,
            speed: 1,
            evasion: 0.02,
            critical: 0.05,
            abilityArray: [new Barrage({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 1;
            this.bluntAttack = this.bluntAttack + 2;
            this.pierceAttack = this.pierceAttack + 2;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 3;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0.00;
            this.critical = this.critical + 0.00;
            if(this.level == 3){
                this.abilityArray.push(new Brace({}));
            }
        }
    }
}
export class GreatSword extends Attachable{
    constructor(config){
        super({
            name: 'greatsword',
            description: 'A standard greatsword. Greatsword weilded by captains of the Royal Altus Guard. "A personal favorite of mine. It is like a regular sword just greater." - Commander Mentoras.',
            imageSrc:  './assets/media/icons/croc-sword.png',
            price: 200,
            slot: 'twoHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 3,
            magicRecovery: 0,
            bluntAttack: 6,
            pierceAttack: 6,
            arcaneAttack: 0,
            elementalAttack: 0,
            bluntDefense: 0,
            pierceDefense: 0,
            arcaneDefense: 0,
            elementalDefense: 0,
            bluntResistance: 0,
            pierceResistance: 0,
            arcaneResistance: 0,
            elementalResistance: 0,
            speed: -1,
            evasion: -1,
            critical: 0,
            abilityArray: [new Slash({}), new Cleave({})],
        })
        this.upgrade(config.level-this.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hp = this.hp + 0;
            this.stamina = this.stamina + 0;
            this.magic = this.magic + 0;
            this.hpRecovery = this.hpRecovery + 0;
            this.staminaRecovery = this.staminaRecovery + 1;
            this.magicRecovery = this.magicRecovery + 0;
            this.bluntAttack = this.bluntAttack + 3;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
            this.critical = this.critical + 0;
            if(this.level == 2){
                this.abilityArray.push(new Uppercut({}));
            }
        }
    }
}
export class PineWood extends Material{
    constructor(){
        super({
            name: 'pine wood',
            description: 'A pine wood board. Boards such are these are considered softwood, and although plentiful, are less sturdy than hardwoods',
            imageSrc: './assets/media/icons/wood-beam.png',
            price: 100,
        });
    }
}
export class Pelt extends Material{
    constructor(){
        super({
            name: 'pelt',
            description: 'a valuable animal hide. Pelt of a common animal.',
            imageSrc: './assets/media/icons/animal-hide.png',
            price: 100,
        });
    }
}
export class IronOre extends Material{
    constructor(){
        super({
            name: 'iron ore',
            description: 'raw iron ore.',
            imageSrc: './assets/media/icons/ore.png',
            price: 150,
        });
    }
}
export class Diamond extends Material{
    constructor(){
        super({
            name: 'diamond',
            description: 'a valuable diamond. Rare gems have always captured the hearts of greedy men, perhaps even more so the hearts of madmen.',
            imageSrc: './assets/media/icons/cut-diamond.png',
            price: 1000,
        });
    }
}
export class HealthPotion extends Consumable{
    constructor(){
        super({
            name: 'health potion',
            description: 'a magical brew designed to restore health',
            imageSrc: './assets/media/icons/standing-potion.png',
            price: 20,
            abilityArray: [new DrinkHealthPotion({})],
            charges: 1,
        });
    }
}
export class StaminaPotion extends Consumable{
    constructor(){
        super({
            name: 'stamina potion',
            description: 'a magical brew designed to restore stamina',
            imageSrc: './assets/media/icons/square-bottle.png',
            price: 20,
            abilityArray: [new DrinkStaminaPotion({})],
            charges: 1,
        });
    }
}
export class MagicPotion extends Consumable{
    constructor(){
        super({
            name: 'magic potion',
            description: 'a magical brew designed to restore magic',
            imageSrc: './assets/media/icons/potion-ball.png',
            price: 20,
            abilityArray: [new DrinkMagicPotion({})],
            charges: 1,
        });
    }
}
export class Antidote extends Consumable{
    constructor(){
        super({
            name: 'antidote',
            description: 'an antidote used to treat most poisons.',
            imageSrc: './assets/media/icons/corked-tube.png',
            price: 30,
            abilityArray: [new UseAntidote({})],
            charges: 1,
        });
    }
}
export class AloeRemedy extends Consumable{
    constructor(){
        super({
            name: 'aloe remedy',
            description: 'a remedy used to treat burns.',
            imageSrc: './assets/media/icons/curled-leaf.png',
            price: 30,
            abilityArray: [new UseAloeRemedy({})],
            charges: 1,
        });
    }
}
export class Bandage extends Consumable{
    constructor(){
        super({
            name: 'bandage',
            description: 'a bandage used to stop bleeding.',
            imageSrc: './assets/media/icons/bandage-roll.png',
            price: 30,
            abilityArray: [new UseBandage({})],
            charges: 1,
        });
    }
}
export class ParalysisTonic extends Consumable{
    constructor(){
        super({
            name: 'paralysis tonic',
            description: `a tonic used to treat paralysis. Although the power of the artifact drove many mad, a select few used its power for good resulting in major breakthroughs in medicine.`,
            imageSrc: './assets/media/icons/round-bottom-flask.png',
            price: 30,
            abilityArray: [new UseParalysisTonic({})],
            charges: 1,
        });
    }
}
export class PoisonedKnife extends Consumable{
    constructor(){
        super({
            name: 'poisoned knife',
            description: 'a small knife, dipped in poison, that can be thrown during combat',
            imageSrc: './assets/media/icons/thrown-daggers.png',
            price: 20,
            abilityArray: [new ThrowPosionedKnife({})],
            useSituations: ['battle'],
        });
    }
}
export class BearTrap extends Consumable{
    constructor(){
        super({
            name: 'bear trap',
            description: 'A trap used for catching small game and keeping away bears or other large beasts',
            imageSrc: './assets/media/icons/man-trap.png',
            price: 50,
            abilityArray: [new SetBearTrap({})],
            useSituations: ['battle', 'overworld'],
        });
    }
}
export class Net extends Consumable{
    constructor(){
        super({
            name: 'net',
            description: 'A net used for trapping small creatures',
            imageSrc: './assets/media/icons/fishing-net.png',
            price: 50,
            abilityArray: [new ThrowNet({})],
            useSituations: ['battle'],
        });
    }
}
export class SmokeBomb extends Consumable{
    constructor(){
        super({
            name: 'smokebomb',
            description: 'A smokebomb for hasty escapes or dramatic entrances.',
            imageSrc: './assets/media/icons/smoke-bomb.png',
            price: 50,
            abilityArray: [new ThrowSmokeBomb({})],
            useSituations: ['battle'],
        });
    }
}
export class ScrollOfInferno extends Consumable{
    constructor(){
        super({
            name: 'scroll of inferno',
            description: 'a magical scroll, that when read, summons an inferno to engulf enemies.',
            imageSrc: './assets/media/icons/tied-scroll.png',
            price: 100,
            abilityArray: [new Inferno({})],
            useSituations: ['battle'],
            charges: 3,
        });
    }
}
export class ScrollOfHailStorm extends Consumable{
    constructor(){
        super({
            name: 'scroll of hailstorm',
            description: 'a magical scroll, that when read, summons a hailstrom to blow against enemies.',
            imageSrc: './assets/media/icons/tied-scroll.png',
            price: 100,
            abilityArray: [new HailStorm({})],
            useSituations: ['battle'],
            charges: 3,
        });
    }
}
export class KurtussBrewOfMadness extends Consumable{
    constructor(){
        super({
            name: "kurtus's brew of madness",
            description: 'Fabled brew of Kurtus the Greatucus. It is said that the legendary warrior duo of Kurtus the Greatucus and Shmindolyn were unmatched in combat, but ultimatley succumbed to madness. It is rumored that consumption of a special concoction contributed to said madness.',
            imageSrc: './assets/media/icons/potion-of-madness.png',
            price: 200,
            abilityArray: [new DrinkKurtussBrewOfMadness({})],
            useSituations: ['overworld'],
        });
    }
}
export class Meteorite extends Consumable{
    constructor(){
        super({
            name: 'meteorite',
            description: 'a framgment of a meteor. The artifact is rumored to have come from another world. Much like this meteorite. Use to summon a meteor shower.',
            imageSrc: './assets/media/icons/asteroid.png',
            price: 300,
            abilityArray: [],
            useSituations: ['overworld'],
        });
    }
}
//smoke bomb
//tome of 
//gold bag

