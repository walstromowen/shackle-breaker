export default class Encounter{
    constructor(initialStage, resetOnLeave){
        this.initialStage = initialStage;
        this.currentStage = this.initialStage;
        this.resetOnLeave = resetOnLeave || false;
    }
}
//Wounded Mut
//portal
//graveyard
//panzerian construct
//Mysterious Man
//Shadow of a man
//The Pursuer
//battle field