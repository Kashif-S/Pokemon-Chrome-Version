const img_width = 96;
const img_height = 96;

const poof_width = 52;
const poof_height = 52;

const ball_width = 32;
const ball_height = 52;

const padding_sides = 50;
const padding_top = 50;

const despawn_time = 20000;

const poof1 = chrome.extension.getURL("Pokemon/smoke/smoke_01.png");
const poof2 = chrome.extension.getURL("Pokemon/smoke/smoke_02.png");
const poof3 = chrome.extension.getURL("Pokemon/smoke/smoke_03.png");

const ball_img = chrome.extension.getURL("Pokemon/pokeball/pokeball_01.png");

const ball1 = chrome.extension.getURL("Pokemon/pokeball/pokeball_01.png");
const ball2 = chrome.extension.getURL("Pokemon/pokeball/pokeball_02.png");
const ball3 = chrome.extension.getURL("Pokemon/pokeball/pokeball_03.png");
const ball4 = chrome.extension.getURL("Pokemon/pokeball/pokeball_04.png");
const ball5 = chrome.extension.getURL("Pokemon/pokeball/pokeball_05.png");
const ball6 = chrome.extension.getURL("Pokemon/pokeball/pokeball_06.png");
const ball7 = chrome.extension.getURL("Pokemon/pokeball/pokeball_07.png");
const ball8 = chrome.extension.getURL("Pokemon/pokeball/pokeball_08.png");
const ball9 = chrome.extension.getURL("Pokemon/pokeball/pokeball_09.png");
const ball10 = chrome.extension.getURL("Pokemon/pokeball/pokeball_10.png");
const ball11 = chrome.extension.getURL("Pokemon/pokeball/pokeball_11.png");
const ball12 = chrome.extension.getURL("Pokemon/pokeball/pokeball_12.png");
const ball13 = chrome.extension.getURL("Pokemon/pokeball/pokeball_13.png");
const ball14 = chrome.extension.getURL("Pokemon/pokeball/pokeball_14.png");

var capture_flag = false;

var brightness = 100;
var saturation = 100;
var opacity = 100;
var img_size = 100;
var speed = 1;

const size = {
  width: document.body.clientWidth,
  height: document.body.clientHeight
}

chrome.runtime.onMessage.addListener(spawn);

var div = document.createElement('div');
div.style.width = img_width + 'px';
div.style.height = img_height + 'px';
div.style.position = 'absolute';
div.style.left = '100px';
div.style.top = '100px';
div.style.visibility = 'hidden';
div.style.zIndex = '100';

var div2 = document.createElement('div');
div2.style.width = poof_width + 'px';
div2.style.height = poof_height + 'px';
div2.style.position = 'absolute';
div2.style.left = '100px';
div2.style.top = '100px';
div2.style.visibility = 'hidden';
div2.style.zIndex = '101';

var div3 = document.createElement('div');
div3.style.width = ball_width + 'px';
div3.style.height = ball_height + 'px';
div3.style.position = 'absolute';
div3.style.left = '100px';
div3.style.top = '100px';
div3.style.visibility = 'hidden';
div3.style.zIndex = '99';

document.body.appendChild(div);
document.body.appendChild(div2);
document.body.appendChild(div3);

var img = document.createElement('img');
img.width = img_width;
img.height = img_height;
img.style.height = 'auto';
img.style.cursor = 'url(' + ball_img + '),auto';

var poof = document.createElement('img');
poof.width = poof_width;
poof.height = poof_height;

var ball = document.createElement('img');
ball.width = ball_width;
ball.height = ball_height;

function disappear(){
	if(opacity > 0){
		opacity -= 1;
		div3.style.opacity = opacity/100;
		setTimeout(disappear, 10);
	} else {
		div3.style.visibility = 'hidden';
	}
}

function complete_2(){
	ball.src = ball14;
	setTimeout(disappear, 30);
}

function complete_1(){
	ball.src = ball13;
	setTimeout(complete_2, 50)
}

function neutral_3(){
	ball.src = ball11;
	setTimeout(complete_1, 300);
}

function shake_left_2(){
	ball.src = ball10;
	setTimeout(neutral_3, 100);
}

function neutral_2(){
	ball.src = ball11;
	setTimeout(shake_left_2, 300)
}

function shake_right_1(){
	ball.src = ball12;
	setTimeout(neutral_2, 100);
}

