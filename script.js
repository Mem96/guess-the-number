let instructions = document.getElementById('instructions');
let guess = document.getElementById('guess');
let answer = document.getElementById('answer');
let tryButt = document.getElementById('tryButt');

let attemptNum = document.getElementById('attempt-num');
let tryContainer = document.getElementById('try-container');
let resumeButt = document.getElementById('resume');

let select = document.getElementById('difficulty');

let counter = 5; 

// create instructions:
function writeInstructions(){
    instructions.innerText = `The secret number is inbetween 1 and ${select.value}.`;
}

writeInstructions();
select.onchange = function(){
    writeInstructions();
    resumeGame();
    guess.focus();
};

// generate a random number:
function generateNumber(){
    let num = Math.floor((Math.random() * select.value) + 1);
    return num
}

let number = generateNumber();

// compare input & number:
function compareNumber(){
    setTimeout(()=>{guess.value = ''}, 200);
    guess.focus();

    if (Number(guess.value) == number){
        answer.innerText = `Brilliant! The secret number was ${number}.`;
        tryContainer.classList.add('hidden');
        resumeButt.classList.remove('hidden');
    } 
    else if (Number(guess.value) > Number(select.value) || guess.value == 0) {
        answer.innerText = `Impossible! The secret number is inbetween 1 and ${select.value}!`;
        lessenAttempts();
    } 
    else if (Number(guess.value) > number){
        answer.innerText = `Nope. The secret number is smaller.`;
        lessenAttempts();
    } 
    else if (Number(guess.value) < number){
        answer.innerText = `Nope. The secret number is higher.`;
        lessenAttempts();
    }
    else {
        answer.innerText = `Are you sure this is a number?`;
    };

    setTimeout(()=>{
        if (answer.innerText[0] != 'B' && counter > 0){ 
            // prevent disappearing if answer is correct or in game over
            answer.innerText = ''}}, 1000);
}

tryButt.addEventListener('click', ()=>{
    if (guess.value != ''){ // prevents blank attempts
        compareNumber();
    }});

guess.onkeydown = function(event){
    // few keys are allowed to function on the input:
    if (event.key == 'Enter'){
        compareNumber();
    } else if (!(event.key >=0 || event.key <=9 || event.key == 'Backspace' || event.key == 'ArrowLeft' || event.key == 'ArrowRight')){
        event.preventDefault();
    }
};

// check attempts:
function updateAttempts(){
    if (counter > 1){
        attemptNum.innerText = `${counter} attempts left.`;
    } else if (counter == 1){
        attemptNum.innerText = 'One last attempt left.';
        attemptNum.style.fontStyle = 'italic';
    } else if (counter == 0){
        attemptNum.innerText = 'No attempts left!';
        attemptNum.style.fontSize = '24px';
        answer.innerText = `The secret number was ${number}.`;
        tryContainer.classList.add('hidden');
        resumeButt.classList.remove('hidden');
    }
}

function lessenAttempts(){
    counter --;
    updateAttempts();
}

updateAttempts();

// resume:
function resumeGame(){
    counter = 5;
    updateAttempts();
    attemptNum.style.fontStyle = 'normal';
    attemptNum.style.fontSize = '20px';
    resumeButt.classList.add('hidden');
    tryContainer.classList.remove('hidden');
    number = generateNumber();
    answer.innerText = '';
};

resumeButt.addEventListener('click', resumeGame);

