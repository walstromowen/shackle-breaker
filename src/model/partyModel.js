export default class PartyModel{
    constructor(props){
        this.props = props;
        this.initialize();
    }
    initialize(){
        this.assignPartyIds();
    }
    assignPartyIds(){
        for(let i = 0; i < this.props.getParty().length; i++){
            this.props.getParty()[i].partyId = `p${i}`;
        }
    }
    getEntity(partyId){
        for(let i = 0; i < this.props.getParty().length; i++){
            if(this.props.getParty()[i].partyId == partyId){
                return this.props.getParty()[i];
            }
        }
    }
}