import Map from "./map.js";
import {Dagger, Spear, IronHelmet, IronChainmail, IronGuantlets, IronGreaves, IronBoots} from "./item.js";
import {controller as theController} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";

export default class Player{
    constructor(){
        this.equippedArray = ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"];
        this.inventory = [new Spear(), new IronHelmet, new IronChainmail, new IronGuantlets, new IronGreaves, new IronBoots];
        this.level = 0;
        this.currentXp = 0;
        this.maxHP = 10;
        this.currentHP = this.maxHP;
        this.maxStamina = 10
        this.currentStamina = this.maxStamina;
        this.maxMagic = 10;
        this.currentMagic = this.maxMagic;
        this.maxMagic = 10;
        this.baseArmor = 1;
        this.armorLevel = this.baseArmor;
        this.baseAttack = 1;
        this.isInBattle = false;
        this.map = new Map(this.level);
        this.name = "The Schackle Breaker";
        this.currentEnemy = ""; 
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
                this.currentEnemy = nextRoom.enemy
                theController.updateEnemyStats();
                theController.toggleBattle();
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
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();           
    }
    defeatEnemy(){
        this.currentRoom.visited = true;//
        this.currentRoom = this.nextRoom;//
        this.loot();
        this.currentRoom.enemy = "";
        theMiniMap.draw();//
        //theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";//
        theController.scrollToBottom("game-console");
    }
    primaryAttack(){
        if(this.equippedArray[0] != "Empty"){
            if(this.currentStamina - this.equippedArray[0].staminaCost < 0){
                theController.gameConsole.innerHTML += `<p>Not Enough Stamina!</p>`;
                theController.scrollToBottom("game-console");
                return;
            }
            this.equippedArray[0].primaryAttack(this);
        }else{//no weapon equipped
            let damageOutput = this.baseAttack - this.currentEnemy.armorLevel;
            if(this.currentStamina - 2 < 0){
                theController.gameConsole.innerHTML += `<p>Not Enough Stamina!</p>`;
                return;
            }else{
                if(damageOutput < 0){
                    damageOutput = 0;
                }
                this.currentStamina = this.currentStamina - 2;
                this.currentEnemy.currentHP = this.currentEnemy.currentHP - damageOutput;
                theController.gameConsole.innerHTML += `<p> You punch the ${this.currentEnemy.name} for ${damageOutput} damage!</p>`;
            }
        }
        theController.disablePlayerBattleControls();
        theController.updateEnemyStats();
        theController.updatePlayerStats();
        setTimeout(()=>{
            if(theController.battleOverCheck() === true){
                theController.endBattle();
            }else{
                this.currentEnemy.chooseAttack(this);
            }
        }, 2000);
    }
    generateNewMap(){
        this.map = new Map(this.level);
        this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        theController.locationImage.src = this.map.mapEnviorment.imageSrc;
        theController.locationName.innerText = this.map.mapEnviorment.biome;
        theMiniMap.draw();
    }
    loot(){
        let loot = this.currentEnemy.dropLoot();
        if(loot != ""){
            this.inventory.push(loot);
            theController.updatePlayerInventoryTab(this.inventory);
        }
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
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[0].name}</p>`;
                    theController.updatePlayerEquippedTab(0);
                    break;
                case "offhand":
                    if(this.equippedArray[1] !== "Empty"){
                        this.inventory.push(this.equippedArray[1]);
                    }
                    this.equippedArray[1] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1);
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[1].name}</p>`;
                    theController.updatePlayerEquippedTab(1);
                    break;
                case "head":
                    if(this.equippedArray[2] !== "Empty"){
                        this.inventory.push(this.equippedArray[2]);
                    } 
                    this.equippedArray[2] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[2].name}</p>`;
                    theController.updatePlayerEquippedTab(2);
                    break;
                case "torso":
                    if(this.equippedArray[3] !== "Empty"){
                        this.inventory.push(this.equippedArray[2]);
                    } 
                    this.equippedArray[3] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[3].name}</p>`;
                    theController.updatePlayerEquippedTab(3);
                    break;
                case "arms":
                    if(this.equippedArray[4] !== "Empty"){
                        this.inventory.push(this.equippedArray[4]);
                    } 
                    this.equippedArray[4] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[4].name}</p>`;
                    theController.updatePlayerEquippedTab(4);
                    break;
                case "legs":
                    if(this.equippedArray[5] !== "Empty"){
                        this.inventory.push(this.equippedArray[5]);
                    } 
                    this.equippedArray[5] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[5].name}</p>`;
                    theController.updatePlayerEquippedTab(5);
                    break;
                case "feet":
                    if(this.equippedArray[6] !== "Empty"){
                        this.inventory.push(this.equippedArray[6]);
                    } 
                    this.equippedArray[6] = this.inventory[inventoryIndex];
                    this.inventory.splice(inventoryIndex, 1); 
                    theController.gameConsole.innerHTML += `<p>You equip ${this.equippedArray[6].name}</p>`;
                    theController.updatePlayerEquippedTab(6);
                    break;
                default:
                    break;
            }
            this.armorLevel = this.baseArmor;
            for(var i = 0; i < this.equippedArray.length; i++){
                if(this.equippedArray[i] != "Empty"){
                    this.armorLevel = this.armorLevel + this.equippedArray[i].armor;
                }
            }
            theController.updatePlayerInventoryTab(this.inventory);
        }else{
            theController.gameConsole.innerHTML += `<p>Cannot equip during combat!</p>`;
        }
        theController.scrollToBottom("game-console");
    }
    unequip(equippedArrayIndex){
        if(this.isInBattle == false){
            if(this.equippedArray[equippedArrayIndex] != "Empty"){
                theController.gameConsole.innerHTML += `<p>You unequip ${this.equippedArray[equippedArrayIndex].name}</p>`;
                this.inventory.push(this.equippedArray[equippedArrayIndex]);
                this.equippedArray[equippedArrayIndex] = "Empty";
                theController.updatePlayerInventoryTab(this.inventory);
                theController.updatePlayerEquippedTab(equippedArrayIndex);
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
        theController.gameConsole.innerHTML += `<p>Level up! New level: ${this.level}</p>`;
        theController.displayLevelUpScreen();
    }
}


