import {Slash, Strike, Stab, Flurry, Eviscerate, Block, Fireball, Meditate, Cleanse, ShieldBash, LightBeam, GuardBreak, DrinkHealthPotion, DrinkStaminaPotion, DrinkMagicPotion, ThrowKnife, ThrowPoisonedKnife, SmashMeteorite, UseAntidote, UseAloeRemedy, UseBandage,
        ThrowNet, Immolate, LightningBolt, Shockwave, Recuperate, IceShard, IceBarrier, DrainLife, Siphon, ArcaneDart, ArcaneBlast, Channel, ThrowSmokebomb, CastShadow, BlinkStrike, Empower, WildSwing, Pounce, Bite, ShootArrow, TripleShot,
        Roar, UseFrostbiteTonic, UseParalysisTonic, MeteorShower, SummonSkeleton, ArcaneSalvo, Bless, VineLash, ThrowThistles, VortexSheild, ShootPoisonArrow} from "./abilities.js"

export function getRandomItem(){
    let itemArray = [new LinenShirt, new LinenPants, new Dagger, new BlacksmithHammer, new Spear, new Shortsword, new Longsword, new Handaxe, new NightbladeSword,
                new Shiv, new Buckler, new FireStaff, new LightningStaff, new IceStaff, new ArcaneStaff, new LightStaff, new DarkStaff, new LeatherHelmet, 
                new LeatherHood, new LeatherGloves, new LeatherChestplate, new LeatherGreaves, new NightbladeHelm, new NightbladeChestplate, new RoyalAltusRobes, new RoyalAltusPants,
                new LeatherBoots, new KiteShield, new IronHelmet, new IronGauntlets, new IronChainmail, 
                new IronGreaves, new IronBoots, new CrystalBall, new ClothHood, new ClothRobe, new Shortbow, new ForestStaff,
                new HealthPotion, new StaminaPotion, new MagicPotion, 
                new ThrowingKnife, new PoisonedKnife, new Meteorite, new Antidote, new AloeRemedy, new Net, new SmokeBomb, new Bandage, new FrostbiteTonic, new ParalysisTonic];
                return itemArray[Math.floor(Math.random() * itemArray.length)];
    }
