import Map from "./map.js";
import {Dagger, Spear, IronSheild, IronHelmet, IronChainmail, IronGuantlets, IronGreaves, IronBoots, HealingPotion, StaminaPotion, ThrowingKnife} from "./item.js";
import {Recover, Punch, Retreat} from "./abilities.js"
import {controller as theController} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";

export default class Player{
    constructor(){
        this.equippedArray = ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"];
        this.inventory = [new Dagger, new IronSheild, new HealingPotion, new StaminaPotion];
        this.abilityArray = [new Punch, new Recover, new Retreat];
        this.level = 0;
        this.currentXp = 0;
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
        this.statusArray = [];
        this.isInBattle = false;
        this.isFirst = true;
        this.canMoveRoom  = true;
        this.map = new Map(this.level);
        this.name = "schackle breaker";
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
            theController.gameConsole.innerHTML += "<p>Cannot go this way.</p>";
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


    endTurn(){
        theController.scrollToBottom("game-console");
        theController.updatePlayerStats();
        theController.updateEnemyStats();
        console.log(this.currentArmor);
        if(this.currentEnemy.currentHP <= 0 || this.currentHP <= 0){
            return true;     
        }else{
            return false;
        }
    }
    updateStatusEffects(){
        for(var i = 0; i < this.statusArray.length; i++){
            this.statusArray[i].checkCharges();
        }
    }
    determineFirstMove(abilityIndex){
        this.nextMove = this.abilityArray[abilityIndex];
        if(this.nextMove.canUse(this) == false){
            return;
        }
        this.currentEnemy.nextMove = this.currentEnemy.chooseAttack();
        this.currentEnemy.nextMove.canUse(this.currentEnemy);
        theController.disablePlayerBattleControls();
        if(this.nextMove.speed + this.currentSpeed >= this.currentEnemy.currentSpeed + this.currentEnemy.nextMove.speed){
            this.isFirst = true;
            
        }else{
            this.isFirst = false;
           
        }
        setTimeout(()=>{
            if(this.isFirst == true){
                switch(this.nextMove.type){
                    case "attack":
                        if(this.nextMove.activate(this, this.currentEnemy) == false){
                            return;
                        }
                        break;
                    case "buff":
                        if(this.nextMove.activate(this, this) == false){
                            return;
                        }
                        break;
                }
            }else{
                switch(this.currentEnemy.nextMove.type){
                    case "attack":
                        if(this.currentEnemy.nextMove.activate(this.currentEnemy, this) == false){
                            return;
                        }
                        break;
                    case "buff":
                        if(this.currentEnemy.nextMove.activate(this.currentEnemy, this.currentEnemy) == false){
                            return;
                        }
                        break;
                }
            }
            if(this.endTurn() == false){
                this.determineSecondMove();
            }else{
                theController.endBattle();
            }
        }, 1000);
    }
    determineSecondMove(){
        this.currentEnemy.nextMove.canUse(this.currentEnemy);
        setTimeout(()=>{
            if(this.isFirst == false){
                switch(this.nextMove.type){
                    case "attack":
                        if(this.nextMove.activate(this, this.currentEnemy) == false){
                            return;
                        }
                        break;
                    case "buff":
                        if(this.nextMove.activate(this, this) == false){
                            return;
                        }
                        break;
                }
            }else{   
                switch(this.currentEnemy.nextMove.type){
                    case "attack":
                        if(this.currentEnemy.nextMove.activate(this.currentEnemy, this) == false){
                            return;
                        }
                        break;
                    case "buff":
                        if(this.currentEnemy.nextMove.activate(this.currentEnemy, this.currentEnemy) == false){
                            return;
                        }
                        break;
                }
            }
            if(this.endTurn() == false){
                theController.enablePlayerBattleControls();
            }else{
                theController.endBattle();
            }
        }, 2000);
    }




    useConsumable(inventoryIndex){
        if(this.isInBattle == false){
            if(this.inventory[inventoryIndex].consume(this, this.currentEnemy) == false){
                return;
            }
            theController.updatePlayerStats();
            this.inventory.splice(inventoryIndex, 1);
            theController.updatePlayerInventoryTab(this.inventory);
        }else{
            theController.disablePlayerBattleControls();
            this.currentEnemy.nextMove = this.currentEnemy.chooseAttack();
            setTimeout(()=>{ 
                if(this.inventory[inventoryIndex].consume(this, this.currentEnemy) == true){
                    this.inventory.splice(inventoryIndex, 1);
                    theController.updatePlayerInventoryTab(this.inventory);
                    theController.disablePlayerBattleControls();
                }
                if(this.endTurn() == false){
                    this.isTurn = true;
                    this.determineSecondMove();
                }else{
                    theController.endBattle();
                }
            }, 1000);
        }
    }
    loot(){
        let loot = this.currentEnemy.dropLoot();
        if(loot != ""){
            this.inventory.push(loot);
            theController.updatePlayerInventoryTab(this.inventory);
        }
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
        this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        theController.locationImage.src = this.map.mapEnviorment.imageSrc;
        let locationName = this.map.mapEnviorment.biome
        locationName = locationName.charAt(0).toUpperCase() + locationName.slice(1);
        theController.locationName.innerText = locationName;
        theMiniMap.draw();
    }
}



