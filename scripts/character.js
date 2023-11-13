import {Recover, Punch, Retreat} from "./abilities.js";
import {Poisoned, Burned, Frostbite, Paralyzed, Shielded, Channeled, Empowered, Bound} from "./statusEffects.js";

export default class Character{
    constructor(characterCreationArray){ //[name, apperanceSrc, origin, attributesArray, StatsArray, equippedArray]
        this.name = characterCreationArray[0];
        this.apperance = characterCreationArray[1]
        this.origin = characterCreationArray[2]
        this.equippedArray = [characterCreationArray[5][0], characterCreationArray[5][1], characterCreationArray[5][2], characterCreationArray[5][3], characterCreationArray[5][4], characterCreationArray[5][5] , characterCreationArray[5][6]]; 
        this.abilityArray = [new Punch, new Recover, new Retreat];
        this.level = 1;
        this.currentXP = 0;
        this.vigor = characterCreationArray[3][0];
        this.endurance = characterCreationArray[3][1];
        this.strength = characterCreationArray[3][2];
        this.dexterity = characterCreationArray[3][3];
        this.insight = characterCreationArray[3][4];
        this.focus = characterCreationArray[3][5];
        this.maxHP = characterCreationArray[4][0];
        this.currentHP = this.maxHP;
        this.maxStamina = characterCreationArray[4][1];
        this.currentStamina = this.maxStamina;
        this.maxMagic = characterCreationArray[4][2];
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = characterCreationArray[4][3];
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = characterCreationArray[4][4];
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = characterCreationArray[4][5];
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = characterCreationArray[4][6];
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = characterCreationArray[4][7];
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = characterCreationArray[4][8];
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = characterCreationArray[4][9];
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = characterCreationArray[4][10];
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 5;
        this.currentEvasion = this.baseEvasion;
        this.statusArray = [];//new Poisoned(this), new Burned(this), new Frostbite(this), new Paralyzed(this), new Shielded(this), new Energized(this), new Empowered(this), new Bound(this)
        this.nextMove = "";
    }
    autoLevelUp(level){
        this.level = level;
        for(let i = 1; i < level; i ++){
            switch(Math.floor(Math.random()*6)){
                case 0:
                    this.vigor = this.vigor + 1;
                    break;
                case 1:
                    this.endurance = this.endurance + 1;
                    break;
                case 2:
                    this.strength = this.strength + 1;
                    break;
                case 3:
                    this.dexterity = this.dexterity + 1;
                    break;
                case 4:
                    this.insight = this.insight + 1;
                    break;
                case 5:
                    this.focus = this.focus + 1;
                    break;
            }
        }
    }
}