var points = 0;
var rounds = 0;
var roundMax = 10;
var gen;
var tabs = document.querySelectorAll('.tabs');
var mTitle = document.querySelector('#menu-title');
var genPick = document.querySelector('#gPick');
var sTitle = document.querySelector('#sTitle');
var oMenu = document.querySelector('#oMenu');
var gDiv = document.querySelector('#game-div');
var pDiv = document.querySelector('#pokemon-found')
var body = document.querySelectorAll('body');
var pokemonFound = []
var pokemonStorage = []

function startGame() {
	var startMenu = function() {
		// Hide the 'menu title'
		document.querySelector('#menu-title').style.display = 'none'

		// Show the 'start title'
		document.querySelector('#sTitle').style.display = 'flex'

		// Removes the event listeners
		document.body.removeEventListener('keypress', startMenu);
		document.body.removeEventListener('click', startMenu);
	}

	genPick.style.display = 'flex'
	var gBox = document.querySelectorAll('.gen-box');
	var test;
	var gameMode = function() {
		// Removes event listeners after use
		for (var i = 0; i < tabs.length; i++) {
			tabs[i].removeEventListener('click', tabFunc);
		}

		for (var gb = 0; gb < gBox.length; gb++) {
			gBox[gb].removeEventListener('click', gameMode);
		}
		test = true;
		var gMode = this.getAttribute("id");
		genPick.style.display = 'none';
		gDiv.style.display = 'unset';
		switch(gMode) {
			case 'gen-1':
				gen = [0, 151]; //151
				whomstThatPokemon();
				break
			case 'gen-2':
				gen = [151, 251];
				whomstThatPokemon();
				break
			case 'gen-3':
				gen = [251, 386];
				whomstThatPokemon();
				break
			case 'gen-4':
				gen = [386, 493];
				whomstThatPokemon();
				break
			default:
				alert('Error!');
		}
	}


	// Add click event(s) to the gen-box(s)
	for (var gb = 0; gb < gBox.length; gb++) {
		gBox[gb].addEventListener('click', gameMode);
	}

	document.body.addEventListener('keypress', startMenu);
	document.body.addEventListener('click', startMenu);
}

function whomstThatPokemon() {
	document.querySelector('#points').innerHTML = points;
	document.querySelector('#rounds').innerHTML = rounds;
	if (rounds === roundMax) {

		mDiv.innerHTML = '';
		mDiv.insertAdjacentHTML('beforeend', `<h2 id=${'endTitle'}>${'You got ' + points + ' out of ' + roundMax + '!'}</h2>`);
		mDiv.insertAdjacentHTML('beforeend', '<button id="mEnd" class="back-btn">Back to menu</button>');
		rounds = 0;
		points = 0;

        var endGame = function() {
			gDiv.style.display = 'none'
			startGame();
		}

		var endBtn = document.querySelector('#mEnd')
		endBtn.addEventListener('click', endGame);

	} else {
		// Get a random number (1-802)
		var randomNum = function() {
			if (gen.length > 1) {
				randomNumber = Math.floor(Math.random() * (gen[1] - gen[0])) + (gen[0] + 1);
			} else {
				randomNumber = Math.floor(Math.random() * gen) + 1; // 802 (max)
			}
			if (pokemonFound.includes(randomNumber) === true) {
				randomNum();
			}

			return randomNumber;
		}

		var rNum = randomNum();
		pokemonFound.push(rNum)

		getThatPokemon(rNum)
	}
}

function getThatPokemon(pokemonCount) {
	fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonCount + '/')
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status);
			return;
		  }

		  // Examine the text in the response
		  response.json().then(function(data) {

			var pokemon = {
				'name': data.name.toLowerCase(),
				'image': data.sprites.front_default,
				'id': data.id
			}

			const mDiv = document.querySelector('#mDiv');

			mDiv.innerHTML = '';

			// Create an image tag to put the sprite in
			mDiv.insertAdjacentHTML('afterbegin', `<img id=${'pokemon-image'} src=${pokemon.image} height=${300} width=${300}>`);

			// Add the header 'Who's that Pokemon?'
			mDiv.insertAdjacentHTML('beforeend', `<h3 id=${'mHeader'}>${'Who\'s that Pokemon?'}</h3>`);

			// Add the input to take the answer
			mDiv.insertAdjacentHTML('beforeend', `<div id=${'iDiv'}></div>`);
			const iDiv = document.querySelector('#iDiv');

			iDiv.insertAdjacentHTML('beforeend', `<input type="text" id=${'mInput'}>`);
			iDiv.insertAdjacentHTML('beforeend', `<button id=${'mButton'}>Submit</button>`);

			// Add a click event listener to the button
			const mButton = document.querySelector('#mButton');
			var input = ''


			// Get the inputs value/input
			var getInput = function() {
				mButton.removeEventListener("click", getInput);

                pokemonFound.push(pokemon);

				input = document.querySelector('#mInput').value;

				if (input.toLowerCase() === pokemon['name']) { 
					points++
					if (pokemonStorage.includes(pokemonCount) !== true) {
						pokemonStorage.push(pokemonCount);
					}
				}

				rounds++;

				// Update both points & rounds spans
				document.querySelector('#points').innerHTML = points;
				document.querySelector('#rounds').innerHTML = rounds;


				// Reveal the Pokemon
				const pImage = document.querySelector('#pokemon-image');


				var imageA = pImage.animate(
				[
				  {
					filter: 'brightness(0)',
				  },
				  {
					filter: 'brightness(1)',
				  }
				],
				{
					duration: 1500,
					iterations: 1
				}
				);

				var aAnim = function() {
					imageA.pause()
					pImage.style.filter = 'brightness(1)';

					var imageA_2 = pImage.animate(
						[	{ transform: 'rotate(0)'},
							{ transform: 'rotate(-20deg)'},
							{ transform: 'rotate(20deg)'},
							{ transform: 'rotate(-20deg)'},
							{ transform: 'rotate(0)'}
						], {
							duration: 1500,
						}
					);

					mDiv.insertAdjacentHTML('beforeend', `<h3 id=${'sHeader'}>${'It\'s ' + pokemon.name + '!'}</h3>`);
					var header2 = document.querySelector('#sHeader');
					var header_2 = header2.animate(
						[
							{ fontSize: '0px'},
							{ fontSize: '28px'},

						], {
							duration: 500,
						}
					);

				}

				setTimeout(aAnim, 1450);
				setTimeout(whomstThatPokemon, 4000);
			}

			mButton.addEventListener("click", getInput);

		  });
		}
	  )
	  .catch(function(err) {
		console.log('Fetch Error :-S', err);
	  });
}

startGame();
