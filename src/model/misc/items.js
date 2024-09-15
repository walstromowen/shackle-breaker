import { MagicMissile, Slash, Strike, Cleave, ThrowPosionKnife} from "./abilities.js";

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
            staminaRecovery: 0,
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
            abilityArray: [new Slash({}), new ThrowPosionKnife({})],
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
            staminaRecovery: 0,
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
            abilityArray: [new Slash({})],
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
            staminaRecovery: 0,
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
            this.staminaRecovery = this.staminaRecovery + 0;
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
            staminaRecovery: 0,
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
            this.staminaRecovery = this.staminaRecovery + 0;
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
        }
    }
}
export class Shortbow extends Attachable{
    constructor(config){
        super({
            name: 'shortbow',
            description: `A wooden shortbow. A standard issue shortbow among scouts and archers of the Altus kingdom. "Shortbows are good at evening the odds in unfair fights. They are also particualily popular among those bad at playing the violin." - Commander Mentoras.`,
            imageSrc:  './assets/media/icons/high-shot.png',
            price: 100,
            slot: 'twoHand',
            level: 1,
            hp: 0,
            stamina: 0,
            magic: 0,
            hpRecovery: 0,
            staminaRecovery: 0,
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
            abilityArray: [new ThrowPosionKnife({})],
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
            magicRecovery: 0,
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
            this.magicRecovery = this.magicRecovery + 0;
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
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 0;
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
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 0;
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
            price: 50,
            slot: 'head',
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
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0.01;
            this.critical = this.critical + 0.01;
        }
    }
}
export class LeatherHood extends Attachable{
    constructor(config){
        super({
            name: 'leather hood',
            description: 'A hood that obscures the face made of dark leather. Although most indulged in the discovery of magic, there were a few that found it ominous.',
            imageSrc:  './assets/media/icons/cloak.png',
            price: 50,
            slot: 'head',
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
            this.staminaRecovery = this.staminaRecovery + 0;
            this.magicRecovery = this.magicRecovery + 0;
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