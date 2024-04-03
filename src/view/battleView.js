import { loadCanvasImages, createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';

export default class BattleView{
    constructor(){
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

                const heatlhBarContainer = createElement('div', 'battle-vital-bar-container');
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
        allVitalBarsContainer.appendChild(heatlhBarContainer)
        allVitalBarsContainer.appendChild(staminaBarContainer)
        allVitalBarsContainer.appendChild(magicBarContainer)
        heatlhBarContainer.appendChild(healthProgress);
        heatlhBarContainer.appendChild(healthLabelContainer);
        heatlhBarContainer.appendChild(currentHealth);
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

        if(combatant.isHostile == false){
            this.allyContainer.appendChild(combatantCard);
            combatantCard.classList.add('battle-ally-enter-battle');
        }else{
            this.hostileContainer.appendChild(combatantCard);
            combatantCard.classList.add('battle-hostile-enter-battle');
        }
        this.updateCombatantStats(combatant);
    }
    updateCombatantStats(combatant){
        const card = document.getElementById(combatant.battleId);
        card.style.backgroundImage = `url(${combatant.apperance})`;
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
    createCombatantAbilityButtons(combatant){
        let abilityButtons = [];
        for(let i = 0; i < combatant.abilityArray.length; i++){
            abilityButtons.push(this.createAbilityButton(combatant.abilityArray[i]))
        }
        return abilityButtons;
    }
    createAbilityButton(ability){
        const abilityButton = document.createElement('img');
        abilityButton.src = ability.iconSrc;
        abilityButton.classList.add('battle-ability-button');
        this.abilityTab.appendChild(abilityButton);
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
            card.classList.remove('targeted');
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
                card.classList.add('disappear');
                setTimeout(()=>{
                    card.remove();
                },2000)
                
            }
        });
    }
    playAbilityAnimations(attacker, targets){
        let attackerCard;
        let root = document.querySelector(':root');
        root.style.setProperty('--ability-animation-image', `url(${attacker.nextAbility.iconSrc})`);
        root.style.setProperty('--ability-animation-name', attacker.nextAbility.animationName);
        root.style.setProperty(' --ability-animation-duration', attacker.nextAbility.animationDuration);
        if(attacker.isHostile == false){
            root.style.setProperty('--animate-attacker-name', 'ally-attack');
        }else{
            root.style.setProperty('--animate-attacker-name', 'hostile-attack');
        }
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            if(card.id == attacker.battleId){
                attackerCard = card;
            }
        });
        for(let i = 0; i < targets.length; i++){
            let targetCard;
            Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
                if(card.id == targets[i].battleId){
                    targetCard = card;
                }
            });
            targetCard.classList.add('animate-target');
        }
        attackerCard.classList.add('animate-attacker');
        playSoundEffect(attacker.nextAbility.soundEffectSrc);
    }
    removeAbilityAnimations(){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.remove('animate-target');
            card.classList.remove('animate-attacker');
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
        root.style.setProperty('--ability-animation-image', `url(${status.iconSrc})`);
        root.style.setProperty('--ability-animation-name', status.animationName);
        root.style.setProperty(' --ability-animation-duration', status.animationDuration);
        
        holderCard.classList.add('animate-target');
        playSoundEffect(status.soundEffectSrc);
    }
    removeStatusAnimations(){
        Array.from(document.getElementsByClassName('battle-character-card')).forEach((card)=>{
            card.classList.remove('animate-target');
        });
    }
}
