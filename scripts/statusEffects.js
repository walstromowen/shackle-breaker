import {Struggle} from "./abilities.js";
import {controller as theController} from "./main.js"

class StatusEffect{
    update(type){ 
        if(type == "start"){ 
            this.onStartTurn();
        }else{
            this.onEndTurn();
        }
    }
    
    onStartTurn(){
        //theController.printToGameConsole(`${this.name} skipped on ${this.holder.name}`);
    }
    onEndTurn(){
        //theController.printToGameConsole(`${this.name} skipped on ${this.holder.name}`);
    }
    onRemove(){
        
    }
    onRecieveDamage(){

    }
    onDeliverDamage(){
        
    }
    onApplied(){

    }
    checkDamage(damage, target){
        if(damage < 0){
            return 0;
        }
        if(target.currentHP - damage< 0){
            theController.animateVitalBar(target, "health");
            return target.currentHP;
        }
        else{
            theController.animateVitalBar(target, "health");
            return damage;
        }
    }
}
export class Shielded extends StatusEffect{
    constructor(holder){
        super();
        this.type = "buff";
        this.isCleansable = false;
        this.name = "shielded";
        this.iconSrc = "./media/icons/shielded.png";
        this.holder = holder;
        this.maxCharges = 1;
        this.currentCharges = this.maxCharges;
    }
    onApplied(){
        this.holder.currentBluntDefense = this.holder.currentBluntDefense + Math.floor(this.holder.baseBluntDefense*0.75);
        this.holder.currentPierceDefense = this.holder.currentPierceDefense + Math.floor(this.holder.basePierceDefense*0.75);
        this.holder.currentArcaneDefense = this.holder.currentArcaneDefense + Math.floor(this.holder.baseArcaneDefense*0.75);
        this.holder.currentElementalDefense = this.holder.currentElementalDefense + Math.floor(this.holder.baseElementalDefense*0.75);
    }
    onRecieveDamage(){
        this.currentCharges = 0;
    }
    onDeliverDamage(){
        this.currentCharges = 0;
    }
    onRemove(){
        this.holder.currentBluntDefense = this.holder.currentBluntDefense - Math.floor(this.holder.baseBluntDefense*0.75);
        this.holder.currentPierceDefense = this.holder.currentPierceDefense - Math.floor(this.holder.basePierceDefense*0.75);
        this.holder.currentArcaneDefense = this.holder.currentArcaneDefense - Math.floor(this.holder.baseArcaneDefense*0.75);
        this.holder.currentElementalDefense = this.holder.currentElementalDefense - Math.floor(this.holder.baseElementalDefense*0.75);
    }
}
export class Bound extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = true;
        this.name = "bound";
        this.iconSrc = "./media/icons/crossed-chains.png";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
    }
    onStartTurn(){
        if(this.holder.nextMove.name != "cleanse" && this.holder.nextMove.name != 'switch combatant'){
            this.holder.nextMove = new Struggle;
            if(Math.random()*3 > 2){
                this.currentCharges = this.currentCharges - 1;
            }else{
                this.currentCharges = this.currentCharges = 0;
            }
        }
    }
    onEndTurn(){
        if(this.currentCharges > 0){
            theController.printToGameConsole(`${this.holder.name} struggles to break free!`);
        }
    }
}


export class Poisoned extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = true;
        this.name = "poisoned";
        this.iconSrc = "./media/icons/poison.png";
        this.holder = holder;
        this.maxCharges = 8;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.08;
    }
    onEndTurn(){
        let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
        damageOutput = this.checkDamage(damageOutput, this.holder);
        this.serverityMultiplier = this.serverityMultiplier + 0.01;
        this.holder.currentHP = this.holder.currentHP - damageOutput;
        theController.printToGameConsole(`${this.holder.name} suffers ${damageOutput} poison damage!`);
        this.currentCharges = this.currentCharges - 1;
    }
}

