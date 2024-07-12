import {createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';

export default class LobbyView{
    constructor(){
        this.screen = document.getElementById('lobby-screen');
        this.backgroundDescription = document.getElementById('background-description');
        this.apperanceImage = document.getElementById('lobby-apperance-image');
        
        this.gold = document.getElementById('lobby-gold');

        this.vigor = document.getElementById('lobby-vigor');
        this.strength = document.getElementById('lobby-strength');
        this.dexterity = document.getElementById('lobby-dexterity');
        this.intelligence = document.getElementById('lobby-intelligence');
        this.attunement = document.getElementById('lobby-attunement');

        this.maxHP = document.getElementById('lobby-max-hp');
        this.hitPointsRecovery = document.getElementById('lobby-hp-recovery');
        this.maxStamina = document.getElementById('lobby-max-stamina');
        this.staminaRecovery = document.getElementById('lobby-stamina-recovery');
        this.maxMagic = document.getElementById('lobby-max-magic');
        this.magicRevocery = document.getElementById('lobby-magic-recovery');
        this.bluntAttack = document.getElementById('lobby-blunt-attack');
        this.bluntDefense = document.getElementById('lobby-blunt-defense');
        this.pierceAttack = document.getElementById('lobby-pierce-attack');
        this.pierceDefense = document.getElementById('lobby-pierce-defense');
        this.arcaneAttack = document.getElementById('lobby-arcane-attack');
        this.arcaneDefense = document.getElementById('lobby-arcane-defense');
        this.elementalAttack = document.getElementById('lobby-elemental-attack');
        this.elementalDefense = document.getElementById('lobby-elemental-defense');
        this.bluntResistance = document.getElementById('lobby-blunt-resistance');
        this.pierceResistance = document.getElementById('lobby-pierce-resistance');
        this.arcaneResistance =  document.getElementById('lobby-arcane-resistance');
        this.elementalResistance = document.getElementById('lobby-elemental-resistance');



        this.speed = document.getElementById('lobby-speed');
        this.evasion = document.getElementById('lobby-evasion');
        this.critical = document.getElementById('lobby-critical');

        this.lobbyInventory = document.getElementById('lobby-inventory');
    }
    updateApperance(src){
        this.apperanceImage.src = src;
    }
    updateInventory(equipment, partyInventory){
        this.lobbyInventory.querySelectorAll('.inventory-slot').forEach((node)=>{
            node.remove();
        });
        for(let i = 0; i < equipment.length; i++){
            if(equipment[i].itemType == 'attachable'){
                this.createInventorySlot(equipment[i]);
            } 
        }
        for(let i = 0; i < partyInventory.length; i++){
            this.createInventorySlot(partyInventory[i]);
        }
    }
    createInventorySlot(item){
        const slot = createElement('div', 'inventory-slot');
        const slotData = createElement('img', 'inventory-slot-data');
        slotData.src = item.imageSrc;
        slot.appendChild(slotData);
        this.lobbyInventory.appendChild(slot);

    }
    updateAttributes([vigor, strength, dexterity, intelligence, attunement]){
        this.vigor.innerText = vigor;
        this.strength.innerText = strength;
        this.dexterity.innerText = dexterity;
        this.intelligence.innerText = intelligence;
        this.attunement.innerText = attunement;
    }
    updateStats([currentHP, currentStamina, currentMagic, currentHpRecovery, currentStaminaRecovery, currentMagicRecovery, currentBluntAttack, currentPierceAttack,
                 currentArcaneAttack, currentElementalAttack, currentBluntDefense, currentPierceDefense, currentArcaneDefense, currentElementalDefense, 
                 currentBluntResistance, currentPierceResistance, currentArcaneResistance, currentElementalResistance,
                 currentSpeed, currentEvasion,currentCritical]){
        this.maxHP.innerText = currentHP;
        this.hitPointsRecovery.innerText = currentHpRecovery;
        this.maxStamina.innerText = currentStamina
        this.staminaRecovery.innerText = currentStaminaRecovery;
        this.maxMagic.innerText = currentMagic;
        this.magicRevocery.innerText = currentMagicRecovery;
        this.bluntAttack.innerText = currentBluntAttack;
        this.bluntDefense.innerText = currentBluntDefense;
        this.pierceAttack.innerText = currentPierceAttack;
        this.pierceDefense.innerText = currentPierceDefense;
        this.arcaneAttack.innerText = currentArcaneAttack;
        this.arcaneDefense.innerText = currentArcaneDefense;
        this.elementalAttack.innerText = currentElementalAttack;
        this.elementalDefense.innerText = currentElementalDefense;
        this.bluntResistance.innerText = currentBluntResistance;
        this.pierceResistance.innerText = currentPierceResistance;
        this.arcaneResistance.innerText = currentArcaneResistance
        this.elementalResistance.innerText = currentElementalResistance;
        this.speed.innerText = currentSpeed;
        this.evasion.innerText = currentEvasion;
        this.critical.innerText = currentCritical;
    }
    updateGold(gold){
        this.gold.innerText = gold;
    }
}

        