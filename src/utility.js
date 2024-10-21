
export function playSoundEffect(soundEffectPath){
    document.getElementById('sound-effect-player').pause();
    document.getElementById('sound-effect-player').src = soundEffectPath;
    document.getElementById('sound-effect-player').play();
}

export function playMusic(musicTrackPath){
    if(document.getElementById('music-player').src != musicTrackPath){
        document.getElementById('music-player').pause();
        document.getElementById('music-player').src = musicTrackPath;
        document.getElementById('music-player').play();
    }
}

export function loadCanvasImages(urls){
    const promiseArray = urls.map((currentUrl)=>{
        return new Promise((resolve)=>{
            const image = new Image();
            image.src = currentUrl;
            image.addEventListener('load', ()=>{
                resolve(image);
            })
        });
    });
    return Promise.all(promiseArray);
}

export function getRandomArrayElement(array){
    return array[Math.floor(Math.random()*array.length)];
}

export function createElement(type, className){
    const element = document.createElement(type);
    let classes = className.split(' ');
    for(let i = 0; i < classes.length; i++){
        element.classList.add(classes[i]);
    }
    return element;
}

export function capiltalizeAllFirstLetters(string){
    let words = string.split(' ');
    for(let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
}