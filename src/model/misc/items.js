
export class Item{
    constructor(config){
        this.name = config.name || 'item';
        this.description = config.description || `an item.`;
        this.imageSrc = config.imageSrc || './assets/media/icons/knapsack.png';
        this.price = config.price || 1;
    }
}

class Attachable extends Item{
    constructor(config){
        super(config);
        this.itemType = 'attachable';
        this.slot = config.slot;
        this.level = config.level;
        this.hP = config.hP || 0;
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
            imageSrc:  './assets/media/icons/dagger.png',
            price: 200,
            slot: 'one hand',
            level: 1,
            hP: 0,
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
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [],
        })
        this.upgrade(config.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hP = this.hP + 0;
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
export class LinenShirt extends Attachable{
    constructor(config){
        super({
            name: 'dagger',
            description: 'A heavily worn linen shirt. Standard article of clothing for citizens of the Altus kingdom, or rather, whats left of them.',
            imageSrc:  './assets/media/icons/shirt.png',
            price: 50,
            slot: 'torso',
            level: 1,
            hP: 0,
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
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [],
        })
        this.upgrade(config.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hP = this.hP + 0;
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
            description: 'A heavily worn pair of linen trousers. Standard article of clothing for citizens of the Altus kingdom, or rather, whats left of them.',
            imageSrc:  './assets/media/icons/trousers.png',
            price: 50,
            slot: 'pants',
            level: 1,
            hP: 0,
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
            speed: 0,
            evasion: 0,
            critical: 0,
            abilityArray: [],
        })
        this.upgrade(config.level);
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.hP = this.hP + 0;
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


export class PineWood extends Material{
    constructor(){
        super({
            name: 'pine Wood',
            description: 'a pine wood board.',
            imageSrc: './assets/media/icons/wood-beam.png',
            price: 100,
        });
    }
}