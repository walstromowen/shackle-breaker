

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
}