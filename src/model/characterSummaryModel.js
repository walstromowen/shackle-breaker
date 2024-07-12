

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
        if(parentNodeClassList.contains('oneHand')){}
        if(parentNodeClassList.contains('twohand')){}
        if(parentNodeClassList.contains('head')){return 'head';}
        if(parentNodeClassList.contains('torso')){return 'torso';}
        if(parentNodeClassList.contains('arms')){return 'arms';}
        if(parentNodeClassList.contains('legs')){return 'legs';}
        if(parentNodeClassList.contains('feet')){return 'feet';}
    }
    switchEquipmentFromInventory(outgoingItemSlotType, incomingItem){//from equipment to inventory

        //subtract outgoing item stats            
        this.currentCharacter.subtractAttatchableStats([outgoingItemSlotType])
        //add outgoing item to inventory in correct spot
        let inventory = this.props.getInventory();
        for(let i = 0; i < inventory.length; i++){
            if(inventory[i].slot == outgoingItemSlotType){
                inventory[i] = this.currentCharacter.equipment[outgoingItemSlotType];
                break;
            }
        }
        //add in to equipment
        this.currentCharacter.equipment[[incomingItem.slot]] = incomingItem;
        //add in
        this.currentCharacter.addAttatchableStats([incomingItem.slot])
    }
}