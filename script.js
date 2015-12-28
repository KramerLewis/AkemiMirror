
var loaded = false;
var WEATHER_KEY = "924dc62115c373e702d4afe272bdb2b5";
var YTPlayer;


console.log( "ready!" );
loadHome(WEATHER_KEY);


function loadHome(WEATHER_KEY) {
	if(loaded) {
		YTPlayer = $('#player');
	}
	$.ajax({
		url: '/home.html',
		success: function(response) {
			$('#container').html(response);
		}
	});
	// load time
	startTime();

	// load weather
	startWeather(WEATHER_KEY);

	//load youtube
}

function startTime() {
	setInterval(function() {
		loadTime();
	}, 1000);
}

function loadTime() {
	$('#date').html(moment().format('dddd, MMMM Do YYYY'));
	$('#time').html(moment().format('h:mm:ss a'));
}

function startWeather(WEATHER_KEY) {
	loadWeatherCurrent(WEATHER_KEY);
	setInterval(function() {
		loadWeatherCurrent(WEATHER_KEY);
	}, 600000);

	loadForecast(WEATHER_KEY);
	setInterval(function() {
		loadForecast(WEATHER_KEY);
	}, 14400000);
}

function loadWeatherCurrent(WEATHER_KEY) {
	//var response = $.get("http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=924dc62115c373e702d4afe272bdb2b5");
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&APPID=" + WEATHER_KEY, 
		success: function(result){
    		
			//weather
			var weather = result.weather[0].description
			var iconLink = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png"

    		//temp
    		var temp = Math.round(result.main.temp) + "&degF";

    		//sunset
    		var sunset = result.sys.sunset;

    		//set div
    		$("#weather #desc").html(weather);
    		$("#weather img").attr("src",iconLink);
    		$("#weather #temp").html(temp);
    		$("#sunset").html('sunset: ' + moment(sunset*1000).format('hh:mm a'));
		},
		error: function(error){
			console.log('current weather load failed: ' + error);
		}
	});
}

function loadForecast(WEATHER_KEY) {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Seattle&units=imperial&APPID=' + WEATHER_KEY,
		success: function(result) {
			var $table = $("<table>", {id:"forecast",align:"right"});
			var days = result.list;
			for(i = 0; i < days.length; ++i) {
				var forecast = days[i];

				var $tr = $("<tr>");

				var $td = $("<td>", {class:'day'});
				$td.html(moment(forecast.dt, 'X').format('ddd'));
				$tr.append($td);

				$td = $("<td>", {class:'temp'});
				$td.html(Math.round(forecast.temp.day) + '&degF');
				$tr.append($td);

				$td = $("<td>", {class:'weatherDesc'});
				$td.html(forecast.weather[0].description);
				$tr.append($td);

				$table.append($tr);
				$('#forecast').append($table);
			}
		},
		error: function(error){
			console.log('forecast load failed: ' + error);
		}
	})
}

function loadYoutube() {
	$.ajax({
		url: '/youtube.html',
		type: 'GET',
		success: function(response) {
			$('#container').html(response);
		}
	})
}

function reloadYoutube() {
	$('#container').html(YTPlayer);
}