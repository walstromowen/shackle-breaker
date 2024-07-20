

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
    getInventoryItemSlotTypeFromClassList(parentNodeClassList){
        let slot = parentNodeClassList.value
        slot = slot.replace('character-summary-equipped-slot ', '');
        slot = slot.replace(' ', '');
        slot = slot.replace('hover-brightness', '');
        return slot;
        
    }
    switchEquipmentFromInventory(outgoingItemSlotType, incomingItem){//from equipment to inventory
        let incomingItemSlot = this.handleMultiSlotItem(incomingItem.slot, outgoingItemSlotType)




        //subtract outgoing item stats   
        let inventory = this.props.getInventory();
        if(this.currentCharacter.equipment[outgoingItemSlotType] != ''){
            this.currentCharacter.subtractAttatchableStats([outgoingItemSlotType])
            //add outgoing item to inventory in correct spot
            for(let i = 0; i < inventory.length; i++){
                
                if(inventory[i].itemId == incomingItem.itemId){
                    inventory[i] = this.currentCharacter.equipment[outgoingItemSlotType];
                    break;
                }
            }
        }else{
            for(let i = 0; i < inventory.length; i++){
                if(inventory[i].itemId == incomingItem.itemId){
                    inventory.splice(i, 1);
                    break;
                }
            }
        }         
        //add in to equipment
        this.currentCharacter.equipment[[incomingItemSlot]] = incomingItem;
        //add in
        this.currentCharacter.addAttatchableStats([incomingItemSlot])
    }
    unequipAttatchable(equippedItemSlotType){
        this.currentCharacter.subtractAttatchableStats([equippedItemSlotType])
        this.props.getInventory().push(this.currentCharacter.equipment[equippedItemSlotType])
        this.currentCharacter.equipment[equippedItemSlotType] = '';
        //TODO
    }
    
    handleMultiSlotItem(incomingItemSlot, outgoingItemSlotType){
        switch(incomingItemSlot){
            case 'oneHand':
                return outgoingItemSlotType;
            case 'twoHand':
                break;
            default:
                return incomingItemSlot;
        }
    }
}
