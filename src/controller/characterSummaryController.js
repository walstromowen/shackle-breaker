import {playSoundEffect, playMusic} from '../utility.js';

export default class CharacterSummaryController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize(){
        document.getElementById('character-summary-toggle-party-button').addEventListener('click', ()=>{
            this.props.switchScreen('party-screen');
            document.getElementById('sound-effect-player').src = './assets/audio/soundEffects/cinematic-boom-6872.mp3';
            document.getElementById('sound-effect-player').play();
        });
        document.getElementById('character-summary-screen').querySelectorAll('.stat-cell-hoverable').forEach((node)=>{
            node.addEventListener('mouseenter', (e)=>{
                const miniMenu =  node.querySelector('.stat-cell-hover-menu');
                miniMenu.style.display='flex';
            });
            node.addEventListener('mouseleave', (e)=>{
                const miniMenu =  node.querySelector('.stat-cell-hover-menu');
                miniMenu.style.display = 'none';
            });
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
        this.view.displayCharacterSummary(this.model.currentCharacter);
        this.view.createInventorySlots(this.model.props.getInventory());
        this.view.createEquippedItemSlots(this.model.currentCharacter);
        //slots
        this.addSlotDragListeners(this.view.screen.querySelectorAll('.character-summary-equipped-slot'), 'equipSlots');
        this.addSlotDragListeners(this.view.screen.querySelectorAll('.inventory-slot'), 'inventorySlots');
        //slotData
        this.view.screen.querySelectorAll('.inventory-slot-data').forEach((node)=>{
            if(this.model.props.getSituation() == 'overworld'){
                node.addEventListener('dragstart', ()=>{ 
                    node.classList.add('dragging');
                    
                });
                node.addEventListener('dragend', ()=>{
                    node.classList.remove('dragging');
                });
            }
        });
        
        //Switch Buttons
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
                        if(inventoryItem.itemType == 'attachable'){
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
                            inventoryItemType = inventoryItem.itemType;
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
}