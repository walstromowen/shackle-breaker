import {Struggle} from "./abilities.js";

class StatusEffect{
    update(type, statusArrayIndex){ 
        if(this.currentCharges > 0){
            switch(type){ //not firing on first pounce
                case "start": 
                    this.onStartTurn();
                    return true;
                case "end":
                    this.onEndTurn();
                    return true;
            }
        }
        else{
            this.onRemove(statusArrayIndex);
            return false;
        }
    }
    onStartTurn(){
       
    }
    onEndTurn(){
      
    }
    onRemove(statusArrayIndex){
        
    }
}
export class Reinforced extends StatusEffect{//curently has bug where if your next attack is first the reinfored effect is still apllied but it acually makes and interesting game mechanic
    constructor(holder){
        super();
        this.name = "reinforced";
        this.holder = holder;
        this.maxCharges = 1;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        this.holder.currentArmor = this.holder.currentArmor + 5;
        this.currentCharges = this.currentCharges - 1;
    }
    onRemove(statusArrayIndex){
        this.holder.currentArmor = this.holder.currentArmor - 5;
        this.holder.statusArray.splice(statusArrayIndex, 1);
    }
}

export class Bound extends StatusEffect{
    constructor(holder){
        super();
        this.name = "bound";
        this.holder = holder;
        this.maxCharges = 2;
        this.currentCharges = this.maxCharges;
    }
    onStartTurn(){//not firing on first pounce
        this.holder.nextMove = new Struggle;
        this.currentCharges = this.currentCharges - 1;
    }
    onRemove(statusArrayIndex){
        this.holder.statusArray.splice(statusArrayIndex, 1);
    }
}