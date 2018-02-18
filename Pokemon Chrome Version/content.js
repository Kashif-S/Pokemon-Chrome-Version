const img_width = 96;
const img_height = 96;

const padding_sides = 50;
const padding_top = 50;

const despawn_time = 20000;

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

document.body.appendChild(div);

var img = document.createElement('img');
img.width = img_width;
img.height = img_height;
img.style.cursor = 'url(' + chrome.extension.getURL("Pokemon/pokeball.png") + '),auto';

img.onclick = function(){
	div.style.visibility = 'hidden';
	img.style.cursor = 'auto';
}

div.appendChild(img);

function random_position(){
	var min_left = padding_sides;
	var min_top = padding_top;
	
	var max_left = size.width - padding_sides;
	var max_top = size.height - padding_top;
	
	var rand_left = Math.floor(Math.random() * (max_left - min_left)) + min_left;
	var rand_top = Math.floor(Math.random() * (max_top - min_top)) + min_top;
	
	div.style.left = rand_left + 'px';
	div.style.top = rand_top + 'px';
}

function despawn(){
	div.style.visibility = 'hidden';
	img.style.cursor = 'auto';
}

function spawn(message, sender, sendResponse){
	img.src = chrome.extension.getURL(message.p);
	div.style.visibility = 'visible';
	img.style.cursor = 'url(' + chrome.extension.getURL("Pokemon/pokeball.png") + '),auto';
	random_position();
	setTimeout(despawn, despawn_time);
}

