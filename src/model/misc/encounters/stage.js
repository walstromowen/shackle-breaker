export default class Stage{
    constructor(config){
        this.name = config.name;
        this.imageSrc = config.imageSrc;
        this.musicSrc = config.musicSrc || '';
        this.decisionArray = config.decisionArray;
    
    }
}