export class Burned extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = true;
        this.name = "burned";
        this.iconSrc = "./media/icons/flame.png";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.15;
    }
    onEndTurn(){
        let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
        damageOutput = this.checkDamage(damageOutput, this.holder);
        if(damageOutput == 0){
            damageOutput = 1;
        }
        this.serverityMultiplier = this.serverityMultiplier - 0.01;
        this.holder.currentHP = this.holder.currentHP - damageOutput;
        theController.printToGameConsole(`${this.holder.name} suffers ${damageOutput} burn damage!`);
        this.currentCharges = this.currentCharges - 1;
    }
}
export class Empowered extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = false;
        this.name = "empowered";
        this.iconSrc = "./media/icons/crystal-ball.png";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        theController.printToGameConsole(`${this.holder.name} is empowered!`);
        this.currentCharges = this.currentCharges - 1;
    }
    onApplied(){
        this.holder.currentArcaneAttack = this.holder.currentArcaneAttack + 10;
        this.holder.currentElementalAttack = this.holder.currentElementalAttack + 10;
    }
    onRemove(){
        this.holder.currentArcaneAttack = this.holder.currentArcaneAttack - 10;
        this.holder.currentElementalAttack = this.holder.currentElementalAttack - 10;
    }
}
export class Paralyzed extends StatusEffect{
    constructor(holder){
        super();
        this.type = "start";
        this.isCleansable = true;
        this.name = "paralyzed";
        this.iconSrc = "./media/icons/electric.png";
        this.holder = holder;
        this.maxCharges = 2;
        this.currentCharges = this.maxCharges;
    }
    onStartTurn(){
        theController.printToGameConsole(`${this.holder.name} is paralyzed!`);
        if(this.holder.nextMove.name != "cleanse" && this.holder.nextMove.name != "use paralysis tonic" && this.holder.nextMove.name != 'switch combatant'){
            this.holder.nextMove = new Struggle;
            this.currentCharges = this.currentCharges - 1;
        }
    }
}
export class Channeled extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = false;
        this.name = "channeled";
        this.iconSrc = "./media/icons/up-card-blue.png";
        this.holder = holder;
        this.maxCharges = 6;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){;
        let restoreAmount = Math.floor(this.holder.maxMagic * 0.1);
        if(this.holder.currentMagic + restoreAmount >= this.holder.maxMagic){
            restoreAmount = this.holder.maxMagic - this.holder.currentMagic 
        }
        this.holder.currentMagic = this.holder.currentMagic + restoreAmount;
        this.currentCharges = this.currentCharges - 1;
        theController.printToGameConsole(`${this.holder.name} channels ${restoreAmount} magic!`);
    }
}
export class Invigorated extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = false;
        this.name = "invigorated";
        this.iconSrc = "./media/icons/up-card-green.png";
        this.holder = holder;
        this.maxCharges = 6;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        let restoreAmount = Math.floor(this.holder.maxStamina * 0.1);
        if(this.holder.currentStamina + restoreAmount >= this.holder.maxMagic){
            restoreAmount = this.holder.maxStamina - this.holder.currentStamina 
        }
        this.holder.currentStamina = this.holder.currentStamina + restoreAmount;
        this.currentCharges = this.currentCharges - 1;
        theController.printToGameConsole(`${this.holder.name} regains ${restoreAmount} stamina!`);
    }
}
export class Frostbite extends StatusEffect{
    constructor(holder){
        super();
        this.type = "start";
        this.isCleansable = true;
        this.name = "frostbite";
        this.iconSrc = "./media/icons/frozen-block.png";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.05;
    }
    onStartTurn(){
        if(this.holder.nextMove.name != "cleanse" && this.holder.nextMove.name != "use frostbite tonic" && this.holder.nextMove.name != 'switch combatant'){
            if(Math.random()*2 < 1){
                theController.printToGameConsole(`${this.holder.name} is frozen!`);
                this.holder.nextMove = new Struggle();
            }else{
                let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
                damageOutput = this.checkDamage(damageOutput, this.holder);
                if(damageOutput == 0){
                    damageOutput = 1;
                }
                this.holder.currentHP = this.holder.currentHP - damageOutput;
                theController.printToGameConsole(`${this.holder.name} suffers ${damageOutput} frostbite damage!`);
            }
            this.currentCharges = this.currentCharges - 1;
        }else{
            theController.printToGameConsole(`${this.holder.name} suffers from frostbite!`);
        }
    }
}
export class Hidden extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = false;
        this.name = "hidden";
        this.iconSrc = "./media/icons/hidden.png";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        theController.printToGameConsole(`${this.holder.name} is hidden!`);
        this.currentCharges = this.currentCharges - 1;
    }
    onRemove(){
        if(this.holder === theController.party[0]){
            theController.toggleElementClass("current-character-image", "black-and-white");
        }else{
            theController.toggleElementClass("enemy-image", "black-and-white");
        }
        this.holder.currentEvasion = this.holder.currentEvasion - 100;
    }
    onApplied(){
        if(this.holder === theController.party[0]){
            theController.toggleElementClass("current-character-image", "black-and-white");
        }else{
            theController.toggleElementClass("enemy-image", "black-and-white");
        }
        this.holder.currentEvasion = this.holder.currentEvasion + 100;
    }
    onDeliverDamage(){
        this.currentCharges = 0;
    }
    onRecieveDamage(){
        this.currentCharges = 0;
    }
}
export class Bleeding extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = true;
        this.name = "bleeding";
        this.iconSrc = "./media/icons/ragged-wound.png";
        this.holder = holder;
        this.maxCharges = 5;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.06;
    }
    onEndTurn(){
        let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
        this.serverityMultiplier = this.serverityMultiplier + 0.04;
        if(this.holder.currentStamina <= 0){
            damageOutput = this.checkDamage(damageOutput, this.holder);
            this.holder.currentHP = this.holder.currentHP - damageOutput;
            theController.printToGameConsole(`${this.holder.name} bleeds for ${damageOutput} damage!`);
        }else{
            if(this.holder.currentStamina - damageOutput < 0){
                damageOutput = this.holder.currentStamina
            }
            theController.animateVitalBar(this.holder, "stamina");
            this.holder.currentStamina = this.holder.currentStamina - damageOutput;
            theController.printToGameConsole(`${this.holder.name} bleeds for ${damageOutput} stamina damage!`);
        }
        this.currentCharges = this.currentCharges - 1;
    }
}
export class Blessed extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.isCleansable = true;
        this.name = "blessed";
        this.iconSrc = "./media/icons/heart-plus.png";
        this.holder = holder;
        this.maxCharges = 5;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        let restoreAmount = Math.floor(this.holder.maxHP * 0.08);
        if(this.holder.currentHP + restoreAmount >= this.holder.maxHP){
            restoreAmount = this.holder.maxHP - this.holder.currentHP 
        }
        this.holder.currentHP = this.holder.currentHP + restoreAmount;
        this.currentCharges = this.currentCharges - 1;
        theController.printToGameConsole(`${this.holder.name} regains ${restoreAmount} health points!`);
    }
}