import Controller from "./controller.js";

export let controller = new Controller();

/*
let count = [0,0,0,0,0,0]
for(let a = 0; a < 100; a++){
    let length = 3;
    let avgLvl = 9;
    let enemyCount = Math.round(Math.random() * ((avgLvl * 0.2) + (length/3)) + 1);
 
    if(enemyCount == 1){
        count[0]++;
    }
    if(enemyCount == 2){
        count[1]++;
    }
    if(enemyCount == 3){
        count[2]++;
    }
    if(enemyCount == 4){
        count[3]++;
    }
    if(enemyCount == 5){
        count[4]++;
    }
    if(enemyCount == 6){
        count[5]++;
    }
}
console.log(count);
*/