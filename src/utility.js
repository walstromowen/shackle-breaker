
export function playSoundEffect(soundEffectPath){
    document.getElementById('sound-effect-player').pause();
    document.getElementById('sound-effect-player').src = soundEffectPath;
    document.getElementById('sound-effect-player').play();
}

export function playMusic(musicTrackPath){
    let src = document.getElementById('music-player').src
    if(src == musicTrackPath){
        
    }else{
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

export function getRandomArrayElementWeighted(array){
    for(let i = 0; i < array.length; i++){
        let allWeightSum = array.reduce((ac, elementProbability)=> ac + elementProbability.weight, 0);
        let threshold = Math.random() * allWeightSum;
        for(let elementProbability of array){
            threshold -= elementProbability.weight;
            if(threshold < 0){
                return elementProbability;
            }
        }
    }
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

export function deepCopyArray(array){
    let newArray = []
    for(let i = 0; i < array.length; i++){
        newArray.push(array[i]);
    }
    return newArray;
}