export class LinenShirt {
    constructor(){
        this.name = "linen shirt";
        this.type = "torso";
        this.imageSrc = "./media/icons/shirt.png";
        this.description = "A heavily worn linen shirt. Standard article of clothing for citizens of the Altus kingdom, or rather, whats left of them."
        this.level = 1;
        this.price = 50;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
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
        }
    }
}
export class LinenPants {
    constructor(){
        this.name = "linen pants";
        this.type = "legs";
        this.imageSrc = "./media/icons/trousers.png";
        this.description = "A heavily worn pair of linen trousers. Standard article of clothing for citizens of the Altus kingdom, or rather, whats left of them.";
        this.level = 1;
        this.price = 50;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
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
        }
    }
}
export class Dagger {
    constructor(){
        this.name = "dagger";
        this.type = "one hand";
        this.imageSrc = "./media/icons/dagger.png";
        this.description = 'A simple dagger. "Often times, a duel is another way of saying who can draw their weapon fastest" - Commander Mentoras.';
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Stab(), new Slash()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 2;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 1;
        }
        if(this.level == 3){
            this.abilityArray.push(new Eviscerate());
        }
    }
}
export class BlacksmithHammer {
    constructor(){
        this.name = "blacksmith hammer";
        this.type = "one hand";
        this.imageSrc = "./media/icons/blacksmith-hammer.png";
        this.description = "A blacksmith's hammer. Since what many consider to be the fall of Altus kingdom, quality weapons are hard to come by. Perhaps this explains the blood stains on this ordinary hammer";
        this.level = 1;
        this.price = 50;
        this.bluntAttack = 2;
        this.pierceAttack = 1;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 2;
        this.evasion = 0;
        this.abilityArray = [new Strike()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 2;
            this.pierceAttack = this.pierceAttack + 1;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class Spear {
    constructor(){
        this.name = "spear";
        this.type = "one hand";
        this.imageSrc = "./media/icons/spear.png";
        this.description = `A standard spear. Standard issue spear of the Altus guard. "Keep your friends close and your enemies at spear's length" - Commander Mentoras.`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 5;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Stab(), new Strike()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
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
        }
    }
}
export class Shortsword {
    constructor(){
        this.name = "shortsword";
        this.type = "one hand";
        this.imageSrc = "./media/icons/shortsword.png";
        this.description = `A standard shortsword. Standard issue shortsword of the Altus guard. "A shorter longsword is a faster longsword" - Commander Mentoras.`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 2;
        this.pierceAttack = 3;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 2;
        this.evasion = 0;
        this.abilityArray = [new Stab(), new Slash()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new Flurry());
        }
    }
}
export class Handaxe {
    constructor(){
        this.name = "handaxe";
        this.type = "one hand";
        this.imageSrc = "./media/icons/handaxe.png";
        this.description = `A battered handaxe. After the fall of Altus kingdom, many common tools were repurposed as weapons much like this well worn axe. "An axe is a simple lever. The harder you pull the lever, the quicker your work becomes." - Commander Mentoras.`;
        this.level = 1; 
        this.price = 200;
        this.bluntAttack = 3;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 2;
        this.evasion = 0;
        this.abilityArray = [new Strike(), new Slash()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 3;
            this.pierceAttack = this.pierceAttack + 1;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new GuardBreak());
        }
    }
}
export class Longsword {
    constructor(){
        this.name = "longsword";
        this.type = "one hand";
        this.imageSrc = "./media/icons/longsword.png";
        this.description = `A standard longsword. Standard issue longsword of the Altus guard. "A longsword for you too huh? Well, can't say I blame you" - Commander Mentoras.`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 3;
        this.pierceAttack = 4;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Stab(), new Slash()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 2;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new Flurry());
        }
    }
}
export class WarHammer {
    constructor(){
        this.name = "warhammer";
        this.type = "two hand";
        this.imageSrc = "./media/icons/warhammer.png";
        this.description = `A heavy warhammer. This warhammer appears to have once belonged to a captain of the altus guard. "It's not elegant, but sometimes problems require non-elegant solutions" - Commander Mentoras.`;
        this.level = 1;
        this.price = 400;
        this.bluntAttack = 6;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = -1;
        this.evasion = -1;
        this.abilityArray = [new Strike(), new GuardBreak()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 5;
            this.pierceAttack = this.pierceAttack + 2;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new WildSwing());
        }
    }
}
export class Shortbow {
    constructor(){
        this.name = "shortbow";
        this.type = "two hand";
        this.imageSrc = "./media/icons/shortbow.png";
        this.description = `A wooden shortbow. A standard issue shortbow among scouts and archers of the Altus kingdom. "Shortbows are good at evening the odds in unfair fights. They are particualily popular among those bad at playing the violin." - Commander Mentoras.`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 5;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 2;
        this.evasion = 1;
        this.abilityArray = [new ShootArrow(), new TripleShot()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 1;
        }
        if(this.level == 3){
            this.abilityArray.push(new ShootPoisonArrow());
        }
    }
}
export class Shiv {
    constructor(){
        this.name = "shiv";
        this.type = "one hand";
        this.imageSrc = "./media/icons/dagger.png";
        this.description = `A crude shiv. Weapons like these were often concealed prisioners enroute to Altus prisions. Ironically, prisoners were bound with chains preventing movement of any kind and many died with the shivs still in their garmets.`;
        this.level = 1;
        this.price = 50;
        this.bluntAttack = 1;
        this.pierceAttack = 1;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 1;
        this.evasion = 0;
        this.abilityArray = [new Stab];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 2;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new ThrowKnife());
        }
        if(this.level == 5){
            this.abilityArray.push(new ThrowPoisonedKnife());
        }
    }
}
export class Buckler {
    constructor(){
        this.name = "buckler";
        this.type = "one hand";
        this.imageSrc = "./media/icons/round-shield.png";
        this.description = `A wooden buckler. A buckler fashioned from hard wood. A blue and green symbol of unknown origin is painted on its front`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 2;
        this.elementalDefense = 2;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Block()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 3;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class FireStaff {
    constructor(){
        this.name = "fire staff";
        this.type = "one hand";
        this.imageSrc = "./media/icons/staff.png";
        this.description = `A wooden staff imbued with fire. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 3;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Fireball(), new Immolate(), new Strike(), new Meditate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 3;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new MeteorShower());
        }
    }
}
export class LightningStaff {
    constructor(){
        this.name = "lightning staff";
        this.type = "one hand";
        this.imageSrc = "./media/icons/staff.png";
        this.description = `A wooden staff imbued with lightning. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 3;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new LightningBolt(), new Shockwave(), new Strike(), new Meditate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 3;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class IceStaff {
    constructor(){
        this.name = "ice staff";
        this.type = "one hand";
        this.imageSrc = "./media/icons/staff.png";
        this.description = `A wooden staff imbued with ice. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 1;
        this.elementalAttack = 3;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new IceShard(), new IceBarrier(), new Strike(), new Meditate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 1;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 3;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class ArcaneStaff {
    constructor(){
        this.name = "arcane staff";
        this.type = "one hand";
        this.imageSrc = "./media/icons/staff.png";
        this.description = `A wooden staff imbued with arcane. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 3;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new ArcaneDart(), new ArcaneBlast(), new Strike(), new Meditate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
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
        }
        if(this.level == 3){
            this.abilityArray.push(new ArcaneSalvo());
        }
    }
}
export class LightStaff {
    constructor(){
        this.name = "light staff";
        this.type = "one hand";
        this.imageSrc = "./media/icons/staff.png";
        this.description = `A wooden staff imbued with light. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 3;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new LightBeam(), new Cleanse(), new Strike(), new Meditate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
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
        }
        if(this.level == 3){
            this.abilityArray.push(new Bless());
        }
    }
}
export class DarkStaff {
    constructor(){
        this.name = "dark staff";
        this.type = "one hand";
        this.imageSrc = "./media/icons/staff.png";
        this.description = `A wooden staff imbued with darkness. Magic is a relatively new concept to the citizens of the Altus kingdom since the discovery of the artifact, however some speculate it is as old as time`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 1;
        this.pierceAttack = 0;
        this.arcaneAttack = 3;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new DrainLife(), new Siphon(), new Strike(), new Meditate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
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
        }
        if(this.level == 3){
            this.abilityArray.push(new SummonSkeleton());
        }
    }
}
export class ForestStaff {
    constructor(){
        this.name = "forest staff";
        this.type = "one hand";
        this.imageSrc = "./media/icons/staff.png";
        this.description = `A carved walking staff made from the branch of a tree. The discovery of the artifact released the potential ordinary things like this former tree branch`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 2;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 2;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 0;
        this.elementalDefense = 1;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new VineLash(), new ThrowThistles(), new Strike(), new Meditate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 2;
            this.pierceAttack = this.pierceAttack + 2;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 2;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new VortexSheild());
        }
    }
}
export class LeatherHelmet {
    constructor(){
        this.name = "leather helmet";
        this.type = "head";
        this.imageSrc = "./media/icons/light-helm.png";
        this.description = `a leather helmet. A standard issue helmet among scouts and archers of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 1;
        }
    }
}
export class LeatherHood {
    constructor(){
        this.name = "leather hood";
        this.type = "head";
        this.imageSrc = "./media/icons/hood.png";
        this.description = `A hood that obscures the face made of dark leather. Although most indulged in the discovery of magic, there were a few that found it ominous.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 1;
        this.elementalDefense = 3;
        this.speed = 1;
        this.evasion = 2;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
    }
}
export class LeatherGloves {
    constructor(){
        this.name = "leather gloves";
        this.type = "arms";
        this.imageSrc = "./media/icons/gloves.png";
        this.description = `leather gloves. A common article of clothing among worker of the Altus kingdom. With the discovery of magic, many in the altus kingdom lost appreciation for common safety practices like hand protection`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
    }
}
export class LeatherChestplate {
    constructor(){
        this.name = "leather chestplate";
        this.type = "torso";
        this.imageSrc = "./media/icons/leather-armor.png";
        this.description = `a leather chestplate. A standard issue chestplate among scouts and archers of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
    }
}
export class LeatherGreaves {
    constructor(){
        this.name = "leather greaves";
        this.type = "legs";
        this.imageSrc = "./media/icons/armored-pants.png";
        this.description = `leather greaves. Standard issue greaves among scouts and archers of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
    }
}
export class LeatherBoots {
    constructor(){
        this.name = "leather boots";
        this.type = "feet";
        this.imageSrc = "./media/icons/boots.png";
        this.description = `reliable leather boots. After discovery of magic, travelers from all over came to Altus kingdom. Few ever left.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 1;
        this.elementalDefense = 2;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
    }
}
export class KiteShield {
    constructor(){
        this.name = "kite shield";
        this.type = "one hand";
        this.imageSrc = "./media/icons/shield.png";
        this.description = `a kite shield with engraved with the Altus Sigil. "The best defense is a good offense. So if you find yourself in a corner, bash em with your shield." - Commander Mentoras.`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -5;
        this.evasion = -2;
        this.abilityArray = [new Block(), new ShieldBash()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class IronHelmet {
    constructor(){
        this.name = "iron helmet";
        this.type = "head";
        this.imageSrc = "./media/icons/iron-helm.png";
        this.description = `a heavy iron helmet. A standard issue helmet among soldiers and guards of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.evasion = -1;
        this.abilityArray = [];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class IronGauntlets {
    constructor(){
        this.name = "iron gauntlets";
        this.type = "arms";
        this.imageSrc = "./media/icons/gauntlet.png";
        this.description = `heavy iron gauntlets. standard issue gauntlets among soldiers and guards of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.evasion = -1;
        this.abilityArray = [];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class IronChainmail {
    constructor(){
        this.name = "iron chainmail";
        this.type = "torso";
        this.imageSrc = "./media/icons/chain-mail.png";
        this.description = `heavy iron chainmail. standard issue chainmail among soldiers and guards of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.evasion = -1;
        this.abilityArray = [];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class IronGreaves {
    constructor(){
        this.name = "iron greaves";
        this.type = "legs";
        this.imageSrc = "./media/icons/armored-pants.png";
        this.description = `heavy iron greaves. standard issue greaves among soldiers and guards of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.evasion = -1;
        this.abilityArray = [];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class IronBoots {
    constructor(){
        this.name = "iron boots";
        this.type = "feet";
        this.imageSrc = "./media/icons/leg-armor.png";
        this.description = `heavy iron greaves. standard issue greaves among soldiers and guards of the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 4;
        this.pierceDefense = 4;
        this.arcaneDefense = 1;
        this.elementalDefense = 1;
        this.speed = -1;
        this.evasion = -1;
        this.abilityArray = [];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class ClothHood {
    constructor(){
        this.name = "cloth hood";
        this.type = "head";
        this.imageSrc = "./media/icons/cowled.png";
        this.description = `a thick cloth hood. Garmets like this were common among the many seeking to gain quick riches from the discovery of magic in the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 2;
        this.elementalDefense = 2;
        this.speed = - 1;
        this.evasion = 1;
        this.abilityArray = [new Channel()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class ClothRobe {
    constructor(){
        this.name = "cloth robe";
        this.type = "torso";
        this.imageSrc = "./media/icons/robe.png";
        this.description = `a thick cloth robe. Garmets like this were common among the many seeking to gain quick riches from the discovery of magic in the Altus kingdom.`;
        this.level = 1;
        this.price = 100;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 1;
        this.arcaneDefense = 4;
        this.elementalDefense = 4;
        this.speed = -1;
        this.evasion = 1;
        this.abilityArray = [new Channel()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 1;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
    }
}
export class CrystalBall {
    constructor(){
        this.name = "crystal ball";
        this.type = "one hand";
        this.imageSrc = "./media/icons/magic-ball.png";
        this.description = `a magical crystal ball. While some see magic as pure power, others see it as a science. Still, the fundental law of magic is that all energy must come from somewhere.`;
        this.level = 1;
        this.price = 200;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 2;
        this.elementalAttack = 2;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 2;
        this.elementalDefense = 2;
        this.speed = -2;
        this.evasion = 2;
        this.abilityArray = [new Empower, new Channel];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 1;
            this.elementalAttack = this.elementalAttack + 1;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 1;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
    }
}
export class NightbladeSword {
    constructor(){
        this.name = "nightblade sword";
        this.type = "one hand";
        this.imageSrc = "./media/icons/longsword.png";
        this.description = `a gleaming silver longsword. Legend speaks of elite warriors called Nightblades whose shadows were able to materialize into physical form. Much like this blade, they rarely made a sound.`;
        this.level = 1;
        this.price = 300;
        this.bluntAttack = 2;
        this.pierceAttack = 6;
        this.arcaneAttack = 2;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new ArcaneDart, new Slash, new BlinkStrike];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 2;
            this.pierceAttack = this.pierceAttack + 3;
            this.arcaneAttack = this.arcaneAttack + 2;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 0;
            this.pierceDefense = this.pierceDefense + 0;
            this.arcaneDefense = this.arcaneDefense + 0;
            this.elementalDefense = this.elementalDefense + 0;
            this.speed = this.speed + 1;
            this.evasion = this.evasion + 1;
        }
        if(this.level == 3){
            this.abilityArray.push(new CastShadow());
        }
        if(this.level == 5){
            this.abilityArray.push(new ArcaneSalvo());
        }
    }
}
export class NightbladeHelm {
    constructor(){
        this.name = "nightblade helm";
        this.type = "head";
        this.imageSrc = "./media/icons/closed-barbute.png";
        this.description = `a dark helm with a silver emblem. Legend speaks of elite warriors called Nightblades whose shadows were able to materialize into physical form. Such legends were thought to be a myth, this helm would say otherwise.`;
        this.level = 1;
        this.price = 150;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 2;
        this.pierceDefense = 2;
        this.arcaneDefense = 2;
        this.elementalDefense = 1;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
        if(this.level == 3){
            this.abilityArray.push(new CastShadow());
        }
    }
}
export class NightbladeChestplate {
    constructor(){
        this.name = "nightblade chestplate";
        this.type = "torso";
        this.imageSrc = "./media/icons/scale-mail.png";
        this.description = `dark scaled armor with a silver emblem. Legend speaks of elite warriors called Nightblades whose shadows were able to materialize into physical form. Such legends were thought to be a myth, this chestplate would say otherwise.`;
        this.level = 1;
        this.price = 150;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 3;
        this.pierceDefense = 3;
        this.arcaneDefense = 2;
        this.elementalDefense = 1;
        this.speed = 1;
        this.evasion = 1;
        this.abilityArray = [new Recuperate()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 2;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 2;
            this.elementalDefense = this.elementalDefense + 1;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 1;
        }
        if(this.level == 3){
            this.abilityArray.push(new CastShadow());
        }
    }
}
export class RoyalAltusRobes {
    constructor(){
        this.name = "royal altus robes";
        this.type = "torso";
        this.imageSrc = "./media/icons/heavy-collar.png";
        this.description = `Royal robes belonging to a high ranking official of the altus kingdom. Although most believe the Altus emperor went mad, some speculate that another took his place shortly after the fall of the Altus kingdom.`;this.level = 1;
        this.price = 150;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 3;
        this.arcaneDefense = 4;
        this.elementalDefense = 2;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Channel()];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 3;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new Empower());
        }
    }
}
export class RoyalAltusPants {
    constructor(){
        this.name = "royal altus pants";
        this.type = "head";
        this.imageSrc = "./media/icons/trousers.png";
        this.description = `Royal pants belonging to a high ranking official of the altus kingdom. Although most believe the Altus emperor went mad, some speculate that another took his place shortly after the fall of the Altus kingdom.`;
        this.level = 1;
        this.price = 150;
        this.bluntAttack = 0;
        this.pierceAttack = 0;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 1;
        this.pierceDefense = 3;
        this.arcaneDefense = 4;
        this.elementalDefense = 2;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Channel];
    }
    upgrade(levels){
        for(let i = 0; i < levels; i++){
            this.level = this.level + 1;
            this.price = Math.floor(this.price * 1.5);
            this.bluntAttack = this.bluntAttack + 0;
            this.pierceAttack = this.pierceAttack + 0;
            this.arcaneAttack = this.arcaneAttack + 0;
            this.elementalAttack = this.elementalAttack + 0;
            this.bluntDefense = this.bluntDefense + 1;
            this.pierceDefense = this.pierceDefense + 2;
            this.arcaneDefense = this.arcaneDefense + 3;
            this.elementalDefense = this.elementalDefense + 2;
            this.speed = this.speed + 0;
            this.evasion = this.evasion + 0;
        }
        if(this.level == 3){
            this.abilityArray.push(new CastShadow());
        }
    }
}
export class TigerClaw {
    constructor(){
        this.name = "tiger claw";
        this.type = "bound";
        this.imageSrc = "";
        this.description = ``;
        this.level = 1;
        this.price = 0;
        this.bluntAttack = 1;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Slash, new Roar, new Pounce];
    }
}
export class HawkTalons {
    constructor(){
        this.name = "hawk talons";
        this.type = "bound";
        this.imageSrc = "";
        this.description = ``;
        this.level = 1;
        this.price = 0;
        this.bluntAttack = 0;
        this.pierceAttack = 3;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Slash];
    }
}
export class DogPaw {
    constructor(){
        this.name = "dog paw ";
        this.type = "bound";
        this.imageSrc = "";
        this.description = ``;
        this.level = 1;
        this.price = 0;
        this.bluntAttack = 1;
        this.pierceAttack = 2;
        this.arcaneAttack = 0;
        this.elementalAttack = 0;
        this.bluntDefense = 0;
        this.pierceDefense = 0;
        this.arcaneDefense = 0;
        this.elementalDefense = 0;
        this.speed = 0;
        this.evasion = 0;
        this.abilityArray = [new Bite, new Pounce];
    }
}
export class HealthPotion {
    constructor(){
        this.name = "healing potion";
        this.type = "consumable";
        this.imageSrc = "./media/icons/standing-potion.png";
        this.description = `a magical brew designed to restore health.`;
        this.price = 20;
        this.abilityArray = [new DrinkHealthPotion()];
    }
}

export class StaminaPotion {
    constructor(){
        this.name = "stamina potion";
        this.type = "consumable";
        this.imageSrc = "./media/icons/standing-potion.png";
        this.description = `a magical brew designed to restore stamina.`;
        this.price = 20;
        this.abilityArray = [new DrinkStaminaPotion()];
    }
}

export class MagicPotion {
    constructor(){
        this.name = "magic potion";
        this.type = "consumable";
        this.imageSrc = "./media/icons/standing-potion.png";
        this.description = `a magical brew designed to restore magic.`;
        this.price = 20;
        this.abilityArray = [new DrinkMagicPotion()];
    }
}

export class ThrowingKnife {
    constructor(){
        this.name = "throwing knife";
        this.type = "consumable";
        this.imageSrc = "./media/icons/thrown-daggers.png";
        this.description = `a small knife that can be thrown during combat.`;
        this.level = 1;
        this.price = 20;
        this.abilityArray = [new ThrowKnife()];
    }
}
export class PoisonedKnife {
    constructor(){  
        this.name = "poisoned knife";
        this.type = "consumable";
        this.imageSrc = "./media/icons/thrown-daggers.png";
        this.description = `a small knife laced in poison that can be thrown during combat.`;
        this.level = 1;
        this.price = 50;
        this.abilityArray = [new ThrowPoisonedKnife()];
    }
}
export class Meteorite {
    constructor(){
        this.name = "meteorite";
        this.type = "consumable";
        this.imageSrc = "./media/icons/asteroid.png";
        this.description = `a meteroite emiting magicaly energy. Some say the artifact discovered by the Altus kingdom is from the heavans, much like this meteorite.`;
        this.level = 1;
        this.price = 150;
        this.abilityArray = [new SmashMeteorite()];
    }
}
export class Antidote {
    constructor(){
        this.name = "antidote";
        this.type = "consumable";
        this.imageSrc = "./media/icons/corked-tube.png";
        this.description = `an antidote used to treat most poisons.`;
        this.level = 1;
        this.price = 30;
        this.abilityArray = [new UseAntidote()];
    }
}
export class AloeRemedy {
    constructor(){
        this.name = "aloe remedy";
        this.type = "consumable";
        this.imageSrc = "./media/icons/curled-leaf.png";
        this.description = `a remedy used to treat burns.`;
        this.level = 1;
        this.price = 30;
        this.abilityArray = [new UseAloeRemedy()];
    }
}
export class Bandage {
    constructor(){
        this.name = "bandage";
        this.type = "consumable";
        this.imageSrc = "./media/icons/bandage-roll.png";
        this.description = `a bandage used to treat bleeding.`;
        this.level = 1;
        this.price = 30;
        this.abilityArray = [new UseBandage()];
    }
}
export class FrostbiteTonic {
    constructor(){
        this.name = "frostbite tonic";
        this.type = "consumable";
        this.imageSrc = "./media/icons/round-bottom-flask.png";
        this.description = `a tonic used to treat frostbite. Although the power of the artifact drove many mad, a select few used its power for good resulting in major breakthroughs in medicine.`;
        this.level = 1;
        this.price = 30;
        this.abilityArray = [new UseFrostbiteTonic()];
    }
}
export class ParalysisTonic {
    constructor(){
        this.name = "paralysis tonic";
        this.type = "consumable";
        this.imageSrc = "./media/icons/round-bottom-flask.png";
        this.description = `a tonic used to treat paralysis. Although the power of the artifact drove many mad, a select few used its power for good resulting in major breakthroughs in medicine.`;
        this.level = 1;
        this.price = 30;
        this.abilityArray = [new UseParalysisTonic()];
    }
}
export class Net {
    constructor(){
        this.name = "net";
        this.type = "consumable";
        this.imageSrc = "./media/icons/net.png";
        this.description = `a net used to trap animals or foes.`;
        this.level = 1;
        this.price = 50;
        this.abilityArray = [new ThrowNet()];
    }
}
export class SmokeBomb {
    constructor(){
        this.name = "smoke bomb";
        this.type = "consumable";
        this.imageSrc = "./media/icons/smoke-bomb.png";
        this.description = `a smokebomb for hasty escapes or dramatic entrances.`;
        this.level = 1;
        this.price = 50;
        this.abilityArray = [new ThrowSmokebomb()];
    }
}
export class Hide {
    constructor(){
        this.name = "hide";
        this.type = "material";
        this.imageSrc = "./media/icons/animal-hide.png";
        this.description = `a valuable animal hide.`;
        this.level = "N/A";
        this.price = 200;
        this.abilityArray = [];
    }
}
export class PineWood {
    constructor(){
        this.name = "pine Wood";
        this.type = "material";
        this.imageSrc = "./media/icons/wood-beam.png";
        this.description = `a pine wood board.`;
        this.level = "N/A";
        this.price = 100;
        this.abilityArray = [];
    }
}