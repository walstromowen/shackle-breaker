//is its own script due to many types of maps
export default class MapLayout{
    constructor(){
        this.height = 0;
        this.width = 0;
        this.tileArray = [];
        this.generate(); //0: open-area, 1: wall, 2: player-spawn 
    }
    generate(){
        switch(Math.floor(Math.random()*3)){ //will never be 2 (must be multiplied by 3)
            case 0: 
                this.height = 9;
                this.width = 9;
                this.tileArray = [
                    1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 2, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1
                ];
                break;
            case 1:
                this.height = 9;
                this.width = 9;
                this.tileArray = [
                    1, 1, 1, 1, 0, 1, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 1, 0, 1, 0, 0, 1,
                    1, 0, 1, 1, 0, 1, 1, 0, 1,
                    1, 0, 0, 0, 2, 0, 0, 0, 1,
                    1, 0, 1, 1, 0, 1, 1, 0, 1,
                    1, 0, 0, 1, 0, 1, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1
                ];
                break;
            case 2:
                this.height = 9;
                this.width = 9;
                this.tileArray = [
                    1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 2, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1
                ];
                break;
            default:
                break;
        }
    }
}













