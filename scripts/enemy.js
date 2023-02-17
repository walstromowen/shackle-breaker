import {controller as theController} from "./main.js";

export default class Enemy{
    constructor(){
        this.name = ""
        this.currentHP = 4;
        this.maxHP = 10;
        this.currentStamina = 5;
        this.maxStamina = 12
        this.currentMagic = 5;
        this.maxMagic = 6;
        this.armorLevel = 1;
        this.baseAttack = 2;
    }
    attackPlayer(target){
        if(this.baseAttack - target.armorLevel > 0){
            target.currentHP = target.currentHP - this.baseAttack + target.armorLevel;
            theController.gameConsole.innerHTML += `<p> The ${this.name} attacks for ${this.baseAttack - target.armorLevel} damage!</p>`;
        }
        console.log("Player HP: " + target.currentHP);
        this.currentStamina = this.currentStamina - 2;
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
            theController.endBattle();
        }
    }
}