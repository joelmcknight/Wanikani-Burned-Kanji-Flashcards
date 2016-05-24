//my API 		42fceeb6f58b7cbacee7b3e1ee9d0b00
//https://www.wanikani.com/api/user/42fceeb6f58b7cbacee7b3e1ee9d0b00/kanji
// waniKani.API = "https://www.wanikani.com/api/user/" + newApi + "/kanji"

//create an empty global object to be populated by my other variables etc
var waniKani = {

};


//my own user API
waniKani.API = ''

waniKani.getApi = function() {

		var newApi = $("input").val();
		// console.log(newApi);
		url = "https://www.wanikani.com/api/user/" + newApi + "/kanji"
		// console.log(newApi);
		waniKani.getData(url);
		};

$('form').on('submit', function(e) {
		e.preventDefault();
		waniKani.getApi();
	
		$('form').css('display', 'none');
		$('.mainWrapper p').css('display', 'none')
		$('.buttonContainer').append(
			$('<button>').text('Show Answer').addClass('show firstButton'),
			$('<button>').text('Correct').addClass('correct secondButton'),
			$('<button>').text('Wrong').addClass('wrong thirdButton'),
			$('<button>').text('Finish').addClass('finish fourthtButton')
		);
	
		$('.quizScore').css('display', 'block');

});
var counter = 0;
waniKani.displayCharacters = function(kanjis){

		

		// console.log(kanjis);

		var kanji = $('<h1>').text(kanjis[counter].character).addClass('kanji');
		// console.log(kanji);
		var kunyomi = $('<h3>').text(kanjis[counter].kunyomi).addClass('kunyomi');
		var onyomi = $('<h3>').text(kanjis[counter].onyomi).addClass('onyomi');
		var meaning = $('<h3>').text(kanjis[counter].meaning).addClass('meaning');

		var flashCardContent = $('<div>').append(kanji, kunyomi, onyomi, meaning).addClass('flashCardContent');

		// make the first kanji populate its h1 and div
		//then on click of the show answer button, put the kunyomi(h3) and onyomi(h3) 
		//in the div
		// then on click of X button or O button empty the div and bring in the 
		//next set of h1&h3&h3
		// for (i = 0; i <= elem.length; i++) {
			$('.results').append(flashCardContent);
		// }
		$('.show').on('click', function() {
			//bring in kunyomi and onyomi h3s --- display block dat
			$('.flashCardContent h3').css("display", "block");
		});

		$('.correct').on('click', function() {
			$('.flashCardContent').empty();
			counter++;
			console.log(counter);
			if (counter >= kanjis.length) {
			console.log("ouuuuuuuuweeeeee");
			var percentageScore = waniKani.quizScore/counter;
			$('.flashCardContent').empty();
			$('.flashCardContent').append(
				$('<h2>').text('Your Final Score is: ' + Math.floor(percentageScore *100) + "%")
				);
		}

			//vars werent working so im linking directly to the kanjis[counter]
			$('.flashCardContent').append(
				$('<h1>').text(kanjis[counter].character).addClass('kanji'),
				$('<h3>').text(kanjis[counter].kunyomi).addClass('kunyomi'),
				$('<h3>').text(kanjis[counter].onyomi).addClass('onyomi'),
				$('<h3>').text(kanjis[counter].meaning).addClass('meaning')
				);
			//increment score
				waniKani.quizScore++
				console.log(waniKani.quizScore);
				$('.currentScore').text(waniKani.quizScore);	
			//move to the next card
			//increment outOf
			$('.outOf').text(counter);



		});
		$('.wrong').on('click', function() {
			$('.flashCardContent').empty();
			counter++;
			console.log(counter);

			if (counter >= kanjis.length) {
				console.log("ouuuuuuuuweeeeee");
				var percentageScore = waniKani.quizScore/counter;
				$('.flashCardContent').empty();
				$('.flashCardContent').append(
				$('<h2>').text('Your Final Score is: ' + Math.floor(percentageScore *100) + "%")
				);
			}


			//move to the next card
			//vars werent working so im linking directly to the kanjis[counter]
			$('.flashCardContent').append(
				$('<h1>').text(kanjis[counter].character).addClass('kanji'),
				$('<h3>').text(kanjis[counter].kunyomi).addClass('kunyomi'),
				$('<h3>').text(kanjis[counter].onyomi).addClass('onyomi'),
				$('<h3>').text(kanjis[counter].meaning).addClass('meaning'));

			//increment outOf
			$('.outOf').text(counter);
		});

		console.log(kanjis.length);


		$('.finish').on('click', function(e) {
			var percentageScore = waniKani.quizScore/counter;
				console.log("hahahahah")

			e.preventDefault();
			$('.flashCardContent').empty();
			$('.flashCardContent').append(
				$('<h2>').text('Your Final Score is: ' + Math.floor(percentageScore *100) + "%")
				// $('<h3>').text({waniKani.quizScore / counter}'%')
				);
		});

		$('#resetQuiz').on('click', function() {
				// e.preventDefault();
				// // $('.flashCardContent').empty();
				// console.log("lol");
				// waniKani.quizScore = 0;
				// console.log(waniKani.quizScore);
				// counter = 0;
				// console.log(counter);
				// $('.results').append(flashCardContent);

				});
		


// }

	// });



}

waniKani.quizScore = 0

//define init
waniKani.init = function() {
	
	// waniKani.getApi()

	// waniKani.getData()

};


//get data!
waniKani.getData = function(url) {
	$.ajax({
		url: url,
		method: 'GET',
		dataType: 'jsonp'

	}).then(function(data) {
		console.log('did this work??!?!?!?!');
		console.log(data.requested_information);
		// var kanji = data.requested_information[0].character;
		// console.log(kanji);

		// $('.testing').html(data.requested_information[4].character);
		// var burned = data.requested_information[4].user_specific.srs;
		// console.log(burned);
		

		var burned = data.requested_information.filter(function(kanji) {
			return kanji.user_specific.burned

		});
		waniKani.displayCharacters(burned);
		
		//creating a loop to find all burned etc srs items
		
	});
};

//on click of api Key button - retrieve data
//push into burned array
// when no more burned items, stop
//use javascript to put all the info(kanji and readings) into a div
//take index[i] from array, and put kanji into quiz. 
// on click answer button, popualte info section
//on click X or O ---> i++ which brings next kanji into quiz.
//on click X  ---> score counter -1 or do nothing ?
// on click O ---> score counter+1 

$('.finish').on('click', function(e) {
	var percentageScore = waniKani.quizScore/counter;
		console.log("hahahahah")

	e.preventDefault();
	$('.flashCardContent').empty();
	$('.flashCardContent').append(
		$('<h2>').text('Your Final Score is: ' + Math.floor(percentageScore *100) + "%")
		// $('<h3>').text({waniKani.quizScore / counter}'%')
		);
});

// on click finish --> display final score and percentage
// display none the quiz. (empty)


// on click restart ---> restart quiz 
					$('.resetQuiz').on('Click', function() {
						// e.preventDefault();
						// $('.flashCardContent').empty();
						console.log("lol");
						// waniKani.quizScore = 0;
						// counter = 0;
						// $('.results').append(flashCardContent);

					});
// when index reaches kanjis.length end quiz and show score
//this always breaks everything :O
		



$(document).ready(function() {
	waniKani.init();
});