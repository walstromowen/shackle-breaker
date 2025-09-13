import { loadCanvasImages, createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';

export default class BattleView{
    constructor(){
        this.screen = document.getElementById('battle-screen');
        this.allyContainer = document.getElementById('ally-party-display');
        this.hostileContainer = document.getElementById('hostile-party-display');
        this.abilityTab = document.getElementById('battle-controls-abilities-tab');
        this.itemsTab = document.getElementById('battle-controls-items-tab');
        this.statsTab = document.getElementById('battle-controls-stats-tab');
        this.battleControlsContainer = document.getElementById('battle-controls-container');
        this.battleConfirmTargetsContainer = document.getElementById('battle-confirm-targets-container');
        this.battleConsole = document.getElementById('battle-console');
        this.battleConsoleContent = document.getElementById('battle-console-content');
    
    }
    createActiveCombatantCards(activeCombatants){
        activeCombatants.forEach((combatant)=>{
            this.createCombatantCard(combatant)
        });
    }
    createCombatantCard(combatant){
        const combatantCard = createElement('div', 'battle-character-card');
            const cardHeader = createElement('h3', 'battle-character-slot-name-header');
            const allVitalBarsContainer = createElement('div', 'battle-all-vital-bars-container');

                const statusIconContainer = createElement('div', 'battle-status-icon-container');

                const healthBarContainer = createElement('div', 'battle-vital-bar-container');
                    const healthProgress = createElement('div', 'battle-vital-bar-progress health-color battle-health-progress');
                    const healthLabelContainer = createElement('div', 'battle-vital-label-container');
                        const healthIcon = createElement('img', 'icon health-icon');
                        const healthLabel = createElement('p', 'battle-vital-label');
                    const currentHealth = createElement('p', 'battle-current-vital-label battle-current-health');

                const staminaBarContainer = createElement('div', 'battle-vital-bar-container');
                    const staminaProgress = createElement('div', 'battle-vital-bar-progress stamina-color battle-stamina-progress');
                    const staminaLabelContainer = createElement('div', 'battle-vital-label-container');
                        const staminaIcon = createElement('img', 'icon stamina-icon');
                        const staminaLabel = createElement('p', 'battle-vital-label');
                    const currentStamina = createElement('p', 'battle-current-vital-label battle-current-stamina');

                const magicBarContainer = createElement('div', 'battle-vital-bar-container');
                    const magicProgress = createElement('div', 'battle-vital-bar-progress magic-color battle-magic-progress');
                    const magicLabelContainer = createElement('div', 'battle-vital-label-container');
                        const magicIcon = createElement('img', 'icon magic-icon');
                        const magicLabel = createElement('p', 'battle-vital-label');
                    const currentMagic = createElement('p', 'battle-current-vital-label battle-current-magic');

        combatantCard.appendChild(cardHeader);
        combatantCard.appendChild(allVitalBarsContainer);
        allVitalBarsContainer.appendChild(statusIconContainer)
        allVitalBarsContainer.appendChild(healthBarContainer)
        allVitalBarsContainer.appendChild(staminaBarContainer)
        allVitalBarsContainer.appendChild(magicBarContainer)
        healthBarContainer.appendChild(healthProgress);
        healthBarContainer.appendChild(healthLabelContainer);
        healthBarContainer.appendChild(currentHealth);
        healthLabelContainer.appendChild(healthIcon);
        healthLabelContainer.appendChild(healthLabel);
        
        staminaBarContainer.appendChild(staminaProgress);
        staminaBarContainer.appendChild(staminaLabelContainer);
        staminaBarContainer.appendChild(currentStamina);
        staminaLabelContainer.appendChild(staminaIcon);
        staminaLabelContainer.appendChild(staminaLabel);

        magicBarContainer.appendChild(magicProgress);
        magicBarContainer.appendChild(magicLabelContainer);
        magicBarContainer.appendChild(currentMagic);
        magicLabelContainer.appendChild(magicIcon);
        magicLabelContainer.appendChild(magicLabel);

        combatantCard.id = combatant.battleId;
        if(combatant.size == 'large'){
            combatantCard.classList.add('large-combatant-card')
        }
        this.addEntraceAnimation(combatant, combatantCard, true)
        
        this.updateCombatantStats(combatant);
    }
    addEntraceAnimation(combatant, combatantCard, willAdd){
        if(combatant.isHostile == false){
            if(willAdd == true){
                this.allyContainer.appendChild(combatantCard);
            }
           
            combatantCard.classList.add('battle-ally-enter-battle');
        }else{
            if(willAdd == true){
                this.hostileContainer.appendChild(combatantCard);
            }
            combatantCard.classList.add('battle-hostile-enter-battle');
        }
    }
    updateCombatantStats(combatant){
        const card = document.getElementById(combatant.battleId);
        card.style.backgroundImage = `url(${combatant.appearance})`;
        card.querySelector('.battle-character-slot-name-header').innerText = capiltalizeAllFirstLetters(combatant.name);
        card.querySelector('.battle-health-progress').style.width = Math.floor(combatant.currentHP/combatant.maxHP*100) + "%";
        card.querySelector('.health-icon').src = './assets/media/icons/hearts.png';
        card.querySelector('.battle-current-health').innerText = combatant.currentHP;
        card.querySelector('.battle-stamina-progress').style.width = Math.floor(combatant.currentStamina/combatant.maxStamina*100) + "%";
        card.querySelector('.stamina-icon').src = './assets/media/icons/despair.png';
        card.querySelector('.battle-current-stamina').innerText = combatant.currentStamina;
        card.querySelector('.battle-magic-progress').style.width = Math.floor(combatant.currentMagic/combatant.maxMagic*100) + "%";
        card.querySelector('.magic-icon').src = './assets/media/icons/crystalize.png';
        card.querySelector('.battle-current-magic').innerText = combatant.currentMagic;
        this.updateStatusIcons(card, combatant);
        if(combatant.size == 'large'){
           card.classList.add('large-combatant-card')
        }else{
            card.classList.remove('large-combatant-card')
        }
    }
    updateStatusIcons(card, combatant){
        Array.from(card.getElementsByClassName('battle-status-icon')).forEach((icon)=>{
            icon.remove();
        });
        let statusContainer = card.querySelector('.battle-status-icon-container')
        for(let i = 0; i < combatant.statusArray.length; i++){
            if(combatant.statusArray[i].iconSrc){
                let statusIcon = createElement('img', 'battle-status-icon'); 
                statusIcon.src = combatant.statusArray[i].iconSrc;
                statusContainer.append(statusIcon);
            }
        }
        
    }
    updateMultipleCombatantStats(affected){
        for(let i = 0; i < affected.length; i++){
            this.updateCombatantStats(affected[i]);
        }
    }
    switchTab(tabId){
        Array.from(document.getElementsByClassName('battle-controls-tab')).forEach((tab)=>{
            if(tab.id == tabId){
                tab.style.display='flex';
            }else{
                tab.style.display='none';
            }
        });
    }
    createCombatantAbilityButtons(combinedAbilities, location){
        let abilityButtons = [];
        for(let i = 0; i < combinedAbilities.length; i++){
            abilityButtons.push(this.createAbilityButton(combinedAbilities[i], location))
        }
        return abilityButtons;
    }
    createAbilityButton(ability, location){
        const abilityButton = createElement('div', 'battle-ability-button');
        /*
        let damageTypes = '';
        for(let i = 0; i < ability.damageTypes.length; i++){
            damageTypes += ability.damageTypes[i]
        }
        switch(damageTypes){
            case 'blunt':
            //abilityButton.style.backgroundImage = `url(${ability.iconSrc})`;
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), linear-gradient(steelblue, darkslategrey)`;
                break;
            case 'pierce':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), linear-gradient(crimson, darkslategrey)`;
                break;
            case 'arcane':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), linear-gradient(magenta, navy)`;
                break;
            case 'elemental':
                let damageSubTypes = '';
                for(let j = 0; j < ability.damageSubTypes.length; j++){
                    damageTypes += ability.damageSubTypes[j]
                }
                switch(damageSubTypes){
                    case 'fire':
                        abilityButton.style.backgroundImage = `url(${ability.iconSrc}), linear-gradient(navy, orangered, forestgreen)`;
                    break
                    case 'eletric':
                        abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(navy, orangered, forestgreen)`;
                    break
                    case 'ice':
                        abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(navy, orangered, forestgreen)`;
                    break
                    case 'earth':
                        abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(navy, orangered, forestgreen)`;
                    break
                    case 'wind':
                }
                break;
            case 'bluntpierce':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(steelblue, darkslategrey, darkslategrey, steelblue)`;
                break;
            case 'bluntarcane':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(darkgrey, magenta, darkgrey)`;
                break;
            case 'bluntelemental':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(darkgrey, whitesmoke, darkgrey)`;
                break;
            case 'piercearcane':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(orange, magenta, orange)`;
                break;
            case 'pierceelemental':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(orange, whitesmoke, orange)`;
                break;
            case 'arcaneelemetnal':
                abilityButton.style.backgroundImage = `url(${ability.iconSrc}), conic-gradient(magenta, whitesmoke, magenta)`;
                break;
            default:
                abilityButton.style.backgroundImage = `url(${ability.iconSrc})`;
        }
                */
        abilityButton.style.backgroundImage = ability.background;
        if(location == 'equipment'){
            this.abilityTab.appendChild(abilityButton);
        }else{
            this.itemsTab.appendChild(abilityButton);
        }
        return abilityButton;
    }
    removeEntranceAnimations(){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.remove('battle-ally-enter-battle');
            card.classList.remove('battle-hostile-enter-battle');
        });
    }
    removeCardTargets(){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            this.removeTargeted(card, 3)
        });
    }
    highlightAttacker(battleId){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            if(battleId == card.id){
                card.classList.add('selected');
            }
        });
    }
    highlightPossibleTargets(battleId){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.add('possible-target');
        });
    }
    removeAttackerHighlight(battleId){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.remove('selected');
        });
    }
    removePossibleTargets(battleId){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.remove('possible-target');
        });
    }
    removeAbilityButtons(){
        Array.from(document.getElementsByClassName('battle-ability-button')).forEach((button)=>{
            button.remove();
        });
    }
    removeConsumableAbilityButtons(){
        Array.from(document.getElementsByClassName('battle-consumable-ability-button')).forEach((button)=>{
            button.remove();
        });
    }
    removeAbilityHighlight(){
        Array.from(document.getElementsByClassName('battle-ability-button')).forEach((button)=>{
            button.classList.remove('selected');
        });
    }
    printToBattleConsole(message){
        this.battleConsoleContent.innerText = message;
        this.battleConsoleContent.classList.remove('typing-animation');
        this.battleConsoleContent.offsetWidth;
        this.battleConsoleContent.classList.add('typing-animation');
    }
    removeCombatantCard(battleId){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            if(card.id == battleId){
                card.remove(); 
            }
        });
    }
    removeAllCombatantCards(){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.remove(); 
        })
    }
    playAbilityAnimations(attacker, targets, resolveObject){
        //update CSS
        let root = document.querySelector(':root');
        root.style.setProperty('--battle-attacker-animation', attacker.nextAbility.attackerAnimation);
        root.style.setProperty('--battle-target-animation', attacker.nextAbility.targetAnimation);
        root.style.setProperty('--battle-ability-animation', attacker.nextAbility.abilityAnimation);
        root.style.setProperty('--battle-ability-animation-image', `url(${attacker.nextAbility.abilityAnimationImage})`);
        root.style.setProperty(' --battle-ability-animation-duration', attacker.nextAbility.abilityAnimationDuration);
        
        //get attacker card
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            if(card.id == attacker.battleId){
                let attackerCard = card;
                if(attacker === targets[0]){

                }else{
                    attackerCard.classList.add('battle-attacker-animation');
                }
            }
        });

        //get target cards 
        for(let i = 0; i < targets.length; i++){
            let isImmune = false;
            for(let j = 0; j < attacker.nextAbility.damageTypes.length; j++){
                for(let k = 0; k < targets[i].immunities.length; k++){
                    if(attacker.nextAbility.damageTypes[j] == targets[i].immunities[k]){
                        isImmune = true;
                        break;
                    }
                }
                if(isImmune){
                    break;
                }
            }
            let targetCard;
            Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
                if(card.id == targets[i].battleId){
                    targetCard = card;
                    if(resolveObject.evade){
                        root.style.setProperty('--battle-ability-animation', 'none');
                        root.style.setProperty('--battle-ability-animation-image', 'none');
                        if(targets[i].isHostile == false){
                            root.style.setProperty('--battle-target-animation', 'ally-evade');
                        }else{
                            root.style.setProperty('--battle-target-animation', 'hostile-evade');
                        }
                    }
                    if(isImmune){
                        targetCard.classList.add('battle-target-immune-animation');
                    }else{
                        targetCard.classList.add('battle-target-animation');
                    }
                }
            });
        }
        playSoundEffect(attacker.nextAbility.soundEffectSrc);
    }
    removeAbilityAnimations(){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.remove('battle-attacker-animation');
            card.classList.remove('battle-target-animation');
            card.classList.remove('battle-target-immune-animation');
        });
    }
    playStatusAnimation(status){
        let holderCard;
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            if(card.id == status.holder.battleId){
                holderCard = card;
            }
        });
        let root = document.querySelector(':root');
        root.style.setProperty('--battle-target-animation', status.targetAnimation);
        root.style.setProperty('--battle-ability-animation', status.abilityAnimation);
        root.style.setProperty('--battle-ability-animation-image', `url(${status.abilityAnimationImage})`);
        root.style.setProperty(' --battle-ability-animation-duration', status.abilityAnimationDuration);

        holderCard.classList.add('battle-target-animation');
        playSoundEffect(status.soundEffectSrc);
    }
    playFormChangeAnimations(target){
        let root = document.querySelector(':root');
        root.style.setProperty('--battle-target-animation', target.nextForm.animation);
        root.style.setProperty(' --battle-ability-animation-duration', target.nextForm.animationDuration);
        root.style.setProperty('--battle-ability-animation-image', 'none');
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            if(card.id == target.battleId){
                let targetCard = card;
                targetCard.classList.add('battle-target-animation');
            }
        });
    }
    removeStatusAnimations(){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.remove('battle-target-animation');
        });
    }
    replaceCombatantCard(combatant, newCombatant, addDefaultAnimaiton){
        const card = document.getElementById(combatant.battleId);
        card.style.backgroundImage = `url(${newCombatant.appearance})`;
        card.querySelector('.battle-character-slot-name-header').innerText = capiltalizeAllFirstLetters(newCombatant.name);
        card.querySelector('.battle-health-progress').style.width = Math.floor(newCombatant.currentHP/newCombatant.maxHP*100) + "%";
        card.querySelector('.health-icon').src = './assets/media/icons/hearts.png';
        card.querySelector('.battle-current-health').innerText = newCombatant.currentHP;
        card.querySelector('.battle-stamina-progress').style.width = Math.floor(newCombatant.currentStamina/newCombatant.maxStamina*100) + "%";
        card.querySelector('.stamina-icon').src = './assets/media/icons/despair.png';
        card.querySelector('.battle-current-stamina').innerText = newCombatant.currentStamina;
        card.querySelector('.battle-magic-progress').style.width = Math.floor(newCombatant.currentMagic/newCombatant.maxMagic*100) + "%";
        card.querySelector('.magic-icon').src = './assets/media/icons/crystalize.png';
        card.querySelector('.battle-current-magic').innerText = newCombatant.currentMagic;
        this.updateStatusIcons(card, newCombatant);
        card.id = newCombatant.battleId;
        if(addDefaultAnimaiton){
            this.addEntraceAnimation(combatant, card, false);
        }
    }
    glowRed(combatant, lackingResources){
        const card = document.getElementById(combatant.battleId);
        for(let i = 0; i < lackingResources.length; i++){
            if(lackingResources[i] == 'stamina'){
                card.querySelector('.battle-current-stamina').classList.add('glow-red')
            }
            if(lackingResources[i] == 'magic'){
                card.querySelector('.battle-current-magic').classList.add('glow-red')
            }
        }
       
    }
    removeGlowRed(combatant){
        const card = document.getElementById(combatant.battleId);
        card.querySelector('.battle-current-stamina').classList.remove('glow-red');
        card.querySelector('.battle-current-magic').classList.remove('glow-red');
        card.offsetWidth;
    }
    addTargeted(selectedCard){
        if(selectedCard.classList.contains('targeted')){
            selectedCard.classList.remove('targeted')
            selectedCard.classList.add('targeted-twice')
            return;
        }
        if(selectedCard.classList.contains('targeted-twice')){
            selectedCard.classList.remove('targeted-twice')
            selectedCard.classList.add('targeted-thrice')
            return;
        }
        selectedCard.classList.add('targeted')
    }
    removeTargeted(selectedCard, count){
        if(count == 1){
            if(selectedCard.classList.contains('targeted-thrice')){
                selectedCard.classList.remove('targeted-thrice');
                selectedCard.classList.add('targeted-twice');
                return;
            }
            if(selectedCard.classList.contains('targeted-twice')){
                selectedCard.classList.remove('targeted-twice');
                selectedCard.classList.add('targeted');
                return;
            }
            selectedCard.classList.remove('targeted');
        }else{
            selectedCard.classList.remove('targeted-thrice');
            selectedCard.classList.remove('targeted-twice');
            selectedCard.classList.remove('targeted');
        }
    }
}


