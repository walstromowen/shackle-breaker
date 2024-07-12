import {createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';

export default class CharacterSummaryView{
    constructor(){
        this.screen = document.getElementById('character-summary-screen');
            
        this.characterName = document.getElementById('character-summary-character-name');

        this.maxHP = document.getElementById('character-summary-max-health');
        this.maxStamina = document.getElementById('character-summary-max-stamina');
        this.maxMagic = document.getElementById('character-summary-max-magic');
        this.currentHP = document.getElementById('character-summary-current-health');
        this.currentStamina = document.getElementById('character-summary-current-stamina');
        this.currentMagic = document.getElementById('character-summary-current-magic');

        this.healthProgress = document.getElementById('character-summary-health-progress');
        this.staminaProgress = document.getElementById('character-summary-stamina-progress');
        this.magicProgress = document.getElementById('character-summary-magic-progress');

        this.vigor = document.getElementById('character-summary-vigor');
        this.strength = document.getElementById('character-summary-strength');
        this.dexterity = document.getElementById('character-summary-dexterity');
        this.intelligence = document.getElementById('character-summary-intelligence');
        this.attunement = document.getElementById('character-summary-attunement');

        this.hpRecovery = document.getElementById('character-summary-hp-recovery');
        this.staminaRecovery = document.getElementById('character-summary-stamina-recovery');
        this.magicRecovery = document.getElementById('character-summary-magic-recovery');

        this.bluntAttack = document.getElementById('character-summary-blunt-attack');
        this.pierceAttack = document.getElementById('character-summary-pierce-attack');
        this.arcaneAttack = document.getElementById('character-summary-arcane-attack');
        this.elementalAttack = document.getElementById('character-summary-elemental-attack');
        this.bluntDefense = document.getElementById('character-summary-blunt-defense');
        this.bluntResistance = document.getElementById('character-summary-blunt-resistance');
        this.pierceDefense = document.getElementById('character-summary-pierce-defense');
        this.pierceResistance = document.getElementById('character-summary-pierce-resistance');
        this.arcaneDefense = document.getElementById('character-summary-arcane-defense');
        this.arcaneResistance = document.getElementById('character-summary-arcane-resistance');
        this.elementalDefense = document.getElementById('character-summary-elemental-defense');
        this.elementalResistance = document.getElementById('character-summary-elemental-resistance');
        
        this.speed = document.getElementById('character-summary-speed');
        this.evasion = document.getElementById('character-summary-evasion');
        this.critical = document.getElementById('character-summary-critical');

        this.characterImage = document.getElementById('character-summary-character-image');

        this.inventoryContainer = document.getElementById('character-summary-inventory-slots-container');
        this.equippedContainer = document.getElementById('character-summary-equipped-container');
    }
    displayCharacterSummary(entity){
        this.characterName.innerText = entity.name;

        this.maxHP.innerText = entity.maxHP;
        this.maxStamina.innerText = entity.maxStamina;
        this.maxMagic.innerText = entity.maxMagic;
        this.currentHP.innerText = entity.currentHP;
        this.currentStamina.innerText = entity.currentStamina;
        this.currentMagic.innerText = entity.currentMagic;

        this.healthProgress.style.width = Math.floor(entity.currentHP/entity.maxHP*100) + "%";
        this.staminaProgress.style.width = Math.floor(entity.currentStamina/entity.maxStamina*100) + "%";
        this.magicProgress.style.width = Math.floor(entity.currentMagic/entity.maxMagic*100) + "%";

        this.vigor.innerText = entity.vigor;
        this.strength.innerText = entity.strength;
        this.dexterity.innerText = entity.dexterity;
        this.intelligence.innerText = entity.intelligence;
        this.attunement.innerText = entity.attunement;

        this.hpRecovery.innerText = entity.currentHpRecovery
        this.staminaRecovery.innerText = entity.currentStaminaRecovery;
        this.magicRecovery.innerText = entity.currentMagicRecovery;

        this.bluntAttack.innerText = entity.currentBluntAttack;
        this.pierceAttack.innerText = entity.currentPierceAttack;
        this.arcaneAttack.innerText = entity.currentArcaneAttack;
        this.elementalAttack.innerText = entity.currentElementalAttack;
        this.bluntDefense.innerText = entity.currentBluntDefense;
        this.bluntResistance.innerText = entity.currentBluntResistance;
        this.pierceDefense.innerText = entity.currentPierceDefense;
        this.pierceResistance.innerText = entity.currentPierceResistance;
        this.arcaneDefense.innerText = entity.currentArcaneDefense;
        this.arcaneResistance.innerText = entity.currentArcaneResistance;
        this.elementalDefense.innerText = entity.currentElementalDefense;
        this.elementalResistance.innerText = entity.currentElementalResistance;

        this.speed.innerText = entity.currentSpeed;
        this.evasion.innerText = entity.currentEvasion;
        this.critical.innerText = entity.currentCritical;

        this.characterImage.src = entity.apperance;

    }

    createInventorySlots(inventory){
        this.inventoryContainer.querySelectorAll('.inventory-slot').forEach((node)=>{
            node.remove();
        });
        for(let i = 0; i < inventory.length; i++){
            this.createInventorySlot(inventory[i]);
        }
    }
    createInventorySlot(item){
        const slot = createElement('div', 'inventory-slot');
        const slotData = createElement('img', 'inventory-slot-data');
        slotData.src = item.imageSrc;
        slot.appendChild(slotData);
        this.inventoryContainer.appendChild(slot);
        slotData.id = item.itemId;
    }
    createEquippedItemSlots(entity){
        this.screen.querySelectorAll('.character-summary-equipped-slot').forEach((node)=>{
            node.remove();
        });
        let equipmentSlots = Object.keys(entity.equipment);
        for(let i = 0; i < equipmentSlots.length; i++){
            const slot = createElement('div', `character-summary-equipped-slot ${equipmentSlots[i]}`);
            const slotData = createElement('img', 'inventory-slot-data');
            if(entity.equipment[equipmentSlots[i]] != ''){
                slotData.src = entity.equipment[equipmentSlots[i]].imageSrc;
                slotData.id = entity.equipment[equipmentSlots[i]].itemId;
            }else{
                switch(equipmentSlots[i]){
                    default:
                        slotData.removeAttribute('id');
                        //slotData.src = 'assets/media/icons/cancel.png';
                        break;
                }
            }
            slot.appendChild(slotData);
            this.equippedContainer.appendChild(slot);
            
        }
        
        //create a slot for each equipment slot in entity //This will be different for dog and humanoid
    }
}