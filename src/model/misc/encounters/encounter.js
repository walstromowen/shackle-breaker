export default class Encounter{
    constructor(initialStage, resetOnLeave){
        this.initialStage = initialStage;
        this.currentStage = this.initialStage;
        this.resetOnLeave = resetOnLeave || false;
    }
}
//Wounded Mut