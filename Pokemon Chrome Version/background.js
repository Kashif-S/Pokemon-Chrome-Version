const maximum_wait = 90000;
const minimum_wait = 30000;

const num_pokemon = 493;

function get_pokemon(){
	var pokemon_number = Math.floor(Math.random() * num_pokemon) + 1;
	var address = "Pokemon/images/pokemon (" + pokemon_number + ").png";
	return address;
}

function spawn_pokemon() {
	console.log("Spawning Pokemon");
	let pokemon = {
		p: get_pokemon()
	}
	chrome.tabs.query(
		{currentWindow: true, active : true},
		function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, pokemon);
		}
	)
}

(function loop() {
    var rand = Math.round(Math.random() * (maximum_wait - minimum_wait)) + minimum_wait;
    setTimeout(function() {
            spawn_pokemon();
            loop();  
    }, rand);
}());