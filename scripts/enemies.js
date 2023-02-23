import {controller as theController} from "./main.js";
import {Dagger, Spear, IronHelmet, IronChainmail, IronGuantlets, IronGreaves, IronBoots} from "./item.js";

class Enemy{
    endTurn(){
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
                theController.endBattle();
        }
    }
}

export class Skeleton extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "skeleton";
        this.imageSrc = "media/skeleton.jpg"
        this.maxHP = 10 + playerLevel*2; 
        this.currentHP = this.maxHP;
        this.maxStamina = 10 + playerLevel*2;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 10 + playerLevel*2;
        this.currentMagic = this.maxMagic;
        this.baseArmor = 1;
        this.armorLevel = this.baseArmor;
        this.baseAttack = 3 + playerLevel;
    }
    chooseAttack(target){
        this.armorLevel = this.baseArmor;
        if(Math.floor(Math.random()*2) < 1){
            this.slash(target);
        }else{
            this.block();
        }
        this.endTurn();
    }
    slash(target){
        if(this.baseAttack - target.armorLevel > 0){
            target.currentHP = target.currentHP - this.baseAttack + target.armorLevel;
            theController.gameConsole.innerHTML += `<p> The ${this.name} slashes you for ${this.baseAttack - target.armorLevel} damage!</p>`;
        }else{
            theController.gameConsole.innerHTML += `<p>You deflect the ${this.name}'s attack!</p>`; 
        }
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.2);
    }
    block(){
        this.armorLevel = this.armorLevel + 5 ;
        theController.gameConsole.innerHTML += `<p> The ${this.name} raises its sheild!`;
    }
    dropLoot(){
        switch(Math.floor(Math.random()*2)){
            case 0: 
                return "";
            case 1:
                return ""; 
            default:
                return "";
        }
    }
}

export class Bat extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "bat";
        this.imageSrc = "media/bat.jpg"
        this.maxHP = 4 + playerLevel*2 ; 
        this.currentHP = this.maxHP;
        this.maxStamina = 10 + playerLevel*2;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0 + playerLevel*2;
        this.currentMagic = this.maxMagic;
        this.armorLevel = 0;
        this.baseAttack = 4 + playerLevel;
    }
    chooseAttack(target){
        if(Math.floor(Math.random()*3) < 2){
            this.bite(target);
        }else{
            this.fly();
        }
        this.endTurn();
    }
    bite(target){
        let damageOutput = this.baseAttack;
        damageOutput = damageOutput - target.armorLevel;
        if(damageOutput > 0){
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${this.name} bites you for ${damageOutput} damage!</p>`;
            if(Math.floor(Math.random()*2 < 1)){
                this.currentHP = this.currentHP + damageOutput;
                if(this.currentHP > this.maxHP){
                    this.currenHP = this.maxHP;
                }
            }
        }else{
            theController.gameConsole.innerHTML += `<p>You deflect the ${this.name}'s attack!</p>`; 
        }
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.2);
    }
    fly(){
        theController.gameConsole.innerHTML += `<p> The ${this.name} flies around</p>`;
        this.currentStamina = this.maxStamina;
    }
    dropLoot(){
        switch(Math.floor(Math.random()*2)){
            case 0: 
                return "";
            case 1:
                return "";
            default:
                return "";
        }
    }
}

export class Wolf extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "wolf";
        this.imageSrc = "media/wolf.jpg"
        this.maxHP = 8 + playerLevel*2;
        this.currentHP = this.maxHP;
        this.maxStamina = 12 + playerLevel*2;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0;
        this.currentMagic = this.maxMagic;
        this.armorLevel = 0;
        this.baseAttack = 3 + playerLevel*2;
    }
    chooseAttack(target){
        if(Math.floor(Math.random()*3) < 2){
            this.bite(target);
        }else{
            this.pounceOn(target);
        } 
        this.endTurn();
    }
    bite(target){
        let damageOutput = this.baseAttack;
        damageOutput = damageOutput - target.armorLevel;
        if(damageOutput > 0){
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${this.name} bites you for ${damageOutput} damage!</p>`;
        }else{
            theController.gameConsole.innerHTML += `<p>You deflect the ${this.name}'s attack!</p>`; 
        }
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.2);
    }
    pounceOn(target){
        let damageOutput = this.baseAttack + 2;
        damageOutput = damageOutput - target.armorLevel;
        if( damageOutput > 0){
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${this.name} pounces on you for ${ damageOutput} damage!</p>`;
        }else{
            theController.gameConsole.innerHTML += `<p>You deflect the ${this.name}'s attack!</p>`; 
        }
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.4);
    }
    dropLoot(){
        switch(Math.floor(Math.random()*2)){
            case 0: 
                return "";
            case 1:
                return "";
            default:
                return "";
        }
    }
}

export class Royalmage extends Enemy{
    constructor(playerLevel){
        super();
        this.name = "royal mage";
        this.imageSrc = "media/royal-mage.jpg"
        this.maxHP = 20 + playerLevel*4;
        this.currentHP = this.maxHP;
        this.maxStamina = 20 + playerLevel*2;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 20 + playerLevel*2;
        this.currentMagic = this.maxMagic;
        this.armorLevel = 1;
        this.baseAttack = 1 + playerLevel;
        this.currentAttack = this.baseAttack;
    }
    chooseAttack(target){
        if(Math.floor(Math.random()*2) < 1){
            this.arcaneDart(target);
        }else{
            this.arcaneBlast(target);
        } 
        this.endTurn();
    }
    arcaneDart(target){
        let damageOutput = this.currentAttack;
        damageOutput = damageOutput - target.armorLevel;
        if(damageOutput > 0){
            theController.gameConsole.innerHTML += `<p>The ${this.name} fires an arcane dart at you for ${damageOutput} damage!</p>`;
            target.currentHP = target.currentHP - damageOutput;
        }else{
            theController.gameConsole.innerHTML += `<p>You deflect the ${this.name}'s attack!</p>`; 
        }
        this.currentMagic = this.currentMagic - Math.floor(this.maxMagic*0.2);

    }
    arcaneBlast(target){
        if(Math.random()*4 < 3){
            this.currentAttack = this.currentAttack + 2;
            this.currentMagic = this.currentMagic + Math.floor(this.maxMagic*0.2);
            theController.gameConsole.innerHTML += `<p>The ${this.name} channels something in the air!</p>`;
        }else{
            let damageOutput = this.currentAttack * 2;
            damageOutput = damageOutput - target.armorLevel;
            if(damageOutput > 0){
                target.currentHP = target.currentHP - damageOutput;
                theController.gameConsole.innerHTML += `<p>The ${this.name} blasts you with a beam of arcane energy for ${damageOutput} damage!</p>`;
                this.currentMagic = this.currentMagic - Math.floor(this.maxMagic*0.5);
                this.currentAttack = this.baseAttack;
            }else{
                theController.gameConsole.innerHTML += `<p>You deflect the ${this.name}'s attack!</p>`; 
            }
        }
    }
    dropLoot(){
        switch(Math.floor(Math.random()*5)){
            case 0: 
                return new IronHelmet;
            case 1:
                return new IronChainmail;
            case 2:
                return new IronGuantlets;
            case 3:
                return new IronGreaves;
            case 4:
                return new IronBoots;
            default:
                return "";
        }
    }
}