import {Recover, Punch, Retreat} from "./abilities.js";
import {Poisoned, Burned, Frostbite, Paralyzed, Sheilded, Channeled, Empowered, Bound} from "./statusEffects.js";

export default class Player{
    constructor(characterCreationArray){
        this.name = characterCreationArray[0];
        this.apperance = characterCreationArray[1]
        this.origin = characterCreationArray[2]
        this.equippedArray = ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"]; //[name, apperanceSrc, origin, inventory, attributesArray, StatsArray, ]
        this.inventory = characterCreationArray[3];
        this.abilityArray = [new Punch, new Recover, new Retreat];
        this.level = 0;
        this.currentGold = characterCreationArray[6];
        this.currentXP = 0;
        this.vigor = characterCreationArray[4][0];
        this.endurance = characterCreationArray[4][1];
        this.strength = characterCreationArray[4][2];
        this.dexterity = characterCreationArray[4][3];
        this.insight = characterCreationArray[4][4];
        this.focus = characterCreationArray[4][5];
        this.maxHP = characterCreationArray[5][0];
        this.currentHP = this.maxHP;
        this.maxStamina = characterCreationArray[5][1];
        this.currentStamina = this.maxStamina;
        this.maxMagic = characterCreationArray[5][2];
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = characterCreationArray[5][3];
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = characterCreationArray[5][4];
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = characterCreationArray[5][5];
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = characterCreationArray[5][6];
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = characterCreationArray[5][7];
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = characterCreationArray[5][8];
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = characterCreationArray[5][9];
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = characterCreationArray[5][10];
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 25;
        this.currentSpeed = this.baseSpeed;
        this.baseEvasion = 10;
        this.currentEvasion = this.baseEvasion;
        this.statusArray = [];//new Poisoned(this), new Burned(this), new Frostbite(this), new Paralyzed(this), new Sheilded(this), new Energized(this), new Empowered(this), new Bound(this)
        this.isInBattle = false;
        this.canMoveRoom = true;
        this.currentRoom = "";
        this.nextRoom = "";
    } 
    initializeRooms(map){
        this.currentRoom = map.roomArray[map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
    }
}