import Controller from "./controller.js";

export let controller = new Controller();

/*
let count = [0,0,0,0,0,0]
for(let a = 0; a < 100; a++){
    let p = 5;
    let enemyCount = 0;
    enemyCount = Math.floor(Math.random() * (p + Math.floor(p/2) - 1 + 1) + 1);
    if(enemyCount > 6){
        enemyCount = 6;
    }
    if(enemyCount == 1 && p == 1){
        if(Math.random()*2 > 1){
            enemyCount = 2;
        }
    }
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