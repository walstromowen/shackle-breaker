import {Recover, Punch, Retreat} from "./abilities.js";
import { Bleeding } from "./statusEffects.js";

export default class Character{
    constructor(characterCreationArray){ //[name, apperanceSrc, origin, attributesArray, equippedArray]
        this.name = characterCreationArray[0];
        this.apperance = characterCreationArray[1]
        this.origin = characterCreationArray[2]
        this.equippedArray = [characterCreationArray[4][0], characterCreationArray[4][1], characterCreationArray[4][2], characterCreationArray[4][3], characterCreationArray[4][4], characterCreationArray[4][5] , characterCreationArray[4][6]]; 
        this.abilityArray = [new Punch, new Recover, new Retreat];
        this.level = 1;
        this.currentXP = 0;
        this.vigor = characterCreationArray[3][0];
        this.endurance = characterCreationArray[3][1];
        this.strength = characterCreationArray[3][2];
        this.dexterity = characterCreationArray[3][3];
        this.insight = characterCreationArray[3][4];
        this.focus = characterCreationArray[3][5];
        this.maxHP = 0;
        this.maxStamina = 0;
        this.maxMagic = 0;
        this.baseBluntAttack = 0;
        this.basePierceAttack = 0;
        this.baseArcaneAttack = 0;
        this.baseElementalAttack = 0;
        this.baseBluntDefense = 0;
        this.basePierceDefense = 0;
        this.baseArcaneDefense = 0;
        this.baseElementalDefense = 0;
        this.baseSpeed = 25;
        this.baseEvasion = 5;
        this.statusArray = [];//new Poisoned(this), new Burned(this), new Frostbite(this), new Paralyzed(this), new Shielded(this), new Energized(this), new Empowered(this), new Bound(this)
        this.nextMove = "";
        this.scaleAttributes()
        this.currentHP = this.maxHP;
        this.currentStamina = this.maxStamina;
        this.currentMagic = this.maxMagic;
        this.currentBluntAttack = this.baseBluntAttack;
        this.currentPierceAttack = this.basePierceAttack;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.currentElementalAttack = this.baseElementalAttack;
        this.currentBluntDefense = this.baseBluntDefense;
        this.currentPierceDefense = this.basePierceDefense;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.currentElementalDefense = this.baseElementalDefense;
        this.currentSpeed = this.baseSpeed;
        this.currentEvasion = this.baseEvasion;
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
    scaleAttributes(){
        this.maxHP = (this.vigor * 10) + (this.endurance * 2) + (this.strength * 2) + (this.dexterity * 2) + (this.insight * 2) + (this.focus * 2);
        this.maxStamina = (this.vigor * 1) + (this.endurance * 5) + (this.strength * 3) + (this.dexterity * 3) + (this.insight * 1) + (this.focus * 1);
        this.maxMagic = (this.vigor * 1) + (this.endurance * 5) + (this.strength * 1) + (this.dexterity * 1) + (this.insight * 3) + (this.focus * 3);
        this.baseBluntAttack = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 3) + (this.dexterity * 2) + (this.insight * 2) + (this.focus * 2);
        this.basePierceAttack = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 2) + (this.dexterity * 3) + (this.insight * 2) + (this.focus * 2);
        this.baseArcaneAttack = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.insight * 3) + (this.focus * 2);
        this.baseElementalAttack = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 2) + (this.dexterity * 2) + (this.insight * 2) + (this.focus * 3);
        this.baseBluntDefense = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 2) + (this.dexterity * 1) + (this.insight * 1) + (this.focus * 1);
        this.basePierceDefense = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 1) + (this.dexterity * 2) + (this.insight * 1) + (this.focus * 1);
        this.baseArcaneDefense = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.insight * 2) + (this.focus * 1);
        this.baseElementalDefense = (this.vigor * 1) + (this.endurance * 1) + (this.strength * 1) + (this.dexterity * 1) + (this.insight * 1) + (this.focus * 2);
    }
}