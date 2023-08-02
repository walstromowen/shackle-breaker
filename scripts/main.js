import Player from "./player.js";
import Controller from "./controller.js";
import MiniMap from "./miniMap.js";
import {LinenShirt, LinenPants, WoodDagger, WoodSpear, WoodSword, 
        WoodSideDagger, WoodSheild, WoodFireStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, IronSheild, IronHelmet, IronGuantlets, IronChainmail, 
        IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedThrowingKnife} from "./items.js";

export let player;
export let miniMap;
export let controller;
let characterCreationArray = ["name", "apperance", "background", [], 0, 0, 0];

document.getElementById('music-player').src = "./audio/a-sinister-power-rising-epic-dark-gothic-soundtrack-15021.mp3";
document.getElementById('music-player').play();

document.getElementById('title-start-button').addEventListener("click", ()=>{
    document.getElementById("title-screen").style.display = "none";
    document.getElementById('music-player').pause();
    document.getElementById("character-creation-screen").style.display = "block";
    updateInventory();
});

document.getElementById('character-creation-submit-btn').addEventListener("click", ()=>{
    document.getElementById("character-creation-screen").style.display = "none";
    characterCreationArray[0] = document.getElementById("name-selection").value;
    characterCreationArray[1] = document.getElementById("apperance-selection").value;
    characterCreationArray[2] = document.getElementById("background-selection").value;
    player = new Player(characterCreationArray);
    miniMap = new MiniMap();
    controller = new Controller();
    document.getElementById("app").style.display = "block";
});
document.getElementById('title-exit-button').addEventListener("click", ()=>{
    window.close();
});

document.getElementById('gameover-to-menu-btn').addEventListener("click", ()=>{
    location.reload();
});
document.getElementById('gameover-exit-btn').addEventListener("click", ()=>{
    window.close();
});






//Character Creation Screen
document.getElementById("apperance-selection").addEventListener("change", ()=>{
    document.getElementById("character-creator-apperance-image").src = document.getElementById("apperance-selection").value; 
});
document.getElementById("background-selection").addEventListener("change", ()=>{
    let value = document.getElementById("background-selection").value;
    switch(value){
        case "traveler":
            updateStats(12, 12, 12);
            break;
        case "blacksmith":
            updateStats(15, 12, 8);
            break;
        case "ranger":
            updateStats(12, 15, 8);
            break;
        case "hermit":
            updateStats(12, 8, 15);
            break;
    }
    updateInventory();
});
document.getElementById("keepsake-selection").addEventListener("change", ()=>{
    updateInventory();
});

function updateInventory(){
    let inventoryArray = [];
    let value = document.getElementById("background-selection").value;
    switch(value){
        case "traveler":
            inventoryArray.push(new WoodSpear, new LeatherChestplate);
            break;
        case "blacksmith":
            inventoryArray.push(new WoodSword, new IronChainmail);
            break;
        case "ranger":
            inventoryArray.push(new WoodDagger, new WoodSideDagger, new LeatherChestplate);
            break;
        case "hermit":
            inventoryArray.push(new WoodFireStaff);
            break;
    }
    let value2 = document.getElementById("keepsake-selection").value;
    switch(value2){
        case "none":
            break;
        case "throwing-knifes":
            inventoryArray.push(new ThrowingKnife, new ThrowingKnife, new PoisonedThrowingKnife );
            break;
        case "bag-of-potions":
            inventoryArray.push(new HealthPotion, new StaminaPotion , new MagicPotion);
            break;
    }
    for(let i = -1; i < characterCreationArray[3].length; i++){
        let oldSlot = document.getElementById("character-creation-inventory").querySelector('p');
        if(oldSlot !== null){
            oldSlot.remove();
        } 
    }
    for(let i = 0; i < inventoryArray.length; i++){
        let inventorySlot = document.createElement('p');
        inventorySlot.classList.add('inventory-slot');
        inventorySlot.innerText = inventoryArray[i].name.charAt(0).toUpperCase() + inventoryArray[i].name.slice(1);;
        document.getElementById("character-creation-inventory").appendChild(inventorySlot);
    }
    characterCreationArray[3] = inventoryArray;
}

function updateStats(health, stamina, magic){
    characterCreationArray[4] = health;
    characterCreationArray[5] = stamina;
    characterCreationArray[6] = magic;
    document.getElementById("character-creation-health").innerText = characterCreationArray[4];
    document.getElementById("character-creation-stamina").innerText = characterCreationArray[5];
    document.getElementById("character-creation-magic").innerText = characterCreationArray[6];
}



