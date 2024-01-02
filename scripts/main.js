import Controller from "./controller.js";

export let controller = new Controller();

/*
let count = [0,0,0,0,0,0]
for(let a = 0; a < 100; a++){
    let p = 5;
    let enemyCount = Math.floor((Math.random() * (15 - 5 + 1) + 5) * (1 + p/2));
 
    if(enemyCount >= 0 && enemyCount < 20){
        count[0]++;
    }
    if(enemyCount >= 20 && enemyCount < 40){
        count[1]++;
    }
    if(enemyCount >= 40 && enemyCount < 60){
        count[2]++;
    }
    if(enemyCount >= 60 && enemyCount < 80){
        count[3]++;
    }
    if(enemyCount >= 80 && enemyCount < 100){
        count[4]++;
    }
    if(enemyCount >= 100){
        count[5]++;
    }
}
console.log(count);
*/