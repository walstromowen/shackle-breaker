import Player from "./player.js";
import Controller from "./controller.js";
import MiniMap from "./miniMap.js";

export let player;
export let miniMap;
export let controller;

document.getElementById('title-start-button').addEventListener("click", ()=>{
    player = new Player();
    miniMap = new MiniMap();
    controller = new Controller();
    $("#title-screen").hide();
    $("#app").show();
    controller.locationImage.src = player.map.mapEnviorment.imageSrc; //occurs twice
});