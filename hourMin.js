var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');

var month = document.querySelector('.month');
var day = document.querySelector('.day');
var year = document.querySelector('.year');

function setDate() {
	var now = new Date();
	var mm = now.getMonth();
	var dd = now.getDate();
	var yyyy = now.getFullYear();
	var secs = now.getSeconds();
	var mins = now.getMinutes();
	var hrs = now.getHours();
	var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	if (hrs > 12) {
		hours.innerHTML = hrs - 12;
	} else {
		hours.innerHTML = hrs;
	}

	if (secs < 10) {
		seconds.innerHTML = '0' + secs;
	} else {
		seconds.innerHTML = secs;
	}

	if (mins < 10) {
		minutes.innerHTML = '0' + mins;
	} else {
		minutes.innerHTML = mins;
	}

	month.innerHTML = monthName[mm];
	day.innerHTML = dd;
	year.innerHTML = yyyy;
}

setInterval(setDate, 1000);