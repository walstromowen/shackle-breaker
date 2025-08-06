

export default class CharacterSummaryModel{
    constructor(props){
        this.props = props;
        this.currentCharacter = '';
        this.initialize();
    }
    initialize(){
        
    }
    setCurrentCharacter(entity){
        this.currentCharacter = entity;
    }
    updateCurrentCharacter(changeType){
        let party = this.props.getParty();
        let currentCharacterIndex;
        for(let i = 0; i < party.length; i++){
            if(party[i].partyId == this.currentCharacter.partyId){
                currentCharacterIndex = i;
                break;
            }
        }
        if(changeType == 'next'){
            currentCharacterIndex += 1
            if(currentCharacterIndex > party.length - 1){
                currentCharacterIndex = 0
            }
        }else{
            currentCharacterIndex -= 1
            if(currentCharacterIndex < 0){
                currentCharacterIndex = party.length - 1
            }
        }
        this.currentCharacter = party[currentCharacterIndex]
    }
    determineCharacterPartyIndex(entity){
        for(let i = 0; i < this.props.getParty().length; i ++){
            if(entity.partyId == this.props.getParty()[i].partyId){
                return i;
            }
        }
    }
    getInventoryItemFromItemId(itemId){
        let currentInventory = this.props.getInventory();
        for(let i = 0; i < currentInventory.length; i++){
            if(currentInventory[i].itemId == itemId){
                return currentInventory[i];
            }
        }
    }
    removeItemFromInventoryByItemId(itemID){
        let inventory = this.props.getInventory();
        for(let i = 0; i < inventory.length; i++){
            if(inventory[i].itemId == itemID){
                inventory.splice(i, 1);
                break;
            }
        }
    }
    getInventoryItemSlotTypeFromClassList(parentNodeClassList){
        let slot = parentNodeClassList.value
        slot = slot.replace('character-summary-equipped-slot ', '');
        slot = slot.replace(' ', '');
        slot = slot.replace('hover-brightness', '');
        return slot;
        
    }
    switchEquipmentFromInventory(outgoingItemSlotType, incomingItem){//from equipment to inventory
        let incomingItemSlot = this.handleMultiSlotItem(incomingItem.slot, outgoingItemSlotType)
        let inventory = this.props.getInventory();
        let incomingIndex;
        let indexModifier = 0;
            for(let i = 0; i < inventory.length; i++){
                if(inventory[i].itemId == incomingItem.itemId){
                    incomingIndex = i;
                    break;
                }
            }
        //subtract outgoing item stats and add outgoing items to inventory in correct spot   
        if(incomingItemSlot == 'twoHand'){
            if(this.currentCharacter.equipment['mainHand'] != ''){
                this.currentCharacter.subtractAttachableStats(['mainHand'])
                inventory.splice(incomingIndex, 0, this.currentCharacter.equipment['mainHand']);
                indexModifier++ ;
            }
            if(this.currentCharacter.equipment['offhand'] != ''){
                this.currentCharacter.subtractAttachableStats(['offhand'])
                inventory.splice(incomingIndex, 0, this.currentCharacter.equipment['offhand']);
                indexModifier++ ;
            }
        }else{
            if(this.currentCharacter.equipment[outgoingItemSlotType] != ''){
                this.currentCharacter.subtractAttachableStats([outgoingItemSlotType])
                inventory.splice(incomingIndex, 0, this.currentCharacter.equipment[outgoingItemSlotType]);
                indexModifier++ ;
            }
        }
        inventory.splice(incomingIndex + indexModifier, 1);
        //add inv to equipment
        if(incomingItemSlot == 'twoHand'){
            this.currentCharacter.equipment[['mainHand']] = incomingItem;
            this.currentCharacter.equipment[['offhand']] = incomingItem;
            this.currentCharacter.addAttachableStats(['mainHand']);
        }else{
            if(this.currentCharacter.equipment[[incomingItemSlot]].slot == 'twoHand' && incomingItemSlot == 'mainHand'){
                this.currentCharacter.equipment['offhand'] = '';
            }
            if(this.currentCharacter.equipment[[incomingItemSlot]].slot == 'twoHand' && incomingItemSlot == 'offhand'){
                this.currentCharacter.equipment['mainHand'] = '';
            }
            this.currentCharacter.equipment[[incomingItemSlot]] = incomingItem;
            //add inv stats
            this.currentCharacter.addAttachableStats([incomingItemSlot])
        }
    }
    
    unequipAttatchable(equippedItemSlotType){
        this.currentCharacter.subtractAttachableStats([equippedItemSlotType])
        let unequippedItem = this.currentCharacter.unequipAttatchables([equippedItemSlotType])[0]
        this.props.getInventory().push(unequippedItem)
    }
    switchItemsBetweenEquipSlots(outgoingItemSlotType, incomingItemSlotType){
        let temp = this.currentCharacter.equipment[outgoingItemSlotType]
        this.currentCharacter.equipment[outgoingItemSlotType] = this.currentCharacter.equipment[incomingItemSlotType]
        this.currentCharacter.equipment[incomingItemSlotType] = temp;
    }
    pushInventoryItemToInventoryEnd(itemId){
        let currentInventory = this.props.getInventory();
        for(let i = 0; i < currentInventory.length; i++){
            if(currentInventory[i].itemId == itemId){
                currentInventory.push(currentInventory[i]);
                currentInventory.splice(i,1);
            }
        }
    }
    switchInventorySlots(draggedDataId, exsistingDataId){
        let currentInventory = this.props.getInventory();
        let incomingItemIndex;
        let exsistingItemIndex;
        for(let i = 0; i < currentInventory.length; i++){
            if(currentInventory[i].itemId == draggedDataId){
                incomingItemIndex = i;
            }
            if(currentInventory[i].itemId == exsistingDataId){
                exsistingItemIndex = i;
            }
            if(incomingItemIndex && exsistingItemIndex){
                break;
            }
        }
        let temp = currentInventory[exsistingItemIndex]
        currentInventory[exsistingItemIndex] = currentInventory[incomingItemIndex]
        currentInventory[incomingItemIndex] = temp;

    }
    handleMultiSlotItem(incomingItemSlot, outgoingItemSlotType){
        switch(incomingItemSlot){
            case 'oneHand':
                return outgoingItemSlotType;
            case 'twoHand':
                return incomingItemSlot;
            default:
                return incomingItemSlot;
        }
    }
    increaseAttribute(attribute){
        switch(attribute){
            case 'vigor':
                this.currentCharacter.vigor++;
                break;
            case 'strength':
                this.currentCharacter.strength++;
                break;
            case 'dexterity':
                this.currentCharacter.dexterity++;
                break;
            case 'intelligence':
                this.currentCharacter.intelligence++;
                break;
            case 'attunement':
                this.currentCharacter.attunement++;
                break;
        }
        this.currentCharacter.scaleAttributes();
        this.currentCharacter.resetStats();
        this.currentCharacter.addAttachableStats(Object.keys(this.currentCharacter.equipment));
        this.currentCharacter.skillPoints--;
    }
}
