import Map from "./map.js";
import {WoodDagger, WoodSpear, WoodSheild, IronSheild, IronHelmet, IronChainmail, IronGuantlets, IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, ThrowingKnife, WoodFireStaff} from "./item.js";
import {Recover, Punch, Retreat} from "./abilities.js"
import {controller as theController} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";
import {Sheilded, Bound, Posioned, Burned} from "./statusEffects.js";

export default class Player{
    constructor(){
        this.equippedArray = ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"];
        this.inventory = [new WoodSheild, new WoodDagger, new WoodFireStaff, new ThrowingKnife];
        this.abilityArray = [new Punch, new Recover, new Retreat];
        this.level = 0;
        this.currentXP = 0;
        this.maxHP = 10;
        this.currentHP = this.maxHP;
        this.maxStamina = 10
        this.currentStamina = this.maxStamina;
        this.maxMagic = 10;
        this.currentMagic = this.maxMagic;
        this.baseArmor = 0;
        this.currentArmor = this.baseArmor;
        this.baseAttack = 1;
        this.currentAttack = this.baseAttack;
        this.baseSpeed = 1;
        this.currentSpeed = this.baseSpeed;
        this.statusArray = [];//new Posioned(this)
        this.isInBattle = false;
        this.isFirst = true;
        this.canMoveRoom = true;
        this.map = new Map(this.level);
        this.name = "shackle breaker";
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
    }
    moveNorth(){
        this.moveRoom(this.currentRoom.roomNorth);
    }
    moveEast(){
        this.moveRoom(this.currentRoom.roomEast);
    }
    moveSouth(){
        this.moveRoom(this.currentRoom.roomSouth);
    }
    moveWest(){
        this.moveRoom(this.currentRoom.roomWest);
    }
    moveRoom(nextRoom){
        if(nextRoom !== ""){
            if(nextRoom.enemy !== ""){
                this.nextRoom = nextRoom;
                theController.toggleBattle(nextRoom.enemy);
                theController.updateEnemyStats();
                return; 
            }
            this.currentRoom.visited = true;//
            this.currentRoom = nextRoom;
            theMiniMap.draw();
            if(this.currentRoom.isExit == true){
                this.levelUp();
                theController.gameConsole.innerHTML += `<p>You find an exit!</p>`;
                this.generateNewMap();
            }else{
                //theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
            }
        }
        else{
            theController.gameConsole.innerHTML += "<p>Cannot go this way.</p>";
        }
        theController.updatePlayerStats();           
    }
    defeatEnemy(){
        this.currentRoom.visited = true;//
        this.currentRoom = this.nextRoom;//
        theController.battle.loot();
        this.currentRoom.enemy = "";
        theMiniMap.draw();//
        //theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";//
        theController.scrollToBottom("game-console");
    }
    calcAbilitiesAndStats(){
        //reset stats and abilities
        this.currentAttack = this.baseAttack;
        this.currentArmor = this.baseArmor;
        this.abilityArray = [];
        //update stats
        for(var i = 0; i < this.equippedArray.length; i++){
            if(this.equippedArray[i] != "Empty"){
                this.currentArmor = this.currentArmor + this.equippedArray[i].armor;
                this.currentAttack = this.currentAttack + this.equippedArray[i].attack;
            }
        }
        //punch check
        if(this.equippedArray[0] == "Empty"){
            this.abilityArray.push(new Punch);
        }
        //update abilities
        for(let x = 0; x < this.equippedArray.length; x ++){
            if(this.equippedArray[x] != "Empty"){
                for(let y = 0; y < this.equippedArray[x].abilityArray.length; y ++){
                    this.abilityArray.push(this.equippedArray[x].abilityArray[y]);
                }
            }
        }
        this.abilityArray.push(new Recover);
        this.abilityArray.push(new Retreat);
      }
    equip(inventoryIndex){
        if(this.isInBattle == false){
            switch(this.inventory[inventoryIndex].type){
                case "weapon":
                    if(this.equippedArray[0] !== "Empty"){
                        this.inventory.push(this.equippedArray[0]);
                    }
                    this.equippedArray[0] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1);
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[0].name}.</p>`;
                    theController.updatePlayerEquippedTab(0);
                    theController.soundEffectPlayer.src = "./audio/soundEffects/anvil-hit-2-14845.mp3";
                    theController.soundEffectPlayer.play();
                    break;
                case "offhand":
                    if(this.equippedArray[1] !== "Empty"){
                        this.inventory.push(this.equippedArray[1]);
                    }
                    this.equippedArray[1] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1);
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[1].name}.</p>`;
                    theController.updatePlayerEquippedTab(1);
                    theController.soundEffectPlayer.src = "./audio/soundEffects/anvil-hit-2-14845.mp3";
                    theController.soundEffectPlayer.play();
                    break;
                case "head":
                    if(this.equippedArray[2] !== "Empty"){
                        this.inventory.push(this.equippedArray[2]);
                    } 
                    this.equippedArray[2] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[2].name}.</p>`;
                    theController.updatePlayerEquippedTab(2);
                    theController.soundEffectPlayer.src = "./audio/soundEffects/anvil-hit-2-14845.mp3";
                    theController.soundEffectPlayer.play();
                    break;
                case "torso":
                    if(this.equippedArray[3] !== "Empty"){
                        this.inventory.push(this.equippedArray[2]);
                    } 
                    this.equippedArray[3] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[3].name}.</p>`;
                    theController.updatePlayerEquippedTab(3);
                    theController.soundEffectPlayer.src = "./audio/soundEffects/anvil-hit-2-14845.mp3";
                    theController.soundEffectPlayer.play();
                    break;
                case "arms":
                    if(this.equippedArray[4] !== "Empty"){
                        this.inventory.push(this.equippedArray[4]);
                    } 
                    this.equippedArray[4] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[4].name}.</p>`;
                    theController.updatePlayerEquippedTab(4);
                    theController.soundEffectPlayer.src = "./audio/soundEffects/anvil-hit-2-14845.mp3";
                    theController.soundEffectPlayer.play();
                    break;
                case "legs":
                    if(this.equippedArray[5] !== "Empty"){
                        this.inventory.push(this.equippedArray[5]);
                    } 
                    this.equippedArray[5] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[5].name}.</p>`;
                    theController.updatePlayerEquippedTab(5);
                    theController.soundEffectPlayer.src = "./audio/soundEffects/anvil-hit-2-14845.mp3";
                    theController.soundEffectPlayer.play();
                    break;
                case "feet":
                    if(this.equippedArray[6] !== "Empty"){
                        this.inventory.push(this.equippedArray[6]);
                    } 
                    this.equippedArray[6] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[6].name}.</p>`;
                    theController.updatePlayerEquippedTab(6);
                    theController.soundEffectPlayer.src = "./audio/soundEffects/anvil-hit-2-14845.mp3";
                    theController.soundEffectPlayer.play();
                    break;
                default:
                    break;
            }
            this.calcAbilitiesAndStats();
            theController.updatePlayerInventoryTab(this.inventory);
        }else{
            theController.gameConsole.innerHTML += `<p>Cannot equip during combat!</p>`;
        }
        theController.scrollToBottom("game-console");
        
    }
    unequip(equippedArrayIndex){
        if(this.isInBattle == false){
            if(this.equippedArray[equippedArrayIndex] != "Empty"){
                theController.gameConsole.innerHTML += `<p>You unequip ${this.equippedArray[equippedArrayIndex].name}.</p>`;
                this.inventory.push(this.equippedArray[equippedArrayIndex]);
                this.equippedArray[equippedArrayIndex] = "Empty";
                theController.updatePlayerInventoryTab(this.inventory);
                theController.updatePlayerEquippedTab(equippedArrayIndex);
                this.calcAbilitiesAndStats();
            }else{
                theController.gameConsole.innerHTML += `<p>Nothing equipped!</p>`;
            }
        }else{
            theController.gameConsole.innerHTML += `<p>Cannot unequip during combat!</p>`;
        }
        theController.scrollToBottom("game-console");
    }
    levelUp(){
        this.level = this.level + 1;
        theController.gameConsole.innerHTML += `<p>Level up! New level: ${this.level}.</p>`;
        theController.displayLevelUpScreen();
    }
    generateNewMap(){
        this.map = new Map(this.level);
        //this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        theController.locationImage.src = this.map.mapEnviorment.imageSrc;
        let locationName = this.map.mapEnviorment.biome
        locationName = locationName.charAt(0).toUpperCase() + locationName.slice(1);
        theController.locationName.innerText = locationName;
        theMiniMap.draw();
    }
}



