import {controller as theController} from "./main.js";
import {Slash, Bite, Pounce, LeechLife, ArcaneDart, ArcaneBlast, ChannelMagic} from "./enemyAbilities.js"
import {Dagger, Spear, IronSheild, IronHelmet, IronChainmail, IronGuantlets, IronGreaves, IronBoots, HealingPotion, ThrowingKnife} from "./item.js";

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
    boundStats(){
        if(this.currentHP > this.maxHP)this.currentHP = this.maxHP;
        if(this.currentStamina > this.maxStamina)this.currentStamina = this.maxStamina;
        if(this.currentMagic > this.maxMagic)this.currentMagic = this.maxMagic;
        if(this.currentHP < 0)this.currentHP = 0;
        if(this.currentStamina < 0)this.currentStamina = 0;
        if(this.currentMagic < 0)this.currentMagic = 0;
    }
    chooseAttack(target){
        let ability = this.abilityArray[Math.floor(Math.random()*this.abilityArray.length)];
        switch(ability.type){
            case "attack":
                ability.activate(this, target);
                break;
        }
        this.endTurn();
    }
    dropLoot(){
        if(Math.floor(Math.random()*this.lootChanceMultiplier < 1)){
            return this.lootArray[Math.floor(Math.random()*this.lootArray.length)];
        }else{
            return "";
        }
    }
    recover(){
        if(this.currentStamina == this.maxStamina){
            theController.gameConsole.innerHTML += `<p>Cannot recover more stamina!</p>`;
            return;
        }
        this.currentStamina = this.currentStamina + Math.floor(this.maxStamina * 0.2);
        if(this.currentStamina > this.maxStamina){
            this.currentStamina = this.maxStamina;
        }
        theController.gameConsole.innerHTML += `<p>the ${this.name} recovers stamina.</p>`;
        this.endTurn();
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
        this.currentArmor = this.baseArmor;
        this.baseAttack = 3 + playerLevel;
        this.currentAttack = this.baseAttack;
        this.abilityArray = [new Slash()];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new ThrowingKnife];
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
        this.currentArmor = 0;
        this.baseAttack = 4 + playerLevel;
        this.currentAttack = this.baseAttack;
        this.abilityArray = [new Bite(), new LeechLife()];
        this.lootChanceMultiplier = 2; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealingPotion];
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
        this.currentArmor = 0;
        this.baseAttack = 3 + playerLevel*2;
        this.currentAttack = this.baseAttack;
        this.abilityArray = [new Bite(), new Pounce()];
        this.lootChanceMultiplier = 3; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new HealingPotion, new ThrowingKnife];
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
        this.currentArmor = 1;
        this.baseAttack = 1 + playerLevel;
        this.currentAttack = this.baseAttack;
        this.abilityArray = [new ArcaneDart(), new ArcaneBlast()];
        this.lootChanceMultiplier = 0; //lower numbers = more likely to drop loot, 0 is certain to drop loot
        this.lootArray = [new IronHelmet, new IronChainmail, new IronGuantlets, new IronGreaves, new IronBoots, new IronSheild];
    }
}