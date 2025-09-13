import {playSoundEffect, playMusic} from '../utility.js';

export default class CharacterSummaryController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.inventoryMiniMenuExitEventHandler;
        this.inventoryMiniMenuUseButtonHandler;
        this.inventoryMiniMenuUpgradeButtonHandler;
        this.inventoryMiniMenuScrapButtonHandler;
        this.vigorIncreaseHandler;
        this.strengthIncreaseHandler;
        this.dexterityIncreaseHandler;
        this.intelligenceIncreaseHandler;
        this.attunementIncreaseHandler;

        this.initialize();
    }
    initialize(){
        document.getElementById('character-summary-toggle-party-button').addEventListener('click', ()=>{
            this.props.switchScreen('party-screen');
            document.getElementById('sound-effect-player').src = './assets/audio/soundEffects/cinematic-boom-6872.mp3';
            document.getElementById('sound-effect-player').play();
        });
        this.view.inventoryPannel.addEventListener('dragover', (e)=>{ 
            e.preventDefault();
            e.stopPropagation();
        });
        this.view.inventoryPannel.addEventListener('dragenter', (e)=>{ 
            e.preventDefault();
            e.stopPropagation();
        });
        this.view.inventoryPannel.addEventListener('dragleave', (e)=>{ 
            e.preventDefault();
            e.stopPropagation();
        });
        this.view.inventoryPannel.addEventListener('drop', (e)=>{ 
            e.preventDefault();
            e.stopPropagation();
            let draggedData = document.getElementsByClassName('dragging')[0];
            if(draggedData.id != undefined){
                let equippedItemSlotType = this.model.getInventoryItemSlotTypeFromClassList(draggedData.parentNode.classList)
                if(equippedItemSlotType == 'inventory-slot'){//push item to back of inventory
                    this.model.pushInventoryItemToInventoryEnd(draggedData.id)
                }else{
                    this.model.unequipAttatchable(equippedItemSlotType)
                }
                this.onSwitchScreen();
            }
        });
        this.view.previousCharacterButton.addEventListener('click', ()=>{
            this.model.updateCurrentCharacter('previous')
            this.onSwitchScreen();
        })
        this.view.nextCharacterButton.addEventListener('click', ()=>{
            this.model.updateCurrentCharacter('next')
            this.onSwitchScreen();
        })
    }
    onSwitchScreen(){
        this.model.currentCharacter.awardSkillPoints();
        this.view.displayCharacterSummary(this.model.currentCharacter, this.model.props.getGold());
        this.view.createInventorySlots(this.model.props.getInventory());
        this.view.createEquippedItemSlots(this.model.currentCharacter);
        this.removeAttrubuteIncreaseListeners();
        this.view.hideAttributeUpgradeButtons();
        if(this.model.props.getSituation() == 'overworld'){
            if(this.model.currentCharacter.skillPoints > 0){
                document.getElementById('vigor-increase-button').addEventListener('click', this.vigorIncreaseHandler = ()=>{
                    this.model.increaseAttribute('vigor');
                    this.onSwitchScreen();
                });
                document.getElementById('strength-increase-button').addEventListener('click', this.strengthIncreaseHandler = ()=>{
                    this.model.increaseAttribute('strength');
                    this.onSwitchScreen();
                });
                document.getElementById('dexterity-increase-button').addEventListener('click', this.dexterityIncreaseHandler = ()=>{
                    this.model.increaseAttribute('dexterity');
                    this.onSwitchScreen();
                });
                document.getElementById('intelligence-increase-button').addEventListener('click', this.intelligenceIncreaseHandler = ()=>{
                    this.model.increaseAttribute('intelligence');
                    this.onSwitchScreen();
                });
                document.getElementById('attunement-increase-button').addEventListener('click', this.attunementIncreaseHandler = ()=>{
                    this.model.increaseAttribute('attunement');
                    this.onSwitchScreen();
                });
                this.view.revealAttributeUpgradeButtons();
            }
        }

        //slots
        this.addSlotDragListeners(this.view.screen.querySelectorAll('.character-summary-equipped-slot'), 'equipSlots');
        this.addSlotDragListeners(this.view.screen.querySelectorAll('.inventory-slot'), 'inventorySlots');
        //slotData
        this.view.screen.querySelectorAll('.inventory-slot-data').forEach((node)=>{
            if(this.model.props.getSituation() == 'overworld'){
                node.addEventListener('dragstart', ()=>{ 
                    node.classList.add('dragging');
                    document.getElementById('inventory-mini-menu').style.display = 'none';
                    
                });
                node.addEventListener('dragend', ()=>{
                    node.classList.remove('dragging');
                });
                //MOBILE TODO
                let touchCoordinates = [null, null];
                let timer;
                node.addEventListener('touchstart', (e)=>{ 
                    timer = setTimeout(()=>{
                        node.classList.add('dragging');
                        document.getElementById('inventory-mini-menu').style.display = 'none';
                        let touchLocation = e.targetTouches[0];    
                        let clone = node.cloneNode(true);
                        clone.classList.add('clone');
                        clone.style.position = 'absolute';
                        clone.style.left = touchLocation.pageX - e.target.clientWidth/2 + 'px';
                        clone.style.top = touchLocation.pageY - e.target.clientHeight/2 + 'px';
                        this.view.screen.append(clone);
                    },1000)
                });
                node.addEventListener('touchmove',  (e)=>{ 
                    e.preventDefault();
                    
                    if(document.getElementsByClassName('clone')[0]){
                        let clone = document.getElementsByClassName('clone')[0];
                        let touchLocation = e.targetTouches[0];  
                        clone.style.left = touchLocation.pageX - e.target.clientWidth/2 + 'px';
                        clone.style.top = touchLocation.pageY - e.target.clientHeight/2 + 'px';           
                        touchCoordinates = [touchLocation.pageX, touchLocation.pageY];
                    }
                });
                node.addEventListener('touchend',  (e)=>{
                    if(document.getElementsByClassName('clone')[0]){
                        let clone = document.getElementsByClassName('clone')[0];
                        let touchLocations = document.elementsFromPoint(touchCoordinates[0], touchCoordinates[1]);
                        touchCoordinates = [null, null];
                        for(let i = 0; i < touchLocations.length; i++){
                            if(touchLocations[i].classList.contains('character-summary-equipped-slot' || 'inventory-slot') || touchLocations[i].id == 'character-summary-inventory-container'){
                                let event = new Event('drop');
                                touchLocations[i].dispatchEvent(event)
                                break;
                            }
                        }
                        clone.remove();
                    }
                    clearInterval(timer);
                });
            }
             //MOBILE
            node.addEventListener('mouseenter', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                //remove event listeners from mini-menu buttons
                document.getElementById('inventory-mini-menu-consumable-use-button').removeEventListener('click', this.inventoryMiniMenuUseButtonHandler);
                document.getElementById('inventory-mini-menu-attatchable-upgrade-button').removeEventListener('click', this.inventoryMiniMenuUpgradeButtonHandler);
                document.getElementById('inventory-mini-menu-scrap-button').removeEventListener('click', this.inventoryMiniMenuScrapButtonHandler);
                if(node.parentNode.classList.contains('character-summary-equipped-slot')){
                    let slot = this.model.getInventoryItemSlotTypeFromClassList(node.parentNode.classList);
                    if(this.model.currentCharacter.equipment[slot] != ''){
                        let item = this.model.currentCharacter.equipment[slot];
                        document.getElementById('inventory-mini-menu-consumable-use-button').style.display = 'none';
                        document.getElementById('inventory-mini-menu-scrap-button').style.display = 'none';
                        if(this.model.props.getSituation() == 'overworld'){
                            document.getElementById('inventory-mini-menu-attatchable-upgrade-button').style.display = 'block';
                            document.getElementById('inventory-mini-menu-attatchable-upgrade-button').addEventListener('click', this.inventoryMiniMenuUpgradeButtonHandler = ()=>{
                                if(this.model.props.getGold() >= Math.floor(item.price*1.5)){
                                    this.model.props.setGold(this.model.props.getGold() - Math.floor(item.price*1.5))
                                    this.model.currentCharacter.subtractAttachableStats([this.model.getInventoryItemSlotTypeFromClassList(node.parentNode.classList)]);
                                    item.upgrade(1);
                                    this.model.currentCharacter.addAttachableStats([this.model.getInventoryItemSlotTypeFromClassList(node.parentNode.classList)]);
                                    this.props.updateMiniMenu(item, this.model.currentCharacter);
                                    this.onSwitchScreen();
                                    playSoundEffect('./assets/audio/soundeffects/mixkit-metal-medieval-construction-818.wav');
                                }
                            });
                        }else{
                            document.getElementById('inventory-mini-menu-attatchable-upgrade-button').style.display = 'none';
                        }
                        this.props.updateMiniMenu(item, this.model.currentCharacter);
                    }else{
                        document.getElementById('inventory-mini-menu').style.display = 'none';
                        return;
                    }
                }else{
                    let item = this.model.getInventoryItemFromItemId(node.id);
                    if(this.model.props.getSituation() == 'overworld' ){
                        document.getElementById('inventory-mini-menu-scrap-button').style.display = 'block';
                        document.getElementById('inventory-mini-menu-scrap-button').addEventListener('click', this.inventoryMiniMenuScrapButtonHandler = ()=>{
                            this.model.props.setGold(this.model.props.getGold() + Math.floor(item.price/4))
                            this.model.removeItemFromInventoryByItemId(item.itemId);
                            document.getElementById('inventory-mini-menu').style.display = 'none';
                            this.onSwitchScreen();
                            playSoundEffect('./assets/audio/soundeffects/mixkit-metal-medieval-construction-818.wav');
                            
                            
                        })
                    }
                    switch(item.itemSubset){
                        case 'attachable':
                            if(this.model.props.getSituation() == 'overworld'){
                                document.getElementById('inventory-mini-menu-attatchable-upgrade-button').style.display = 'block';
                                document.getElementById('inventory-mini-menu-attatchable-upgrade-button').addEventListener('click', this.inventoryMiniMenuUpgradeButtonHandler = ()=>{
                                    if(this.model.props.getGold() >= Math.floor(item.price*1.5)){
                                        this.model.props.setGold(this.model.props.getGold() - Math.floor(item.price*1.5))
                                        item.upgrade(1);
                                        this.props.updateMiniMenu(item, this.model.currentCharacter);
                                        this.onSwitchScreen();
                                        playSoundEffect('./assets/audio/soundeffects/mixkit-metal-medieval-construction-818.wav');
                                    }
                                    
                                })
                            }else{
                                document.getElementById('inventory-mini-menu-attatchable-upgrade-button').style.display = 'none';
                            }
                            document.getElementById('inventory-mini-menu-consumable-use-button').style.display = 'none';

                            break;
                        case 'consumable':
                            document.getElementById('inventory-mini-menu-attatchable-upgrade-button').style.display = 'none';
                            if(item.useSituations.includes(this.model.props.getSituation()) && this.model.props.getSituation() == 'overworld'){
                                document.getElementById('inventory-mini-menu-consumable-use-button').style.display = 'block';
                                document.getElementById('inventory-mini-menu-consumable-use-button').addEventListener('click', this.inventoryMiniMenuUseButtonHandler = ()=>{
                                    item.abilityArray[0].activate(this.model.currentCharacter, this.model.currentCharacter);
                                    playSoundEffect(item.abilityArray[0].soundEffectSrc);
                                    item.charges --;
                                    if(item.charges <= 0){
                                        this.model.removeItemFromInventoryByItemId(node.id);
                                        document.getElementById('inventory-mini-menu').style.display = 'none';
                                    }
                                    this.onSwitchScreen();
                                    
                                });
                            }else{
                                document.getElementById('inventory-mini-menu-consumable-use-button').style.display = 'none';
                            }
                            break;
                        case 'material':
                            if(this.model.props.getSituation() != 'overworld'){
                                document.getElementById('inventory-mini-menu-scrap-button').style.display = 'none';
                            }
                            document.getElementById('inventory-mini-menu-consumable-use-button').style.display = 'none';
                            document.getElementById('inventory-mini-menu-attatchable-upgrade-button').style.display = 'none';
                            break;
                    }
                    this.props.updateMiniMenu(item, this.model.currentCharacter);
                } 
                

                document.getElementById('inventory-mini-menu-overview-tab').style.display = 'flex';
                document.getElementById('inventory-mini-menu-stats-tab').style.display = 'none';
                document.getElementById('inventory-mini-menu-abilities-tab').style.display = 'none';
                let miniMenu = document.getElementById('inventory-mini-menu');
                miniMenu.style.display = 'flex';
                this.props.positionPopUpElement(miniMenu, node);
                this.view.screen.addEventListener('mouseover', this.inventoryMiniMenuExitEventHandler = (ev)=>{
                    let miniMenu = document.getElementById('inventory-mini-menu');
                    if(
                        (
                        ev.clientX < miniMenu.getBoundingClientRect().x ||
                        ev.clientX > miniMenu.getBoundingClientRect().x + miniMenu.getBoundingClientRect().width ||
                        ev.clientY < miniMenu.getBoundingClientRect().y ||
                        ev.clientY > miniMenu.getBoundingClientRect().y + miniMenu.getBoundingClientRect().height
                        )
                        &&
                        (
                            ev.clientX < node.getBoundingClientRect().x ||
                            ev.clientX > node.getBoundingClientRect().x + node.getBoundingClientRect().width ||
                            ev.clientY < node.getBoundingClientRect().y ||
                            ev.clientY > node.getBoundingClientRect().y + node.getBoundingClientRect().height
                        )
                    ){
                        this.view.screen.removeEventListener('mouseover', this.inventoryMiniMenuExitEventHandler);
                        miniMenu.style.display = 'none';
                    }
                });
            
            });
        });
        return Promise.resolve();
    }
    addSlotDragListeners(nodeList, dropLocation){
        nodeList.forEach((node)=>{
            if(this.model.props.getSituation() == 'overworld'){
                node.addEventListener('dragover', (e)=>{ 
                    e.preventDefault();
                    e.stopPropagation();
                });
                node.addEventListener('dragenter', (e)=>{ 
                    e.preventDefault();
                    e.stopPropagation();
                    node.classList.add('hover-brightness');
                });
                node.addEventListener('dragleave', (e)=>{ 
                    e.preventDefault();
                    e.stopPropagation();
                    node.classList.remove('hover-brightness');
                });
                node.addEventListener('drop', (e)=>{ 
                    e.stopPropagation();
                    let incomingItemSlotType; 
                    let outgoingItemSlotType;
                    let draggedData = document.getElementsByClassName('dragging')[0];
                    let exsistingData = node.getElementsByClassName('inventory-slot-data')[0];
                    //to equip
                    if(dropLocation == 'equipSlots'){
                        let inventoryItem
                        if(draggedData.parentNode.classList.contains('character-summary-equipped-slot')){//from equip
                            inventoryItem = this.model.currentCharacter.equipment[this.model.getInventoryItemSlotTypeFromClassList(draggedData.parentNode.classList)];
                           
                        }else{
                            inventoryItem = this.model.getInventoryItemFromItemId(draggedData.id)
                        }
                        if(inventoryItem.itemSubset == 'attachable'){
                            incomingItemSlotType = inventoryItem.slot;
                            outgoingItemSlotType = this.model.getInventoryItemSlotTypeFromClassList(exsistingData.parentNode.classList)
                            
                            if(incomingItemSlotType != outgoingItemSlotType){
                                if(
                                    (incomingItemSlotType == 'oneHand' && outgoingItemSlotType == 'mainHand') ||
                                    (incomingItemSlotType == 'oneHand' && outgoingItemSlotType == 'offhand') ||
                                    (incomingItemSlotType == 'twoHand' && outgoingItemSlotType == 'mainHand') ||
                                    (incomingItemSlotType == 'twoHand' && outgoingItemSlotType == 'offhand')
                                ){
                                    //skip
                                }else{
                                    return;
                                }
                            }
                            if(draggedData.parentNode.classList.contains('character-summary-equipped-slot')){
                                incomingItemSlotType =  this.model.getInventoryItemSlotTypeFromClassList(draggedData.parentNode.classList);
                                this.model.switchItemsBetweenEquipSlots(outgoingItemSlotType, incomingItemSlotType);
                            }else{
                                this.model.switchEquipmentFromInventory(outgoingItemSlotType, inventoryItem)
                            }
                        }else{
                            return
                        }
                    }
                    //to inv slot
                    if(dropLocation == 'inventorySlots' && exsistingData.classList.contains('inventory-slot') == false){
                        let inventoryItem;
                        let inventoryItemType;
                        if(draggedData.parentNode.classList.contains('inventory-slot')){//from inventory
                            this.model.switchInventorySlots(draggedData.id, exsistingData.id);
                            this.onSwitchScreen();
                            return;
                        }
                        if(exsistingData.id != undefined){
                            inventoryItem = this.model.getInventoryItemFromItemId(exsistingData.id)
                            inventoryItemType = inventoryItem.itemSubset;
                        }else{
                            inventoryItemType = 'attachable'
                        }
                        if(inventoryItemType == 'attachable'){
                            incomingItemSlotType = inventoryItem.slot
                            outgoingItemSlotType = this.model.getInventoryItemSlotTypeFromClassList(draggedData.parentNode.classList)
                            
                            if(incomingItemSlotType != outgoingItemSlotType){
                                if(
                                    (incomingItemSlotType == 'oneHand' && outgoingItemSlotType == 'mainHand') ||
                                    (incomingItemSlotType == 'oneHand' && outgoingItemSlotType == 'offhand') ||
                                    (incomingItemSlotType == 'twoHand' && outgoingItemSlotType == 'mainHand') ||
                                    (incomingItemSlotType == 'twoHand' && outgoingItemSlotType == 'offhand')
                                ){
                                    //skip
                                }else{
                                    return;
                                }
                            }
                            this.model.switchEquipmentFromInventory(outgoingItemSlotType, inventoryItem)
                        }else{
                            return
                        }
                    }

                    //inv to inv (occurs by default)
                    if(exsistingData.id != undefined){
                        this.onSwitchScreen();
                    }
                });
          
            }
        })
    }
    removeAttrubuteIncreaseListeners(){
        document.getElementById('vigor-increase-button').removeEventListener('click', this.vigorIncreaseHandler);
        document.getElementById('strength-increase-button').removeEventListener('click', this.strengthIncreaseHandler);
        document.getElementById('dexterity-increase-button').removeEventListener('click', this.dexterityIncreaseHandler);
        document.getElementById('intelligence-increase-button').removeEventListener('click', this.intelligenceIncreaseHandler);
        document.getElementById('attunement-increase-button').removeEventListener('click', this.attunementIncreaseHandler);
    }
}