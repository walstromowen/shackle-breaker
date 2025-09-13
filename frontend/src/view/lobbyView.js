import {createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';

export default class LobbyView{
    constructor(){
        this.screen = document.getElementById('lobby-screen');
        this.backgroundDescription = document.getElementById('lore-description-background');
        this.originDescription = document.getElementById('lore-description-origin');
    
        this.appearanceImage = document.getElementById('lobby-appearance-image');
        
        this.gold = document.getElementById('lobby-gold');

        this.level = document.getElementById('lobby-level');
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

        this.corruption = document.getElementById('lobby-corruption');

        this.lobbyNameSelection = document.getElementById('lobby-name-selection');
        this.lobbyInventory = document.getElementById('lobby-inventory');
        this.appearanceSelection = document.getElementById('lobby-appearance-selection');
        this.backgroundSelection = document.getElementById('lobby-background-selection');
        this.originSelection = document.getElementById('lobby-origin-selection');
        this.keepsakeSelection = document.getElementById('lobby-keepsake-selection');
        this.companionSelection = document.getElementById('lobby-companion-selection');
        this.difficultySelection = document.getElementById('lobby-difficulty-selection');

    }
    updateAppearance(src){
        this.appearanceImage.src = src;
    }
    updateInventory(equipment, partyInventory){
        this.lobbyInventory.querySelectorAll('.inventory-slot').forEach((node)=>{
            node.remove();
        });
        let twoHandCount = 0;
        for(let i = 0; i < equipment.length; i++){
            if(equipment[i].itemSubset == 'attachable'){
                if(twoHandCount >= 1 && equipment[i].slot == 'twoHand'){
                    //skip
                }else{
                    this.createInventorySlot(equipment[i]);
                    if(equipment[i].slot == 'twoHand'){
                        twoHandCount++;
                    }
                }
            } 
        }
        for(let i = 0; i < partyInventory.length; i++){
            this.createInventorySlot(partyInventory[i]);
        }
    }
    createInventorySlot(item){
        const slot = createElement('div', 'inventory-slot');
        const slotData = createElement('div', 'inventory-slot-data');
        slotData.style.backgroundImage = `url(${item.imageSrc})`;
        slot.appendChild(slotData);
        this.lobbyInventory.appendChild(slot);
        slotData.draggable = false;

    }
    updateAttributes([level, vigor, strength, dexterity, intelligence, attunement]){
        this.level.innerText = level;
        this.vigor.innerText = vigor;
        this.strength.innerText = strength;
        this.dexterity.innerText = dexterity;
        this.intelligence.innerText = intelligence;
        this.attunement.innerText = attunement;
    }
    updateStats([currentHP, currentStamina, currentMagic, currentHpRecovery, currentStaminaRecovery, currentMagicRecovery, currentBluntAttack, currentPierceAttack,
                 currentArcaneAttack, currentElementalAttack, currentBluntDefense, currentPierceDefense, currentArcaneDefense, currentElementalDefense, 
                 currentBluntResistance, currentPierceResistance, currentArcaneResistance, currentElementalResistance,
                 currentSpeed, currentEvasion, currentCritical, currentCorruption]){
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
        this.corruption.innerText = currentCorruption;
    }
    updateGold(gold){
        this.gold.innerText = gold;
    }
    updateLore(){
        let background = document.getElementById('lobby-background-selection').value;
        let origin = document.getElementById('lobby-origin-selection').value;
        switch(background){
            case 'traveler':
                this.backgroundDescription.innerText = 'Travelers from far and wide came to see the incredible discovery of what was magic in the Altus Kingdom. Those first to arive were amazed by what they saw. Those last to arrive were horrified.';
                break;
            case 'blacksmith':
                this.backgroundDescription.innerText = 'The honest trade of blacksmithing is a profession that was held in high esteem by Alterians, and Panzerians alike. After the discovery of magic, most blacksmiths found themselves unable to find work, but with their sanity intact.' ;
                break;
            case 'ranger':
                this.backgroundDescription.innerText = "Not all were enamored with the discovery of magic. A select few of the populance sought an escape from the people's obsession of it. Many of those that left became rangers, hunting wild animals and later more unnatural things.";
                break;
            case 'scholar':
                this.backgroundDescription.innerText = 'Almost overnight, the scholars and philosophers of the Altus kingdom abandoned their studies to begin research of magic. Some saw magic as a science, others as life itself.';
                break;
            case 'warrior':
                this.backgroundDescription.innerText = 'For generations, warriors have been respected for their power. Only recently have some become feared for it.';
                break;
            case 'thief':
                this.backgroundDescription.innerText = 'Many thought the discovery of magic would mark the end of thievery and poverty. Alas, it only made it easier.' ;
                break;
            case 'hermit':
                this.backgroundDescription.innerText = 'Most of those who studied magic wished to stay as close to the artifact as possible. However, for better or for worse, a handful decided to study magic in solitude.';
                break;
            case 'farmer':
                this.backgroundDescription.innerText = 'While the discovery of magic dramatically changed the populations of big cities, those tending to their fields expereienced little change. As a result, these men and women were most prepared when the Altus kingdom fell.';
                break;
            case 'bounty-hunter':
                this.backgroundDescription.innerText = 'During the years leading up to the fall of Altus Kingdom, The demand for bounty hunters increased dramatically due to the need to deal with those who went mad. Particuarily skilled hunters often weilded rare weapons such as panzerian firearms or special Alterian swords. Ironically, this also made them particularly difficult to hunt when they too went mad.';
                break;
            case 'diseased':
                this.backgroundDescription.innerText = `During the years of the Alterian-Panzerian War, and prior to the fall of Altus Kingdom, those exhibiting signs of madness were often taken from their homes for treatment. It was believed that magic held the key to curing the the buildup of madness and thus, patients were exposed to even more of the artifact's influence. Still, perhaps being aflicted has its advantages?`;
                break;
                                   
        }
        switch(origin){
            case 'alterian':
                this.originDescription.innerText = "Alterians are the oldest people of the known world and the first to discover magic. They are a fearless and adventurous people who hail from the ancient Altus kingdom. Despite their reputation as conquerors, Alterians are actually quite diplomatic. They value strength, honor, and loyalty to one's family. Or at least, they use to.";
                break;
            case 'panzerian':
                this.originDescription.innerText = 'Panzerians are a creative and powerful people from the icy mountains of Panzeria. They are master engineers who have acomplished a variety of impressive technolgical and architectural feats. Most notably being their weapons of war including cannons, genetically engineered beasts, and the famous Panzerian armor. All of which were eventually used against them. ';
                break;
            case 'namuh':
                this.originDescription.innerText = 'The Namuh are a silent and mysterious people who communicate only through a form sign language. Not much is known about the Namuh people except for rumors, many of which speaking of a great tragedy befalling the Namuh people and the becoming of a shadow of their former selves.';
                break;                                 
        }
    }
    resetInputs(){
        this.lobbyNameSelection.value = '';
        this.appearanceSelection.selectedIndex = 0;
        this.backgroundSelection.selectedIndex = 0;
        this.originSelection.selectedIndex = 0;
        this.keepsakeSelection.selectedIndex = 0;
        this.companionSelection.selectedIndex = 0;
        this.difficultySelection.selectedIndex = 1;
        this.appearanceImage.src = appearanceSelection.options[0].value; 
    }
}

        