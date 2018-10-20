$(function() {

  var socket = io();

  var $homeStatus = $('.homeStatus'); // Home Status Row
  var $screenStatus = $('.screenStatus'); // Screen Status Row
  var $personStatus = $('.personStatus'); // Person Status Row
  var $googleMessage = $('.google-message'); //Google Message
  var $userName = $('.userName'); //User's name
	var $listing = $('.listimg'); //Listing 
	
	var $intro = $('.elementToFadeInAndOut');
  var $intro2 = $('.WeeklyWeatherWidget');
  
  $screenStatus.hide()

	function startAnimation() {
		document.getElementById('ball').className ='visible';
		document.getElementById('ball').className ='ball';
		document.getElementById('splash').className ='splash';
		document.getElementById('startscreen').className ='invisible';
    document.getElementById('hisally').className ='invisible';
    setTimeout(function() {document.getElementById("weeklyWeatherWidget").setAttribute("style","display:true;"); },2500)
		
	}


	$intro.hide()
	$intro.fadeIn(1000)
	$intro.delay(1000)
	$intro.fadeOut(1000, function() {
		startAnimation()
	});



  const displayHomeStatus = (data) => {
    console.log(data)
    $homeStatus.text(data.message)
    $googleMessage.text(data.message)
    $googleMessage.hide()
    $googleMessage.fadeIn(2000)
    $googleMessage.delay(9000).fadeOut(2000)

  }

  //Moving sensor
  const displayScreenStatus = (data) => {
    console.log(data)
    // $screenStatus.text(data.message.text)
    $screenStatus.fadeIn(2000)
    $screenStatus.delay(5000).fadeOut(2000)
  }

  const displayPersonStatus = (data) => {
    console.log(data)
    $personStatus.text(data.message.name)
    $userName.text("Hi " + data.message.name)
  }

  const displayWeeklyStatus = (data) => {
    $listing.css("visibility", "visible")
    $listing.attr("src", data.url)
    if (data.url == "") {
      $listing.attr("src", "./img/Steps.png")
      $listing.css("visibility", "visible")
      $listing.hide()
      $listing.fadeIn(2000)
    } else {
      $listing.attr("src", data.url)
      $listing.css("visibility", "visible")
      $listing.hide()
      $listing.fadeIn(2000)
      $listing.delay(5000).fadeOut(2000)
    }
    
    console.log(data)
  }

  const displayFitbitData = (data) => {
    console.log(data)
  }

  // **** Socket Events ****
  console.log("testing123")

  socket.on('voice_text', (data) => {
    // Display home status
    displayHomeStatus(data);
  });

  socket.on('screen_status', (data) => {
    // Display screen status
    displayScreenStatus(data);
  });

  socket.on('person_status', (data) => {
    // Display home status
    displayPersonStatus(data);
  });

  socket.on('show_health_info', (data) => {
    // Display home status
    displayWeeklyStatus(data);
	});


  socket.on('fitbit_data', (data) => {
    // Display home status
    displayFitbitData(data);
  });

});

//invokes functions as soon as window loads
window.onload = function(){
	time();
	ampm();
	whatDay();
	setInterval(function(){
		time();
		ampm();
		whatDay();
	}, 1000);
};


//gets current time and changes html to reflect it
function time(){
	var date = new Date(),
		hours = date.getHours(),
		minutes = date.getMinutes(),
		seconds = date.getSeconds();

	//make clock a 12 hour clock instead of 24 hour clock
	hours = (hours > 12) ? (hours - 12) : hours;
	hours = (hours === 0) ? 12 : hours;

	//invokes function to make sure number has at least two digits
	hours = addZero(hours);
	minutes = addZero(minutes);
	seconds = addZero(seconds);

	//changes the html to match results
	document.getElementsByClassName('hours')[0].innerHTML = hours;
	document.getElementsByClassName('minutes')[0].innerHTML = minutes;
}

//turns single digit numbers to two digit numbers by placing a zero in front
function addZero (val){
	return (val <= 9) ? ("0" + val) : val;
}

//lights up either am or pm on clock
function ampm(){
	var date = new Date(),
		hours = date.getHours(),
		am = document.getElementsByClassName("am")[0].classList,
		pm = document.getElementsByClassName("pm")[0].classList;
	
		
	(hours >= 12) ? pm.add("light-on") : am.add("light-on");
	(hours >= 12) ? am.remove("light-on") : pm.remove("light-on");
}

//lights up what day of the week it is
function whatDay(){
	var date = new Date(),
		currentDay = date.getDay(),
		days = document.getElementsByClassName("day");

	//iterates through all divs with a class of "day"
	for (x in days){
		//list of classes in current div
		var classArr = days[x].classList;

		(classArr !== undefined) && ((x == currentDay) ? classArr.add("light-on") : classArr.remove("light-on"));
	}
}




