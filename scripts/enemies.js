import {controller as theController} from "./main.js";

class Enemy{
   
}

export class Skeleton extends Enemy{
    constructor(){
        super();
        this.name = "skeleton";
        this.imageSrc = "media/skeleton.jpg"
        this.maxHP = 10; 
        this.currentHP = this.maxHP;
        this.maxStamina = 12;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 2;
        this.currentMagic = this.maxMagic;
        this.armorLevel = 1;
        this.baseAttack = 3;
    }
    chooseAttack(target){
        if(this.baseAttack - target.armorLevel > 0){
            target.currentHP = target.currentHP - this.baseAttack + target.armorLevel;
            theController.gameConsole.innerHTML += `<p> The ${this.name} attacks for ${this.baseAttack - target.armorLevel} damage!</p>`;
        }
        console.log("Player HP: " + target.currentHP);
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.2);
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
            theController.endBattle();
        }
    }
}

export class Bat extends Enemy{
    constructor(){
        super();
        this.name = "bat";
        this.imageSrc = "media/bat.jpg"
        this.maxHP = 3; 
        this.currentHP = this.maxHP;
        this.maxStamina = 10;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0;
        this.currentMagic = this.maxMagic;
        this.armorLevel = 0;
        this.baseAttack = 2;
    }
    chooseAttack(target){
        if(this.baseAttack - target.armorLevel > 0){
            target.currentHP = target.currentHP - this.baseAttack + target.armorLevel;
            theController.gameConsole.innerHTML += `<p> The ${this.name} attacks for ${this.baseAttack - target.armorLevel} damage!</p>`;
        }
        console.log("Player HP: " + target.currentHP);
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.2);
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
            theController.endBattle();
        }
    }
}

export class Wolf extends Enemy{
    constructor(){
        super();
        this.name = "wolf";
        this.imageSrc = "media/wolf.jpg"
        this.maxHP = 16;
        this.currentHP = this.maxHP;
        this.maxStamina = 12;
        this.currentStamina = this.maxStamina;
        this.maxMagic = 0;
        this.currentMagic = this.maxMagic;
        this.armorLevel = 0;
        this.baseAttack = 2;
    }
    chooseAttack(target){
        if(Math.floor(Math.random()*6) < 2){
            this.bite(target);
        }else{
            this.pounceOn(target);
        } 
    }
    bite(target){
        if(this.baseAttack - target.armorLevel > 0){
            target.currentHP = target.currentHP - this.baseAttack + target.armorLevel;
            theController.gameConsole.innerHTML += `<p> The ${this.name} bites for ${this.baseAttack - target.armorLevel} damage!</p>`;
        }
        console.log("Player HP: " + target.currentHP);
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.2);
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
            theController.endBattle();
        }
    }
    pounceOn(target){
        if(this.baseAttack + 2 - target.armorLevel > 0){
            target.currentHP = target.currentHP - (this.baseAttack + 2) + target.armorLevel;
            theController.gameConsole.innerHTML += `<p> The ${this.name} pounces for ${this.baseAttack + 2 - target.armorLevel} damage!</p>`;
        }
        console.log("Player HP: " + target.currentHP);
        this.currentStamina = this.currentStamina - Math.floor(this.maxStamina*0.4);
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
            theController.endBattle();
        }
    }
}