function neutral_1(){
	ball.src = ball11;
	setTimeout(shake_right_1, 300)
}

function shake_left_1(){
	ball.src = ball10;
	setTimeout(neutral_1, 100);
}

function drop(){
	if(parseInt(div3.style.top) <=  (parseInt(div.style.top) + img_height)){
		speed += 0.05;
		div3.style.top = parseInt(div3.style.top) + speed + 'px';
		setTimeout(drop, 5)
	} else if(speed > 1.5){
		speed *= -0.3;
		div3.style.top = parseInt(div3.style.top) + speed + 'px';
		setTimeout(drop, 5)
	} else {
		setTimeout(shake_left_1, 300);
	}
}

function drop_ball(){
	ball.src = ball4;
	setTimeout(drop, 20);
}

function glow_ball_5(){
	ball.src = ball9;
	setTimeout(drop_ball, 50);
}

function glow_ball_4(){
	ball.src = ball8;
	setTimeout(glow_ball_5, 50);
}

function glow_ball_3(){
	ball.src = ball7;
	setTimeout(glow_ball_4, 70);
}

function glow_ball_2(){
	ball.src = ball6;
	setTimeout(glow_ball_3, 50);
}

function glow_ball_1(){
	ball.src = ball5;
	setTimeout(glow_ball_2, 50);
}

function close_ball(){
	ball.src = ball4;
	setTimeout(glow_ball_1, 50);
}

function shrink(){
	if(saturation < 400){
		brightness += 2;
		saturation += 6;
		img_size -= 1.5;
		img.style.filter = 'brightness('+ brightness +'%) saturate('+ saturation +'%)';
		img.style.width = img_size + '%';
		setTimeout(shrink, 10);
	} else {
		div.style.visibility = 'hidden';
		setTimeout(close_ball, 50);
	}
}


function open_ball(){
	ball.src = ball3;
	setTimeout(shrink, 80);
}

function poof_ball_4(){
	ball.src = ball2;
	div2.style.visibility = 'hidden';
	setTimeout(open_ball, 100);
}

function poof_ball_3(){
	poof.src = poof3;
	setTimeout(poof_ball_4, 80);
}

function poof_ball_2(){
	poof.src = poof2;
	ball.src = ball1;
	div3.style.visibility = 'visible'
	setTimeout(poof_ball_3, 80);
}

function poof_ball_1(){
	div3.style.top = parseInt(div.style.top) - ball_height/4 + 'px';
	div3.style.left = parseInt(div.style.left) - ball_width/8 + 'px';
	div2.style.top = parseInt(div3.style.top) + ball_height/5 + 'px';
	div2.style.left = parseInt(div3.style.left) - ball_width/3 + 'px';
	poof.src = poof1;
	div2.style.visibility = 'visible';
	setTimeout(poof_ball_2, 80);
}

img.onclick = function(){
	if(capture_flag){
		capture_flag = false;
		img.style.cursor = 'auto';
		poof_ball_1();
	}
}

div.appendChild(img);
div2.appendChild(poof);
div3.appendChild(ball);

function random_position(){
	var min_left = padding_sides;
	var min_top = padding_top;
	
	var max_left = size.width - padding_sides - img_width;
	var max_top = size.height - padding_top - img_height;
	
	var rand_left = Math.floor(Math.random() * (max_left - min_left)) + min_left;
	var rand_top = Math.floor(Math.random() * (max_top - min_top)) + min_top;
	
	div.style.left = rand_left + 'px';
	div.style.top = rand_top + 'px';
}

function despawn(){
	if(capture_flag){
		div.style.visibility = 'hidden';
		img.style.cursor = 'auto';
	}
}

function spawn(message, sender, sendResponse){
	img.src = chrome.extension.getURL(message.p);
	brightness = 100;
	saturation = 100;
	opacity = 100;
	img_size = 100;
	speed = 1;
	img.style.filter = 'brightness('+ brightness +'%) saturate('+ saturation +'%)';
	img.style.width = img_size + '%';
	div3.style.opacity = opacity/100;
	img.style.filter = 'brightness(100%) saturate(100%)';
	div.style.visibility = 'visible';
	img.style.cursor = 'url(' + ball_img + '),auto';
	random_position();
	capture_flag = true;
	setTimeout(despawn, despawn_time);
}

