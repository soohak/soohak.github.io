/**
 Created by w0409248 on 1/10/2018.
 Course: PROG 2700 Client-side Javascript
 Assignment 1
 Name: Soohak KIM
 ID: w0409248
 */
'use strict';

//Variable definisiton
let countDown = 30; //Game play time
let timerId =0; //Time
let showTime =0;
let soundEffect =0;
let gameScore =0;
let shesgone =600; //Time set for disappearance of zombie

let img_array = ["zombie0.png", "zombie1.png"];
let random_row=0; // row position of zombie(for random)
let random_col=0; // col position of zombie(for random)
let row =0; //input row
let col =0; //input col
let table =""; //For table DOM



/************ Functions ************/

function initialize(){//Screen and Game initialization
    //Exception Handling for input
    document.getElementById('rows').disabled = false;
    document.getElementById('cols').disabled = false;

    //Button Activation
    document.querySelector('#game_setting').addEventListener('click', gameSetter);
    document.querySelector('#reset').addEventListener('click', resetGame);
    document.querySelector('#start').addEventListener('click', startGame);
}

function gameSetter() //Game Preparation
{
    //Get input number for game board size
    row = parseInt(document.getElementById('rows').value);
    col = parseInt(document.getElementById('cols').value);

    //Reset score
    gameScore = 0;

    if(row > 2 && col > 2 && row < 8 && col <8)
    {
      //call draw table
	  drawTable(row,col);

	  //Exception Handling for button
      document.getElementById('game_setting').disabled = true;
      document.getElementById('reset').disabled = false;
      document.getElementById('start').disabled = false;
      document.getElementById('rows').disabled = true;
      document.getElementById('cols').disabled = true;

      //Time & Score board reset
      let timeReset = `<p><b>Timer:</b> Play Time is ${countDown} seconds </p>`;
      document.getElementById('timer').innerHTML = timeReset;
      let scoreReset = `<p><b>Score:</b> 0</p>`;
      document.getElementById('score').innerHTML = scoreReset;
      document.getElementById('notice').innerHTML = "";
      //effect sound
      gunCokingSound();
	  BGM();
    }
    else
    {
      let alret = `<h4><u><b>!!!!!! Please Enter the number between 3 and 7 !!!!!!</b></u></h4>`;
      document.getElementById('notice').innerHTML = alret;
      initialize();
    }
}//End gameSetter

function drawTable(row, cols){//Create game board (making table)

    table = document.querySelector('table');
    table.innerHTML = "";

    for(let r=0; r<row; r++)
    {
        let tRow = document.createElement('tr');
        table.appendChild(tRow);

        for(let c=0; c<cols; c++)
		{
            let tCell = document.createElement('td');
            tRow.appendChild(tCell);
            tCell.addEventListener("click", shootZombie); //Most important part Main event Listener
        }
    }
}//End drawTable

function startGame(){//Start Game
    //Timer Start
    timerId = setInterval(timer, 1000);

    //zombieCome Start
    showTime = setInterval(zombieCome,800);
    soundEffect = setInterval(zombieSound,2000);

    //Exception Handling for button
    document.getElementById('start').disabled = true;
    document.getElementById('reset').disabled = true;
}

function timer(){//Timer
    if (countDown ==0)
    {
        clearInterval(timerId);
        let time_over = `<p><b>Timer:</b> Game Over!!!</p>`;
        document.getElementById('timer').innerHTML = time_over;
        countDown = 30; //reset
        gameOver();
    }
    else
	{
        let time_counter = `<p><b>Timer:</b>  ${countDown}</p>`;
        document.getElementById('timer').innerHTML = time_counter;
        countDown = countDown-1;
	}
}

function zombieCome(){//Show zombie image
    while(true)
    {
        //Make random number for position of zombie in table
        random_row = Math.floor((Math.random()*row));
        random_col = Math.floor((Math.random()*col));

        //Check duplication image in the same cell
        if(table.rows[random_row].cells[random_col].innerHTML =="")
        {
            var random_img = Math.floor((Math.random()*2));
            let zombie_image = `<img src="../img/zombies/${img_array[random_img]}" />\n`;
            table.rows[random_row].cells[random_col].innerHTML= zombie_image;
            setTimeout(zombieGone,shesgone);
            break;
        }
    }//end while
}//end zombieCome

function zombieGone(){//Disappearance zombie image
    table.rows[random_row].cells[random_col].innerHTML ="";
}//end zombieGone


function shootZombie() {//Shooting
    //Gun shooting sound effect
    gunShotSound();

    //Shoot target
    let target_element = this;
    if(this.innerHTML !== "")
    {
        gameScore = gameScore+1;
    }

    //Show score
    let total_score = `<p><b>Score:</b> ${gameScore} points!!!</p>`;
    document.getElementById('score').innerHTML = total_score;
}//End shootZombie


function gameOver(){//Game end
    //Stop for image show and zombie sound
    clearInterval(showTime);
    clearInterval(soundEffect);

    // //Show total score
    // let total_score = `<p><b>Score:</b> ${gameScore} points!!!</p>`;
    // document.getElementById('score').innerHTML = total_score;

    //Exception Handling
    document.getElementById('rows').disabled = false;
    document.getElementById('cols').disabled = false;
    document.getElementById('game_setting').disabled = false;

    //Reset varialbes
    row =0;
    col =0;
}//end gameOver


function resetGame(){//Game reset for reset_button
    document.location.reload();
}//end resetGame


/************ Sound Effects ************/

function BGM(){
    //Background Music, Wikipedia Free sound : https://https://en.wikipedia.org/wiki/Requiem_(Mozart)
    let background_music = `<audio src="../sound/Mozart_Requiem_II.mp3" autoplay loop></audio>`;
    document.getElementById('BGM').innerHTML = background_music;
}
        
function zombieSound(){
    //Zombie Sound effect, free effect sound from "SoundEffect++" : https://www.soundeffectsplus.com
    let zombie_sound = `<audio src="../sound/monster-growl.mp3" autoplay ></audio>`;
    document.getElementById('zombieSound').innerHTML = zombie_sound;
}

function gunCokingSound(){
    //Cocking Sound effect, free effect sound from "SoundEffect++" : https://www.soundeffectsplus.com
    let cocking_sound = `<audio src="../sound/gun-cocking.mp3" autoplay  ></audio>`;
    document.getElementById('gunSound').innerHTML = cocking_sound;
}

function gunShotSound(){
    //Shooting Sound effect, free effect sound from "SoundEffect++" : https://www.soundeffectsplus.com
    let shooting_sound = `<audio src="../sound/gunshot-single.mp3" autoplay  ></audio>`;
    document.getElementById('gunSound').innerHTML = shooting_sound;
}


/************ event listener ************/
window.addEventListener('load', initialize);




