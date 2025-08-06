import {playSoundEffect, playMusic} from '../utility.js';

export default class TitleController{
    constructor(props, model, view){
        this.props = props;
        this.initialize();
    }
    initialize(){
       
        document.getElementById('title-load-game-button').addEventListener('click', ()=>{
            this.props.switchScreen('save-list-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });


        document.getElementById('title-start-button').addEventListener('click', ()=>{
            this.props.switchScreen('lobby-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            
        });



        //lOGIN/REGISTER
        document.getElementById('to-register-page').addEventListener('click', ()=>{
            this.props.switchScreen('register-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        document.getElementById('to-login-page').addEventListener('click', ()=>{
            this.props.switchScreen('login-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });

        document.getElementById('register-submit-button').addEventListener('click', (e)=>{
            this.props.switchScreen('loading-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            this.registerUser(e);
        });
        document.getElementById('login-submit-button').addEventListener('click', (e)=>{
            this.props.switchScreen('loading-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            this.loginUser(e);
           
        });
    }
    onSwitchScreen(){
        playMusic('./assets/audio/musicTracks/AlexProductionsMainTheme.mp3');
       
    }
     //Server Calls
    async registerUser(e){
        e.preventDefault();
        const url = `${this.props.baseURL}/auth/register`;
        try{
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: document.getElementById('register-username-input').value,
                        email: document.getElementById('register-email-input').value,
                        password: document.getElementById('register-password-input').value
                    })
                }
            )
            const data = await response.json();
            if(data.error){
                alert(data.error)
            }else{
                alert('success!')
                this.props.switchScreen('login-screen');
            }
        }catch(err){
            alert(err)
        }
        
    }

    async loginUser(e){
        e.preventDefault();
        const url = `${this.props.baseURL}/auth/login`;
        try{
            const response = await fetch(url, 
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: document.getElementById('login-username-input').value,
                        password: document.getElementById('login-password-input').value
                    })
                }
            )
            const data = await response.json();
            if(data.error){
                this.props.switchScreen('login-screen');
                alert(data.error)
            }else{
                this.props.switchScreen('title-screen');
                if(document.querySelector('body').requestFullscreen) {
                    document.querySelector('body').requestFullscreen();
                }else if (document.querySelector('body').webkitRequestFullscreen) { /* Safari */
                    document.querySelector('body').webkitRequestFullscreen();
                }else if (document.querySelector('body').msRequestFullscreen) { /* IE11 */
                    document.querySelector('body').msRequestFullscreen();
                }
                
            }
        }catch(err){
            alert(err)
        }
    }
}



