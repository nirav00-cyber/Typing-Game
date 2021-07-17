const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for words 
const words = ['juice','application','inspire','destiny','wisdom','programming','incredible','invincible','authorized','technology','artificial','intelligence','victory','independent','superficial','century','pebble','adorable','boastful','crazy','endgame','fighter','global','honest','kingdom','lementis','motive','naughty','occupy','quantum','rebel','underwater','wonderful','xmas','youth','zebbra'];

//Initialize word
let randomWord;
let score = 0;
// Inin time
let difficulty  = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
let time = 10;

//set difficulty select value
difficultySelect.value = difficulty;

//focus on text on start 
text.focus();

//start counting down
const timeInterval = setInterval(updateTime,1000);

//generate random word from array
function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)];
}


//add word to DOM 
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;

}
//update score 
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}


addWordToDOM();

//update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';
    if(time === 0){
        clearInterval(timeInterval);
        //endgame
        gameOver();
    }
}

//game over , show end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

//event listeners 
text.addEventListener('input',e =>{
    const insertedText = e.target.value;

    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();
        //clear
    e.target.value = '';
    if(difficulty==='hard'){
        time+=2;
    }
    else if(difficulty=='medium'){
        time+=3;
    }
    else {
        time+=5;
    }
     updateTime(); 
    }

});


//settings button click

settingsBtn.addEventListener('click',() =>
settings.classList.toggle('hide')
);

//settings select 
settingsForm.addEventListener('change',e=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);    
});