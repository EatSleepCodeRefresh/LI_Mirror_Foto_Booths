/*Photo Gallery Function*/
"use strict";
$(document).ready(function() {

  var rows = 4; //change this also in css
  var cols = 6; //change this also in css
  var staggerTime = 150;

 var urls = [
	"pictures_PB/Bk-1.jpg",
	"pictures_PB/Bk-2.jpg",
    "pictures_PB/Bk-3.jpg",
	"pictures_PB/Bk-4.jpg",
	"pictures_PB/Bk-8.jpg",
	"pictures_PB/Bk-9.jpg",
	"pictures_PB/Bk-10.jpg",
	"pictures_PB/Bk-12.jpg",
	"pictures_PB/Bk-15.jpg",
	"pictures_PB/Bk-16.jpg",
	"pictures_PB/Bk-16.jpg",
	"pictures_PB/Bk-18.jpg",
	"pictures_PB/Bk-20.jpg",
	"pictures_PB/Bk-21.jpg",
	"pictures_PB/Bk-22.jpg",
	"pictures_PB/Bk-25.jpg",
	"pictures_PB/Bk-30.jpg",
	"pictures_PB/Gr-1.jpg",
	"pictures_PB/Gr-2.jpg",
	"pictures_PB/Gr-3.jpg",
	"pictures_PB/Gr-4.jpg",
	"pictures_PB/Gr-5.jpg",
	"pictures_PB/wh-1.jpg",
	"pictures_PB/wh-2.jpg"
  ];

  var $gallery = $(".demo__gallery");
  var $help = $(".demo__help");
  var partsArray = [];
  var reqAnimFr = (function() {
    return window.requestAnimationFrame || function(cb) {
      setTimeout(cb, 1000 / 60);
    }
  })();

  for (let row = 1; row <= rows; row++) {
    partsArray[row - 1] = [];
    for (let col = 1; col <= cols; col++) {
      $gallery.append(`<div class="show-front demo__part demo__part-${row}-${col}" row="${row}" col="${col}"><div class="demo__part-back"><div class="demo__part-back-inner"></div></div><div class="demo__part-front"></div></div>`);
      partsArray[row - 1][col - 1] = new Part();
    }
  }

  var $parts = $(".demo__part");
  var $image = $(".demo__part-back-inner");
  var help = true;

  for (let i = 0; i < $parts.length; i++) {
    $parts.find(".demo__part-front").eq(i).css("background-image", `url(${urls[i]})`);
  }

  $gallery.on("click", ".demo__part-front", function() {

    $image.css("background-image", $(this).css("background-image"));
    if (help) {
      $help.html("Click any of the tiles to get back");
      help = false;
    }

    let row = +$(this).closest(".demo__part").attr("row");
    let col = +$(this).closest(".demo__part").attr("col");
    waveChange(row, col);
  });

  $gallery.on("click", ".demo__part-back", function() {
    if (!isShowingBack()) return;

   
    setTimeout(function() {
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
          partsArray[row - 1][col - 1].showing = "front";
        }
      }
    }, staggerTime + $parts.length * staggerTime / 10);
    
    
    showFront(0, $parts.length);
    
  });
  
  function showFront(i, maxI) {
    if (i >= maxI) return;
    $parts.eq(i).addClass("show-front");
    
    reqAnimFr(function() {
      showFront(i + 1);
    });
  }

  function isShowingBack() {
    return partsArray[0][0].showing == "back" && partsArray[0][cols - 1].showing == "back" && partsArray[rows - 1][0].showing == "back" && partsArray[rows - 1][cols - 1].showing == "back";
  }

  function Part() {
    this.showing = "front";
  }

  function waveChange(rowN, colN) {
    if (rowN > rows || colN > cols || rowN <= 0 || colN <= 0) return;
    if (partsArray[rowN - 1][colN - 1].showing == "back") return;
    $(".demo__part-" + rowN + "-" + colN).removeClass("show-front");
    partsArray[rowN - 1][colN - 1].showing = "back";
    setTimeout(function() {
      waveChange(rowN + 1, colN);
      waveChange(rowN - 1, colN);
      waveChange(rowN, colN + 1);
      waveChange(rowN, colN - 1);
    }, staggerTime);
  }
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}




/*Deter parallax on mobile */
var ismobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
if (ismobile){
 // bypass parallax effect
}




/****************************************Book Event *************************************************************************/

"use strict"; // interpret contents in JavaScript strict mode

var dateObject = new Date();
var ticket = {
       passengers: {},
       passengersOnTicket: 0,
       countdownClock: updateCountdown
    };
var countdown;

function displayCalendar(whichMonth) {
   var date;
   var dateToday = new Date();
   var dayOfWeek;
   var daysInMonth;
   var dateCells;
   var captionValue;
   var month;
   var year;
   var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   document.getElementById("tripDate").value = "";
   document.getElementById("dateSection").style.display = "none";
   if (whichMonth === -1) {
      dateObject.setMonth(dateObject.getMonth() - 1);
   } else if (whichMonth === 1) {
      dateObject.setMonth(dateObject.getMonth() + 1);
   }
   month = dateObject.getMonth();
   year = dateObject.getFullYear();
   dateObject.setDate(1);
   dayOfWeek = dateObject.getDay();
   captionValue = monthArray[month] + " " + year;
   document.querySelector("#cal table caption").innerHTML = captionValue;
   if (month === 0 || month === 2 || month === 4 ||
       month === 6 || month === 7 || month === 9 || 
       month === 11) { // Jan, Mar, May, Jul, Aug, Oct, Dec
      daysInMonth = 31;
   } else if (month === 1) { // Feb
      if (year % 4 === 0) { // leap year test
         if (year % 100 === 0) { // year ending in 00 not a leap year unless divisible by 400
            if (year % 400 === 0) { 
               daysInMonth = 29;
            } else {
               daysInMonth = 28;
            }
         } else {
            daysInMonth = 29;
         }
      } else {
         daysInMonth = 28;
      }
   } else { // Apr, Jun, Sep, Nov
      daysInMonth = 30;
   }

   dateCells = document.getElementsByTagName("td");
   for (var i = 0; i < dateCells.length; i++) { // clear existing table dates
      dateCells[i].innerHTML = "";
      dateCells[i].className = "";
   }
   
   for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) { // add dates to days cells
      dateCells[i].innerHTML = dateObject.getDate();
      dateCells[i].className = "date";
      if (dateToday < dateObject) {
         dateCells[i].className = "futuredate";
      }
      date = dateObject.getDate() + 1;
      dateObject.setDate(date);
   }
   dateObject.setMonth(dateObject.getMonth() - 1); // reset month to month shown    
   document.getElementById("cal").style.display = "block"; // display calendar if it's not already visible
}

function selectDate(event) {
   if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;

   if (callerElement.innerHTML === "") {
      // cell contains no date, so don't close the calendar
      document.getElementById("cal").style.display = "block";
      return false;
   }
   dateObject.setDate(callerElement.innerHTML);
   var fullDateToday = new Date();
   var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
   var selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
   if (selectedDate <= dateToday) {
      document.getElementById("cal").style.display = "block";
      return false;      
   }
   document.getElementById("tripDate").value = dateObject.toLocaleDateString();
   hideCalendar();
   ticket.date = dateObject.toLocaleDateString();
   document.getElementById("selectedDate").innerHTML = ticket.date;
   document.getElementById("dateSection").style.display = "block";
   countdown = setInterval(ticket.countdownClock, 1000);
   document.getElementById("countdownSection").style.display = "block";
   document.getElementById("ticket").style.display = "block";
}

function updateCountdown() {
   var dateToday = new Date();
   var dateFrom = Date.UTC(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), dateToday.getHours(), dateToday.getMinutes(), dateToday.getSeconds());
   var dateTo = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), 19, 0, 0); // all launches at 8:00pm UTC

   if ((dateTo - dateFrom) < 1000) { // time will be less than 0 when setInterval runs next
      clearInterval(countdown);
      document.getElementById("countdownSection").style.display = "none";
   }

   // days
   var daysUntil = Math.floor((dateTo - dateFrom) / 86400000);
   document.getElementById("countdown").innerHTML = daysUntil;

   // hours
   var fractionalDay = (dateTo - dateFrom) % 86400000;
   var hoursUntil = Math.floor(fractionalDay / 3600000);
   if (hoursUntil < 10) {
      hoursUntil = "0" + hoursUntil;
   }
   document.getElementById("countdown").innerHTML += ":" + hoursUntil;
   
   // minutes
   var fractionalHour = fractionalDay % 3600000;
   var minutesUntil = Math.floor(fractionalHour / 60000);
   if (minutesUntil < 10) {
      minutesUntil = "0" + minutesUntil;
   }
   document.getElementById("countdown").innerHTML += ":" + minutesUntil;
   
   // seconds
   var fractionalMinute = fractionalHour % 60000;
   var secondsUntil = Math.floor(fractionalMinute / 1000);
   if (secondsUntil < 10) {
      secondsUntil = "0" + secondsUntil;
   }
   document.getElementById("countdown").innerHTML += ":" + secondsUntil;
}

function hideCalendar() {
   document.getElementById("cal").style.display = "none";
}

function prevMo() {
   displayCalendar(-1);
}

function nextMo() {
   displayCalendar(1);
}

function registerName() {
   var passengerList = document.getElementById("passengers");
   var passengerName = document.createElement("li");
   var newFnameProp;
   var newLnameProp;
   ticket.passengersOnTicket += 1;
   newFnameProp = "fname" + ticket.passengersOnTicket;
   newLnameProp = "lname" + ticket.passengersOnTicket;
   // add first+last names to ticket object as new properties
   ticket.passengers[newFnameProp] = document.getElementById("fname").value;
   ticket.passengers[newLnameProp] = document.getElementById("lname").value;
   // clear first and last names from form
   document.getElementById("fname").value = "";
   document.getElementById("lname").value = "";
   // add entered name to passenger list in ticket section
   passengerName.innerHTML = ticket.passengers[newFnameProp] + " " + ticket.passengers[newLnameProp];
   passengerList.appendChild(passengerName);
   document.getElementById("ticket").style.display = "block";
   document.getElementById("passengersSection").style.display = "block";
   // return focus to First Name field to facilitate entry of another passenger name
   document.getElementById("fname").focus();
   updateTotalCost();
}

function updateTotalCost() {
   var totalCost = ticket.passengersOnTicket * 250000;
   var monthlyCost = totalCost / 60;
   var shortMonthlyCost = monthlyCost.toFixed(0);
   document.getElementById("singleLabel").innerHTML = "Single payment of $" + totalCost.toLocaleString();
   document.getElementById("multipleLabel").innerHTML = "60 monthly payments of $" + shortMonthlyCost.toLocaleString();
}

function createEventListeners() {
   var prevLink = document.getElementById("prev");
   var nextLink = document.getElementById("next");
   if (prevLink.addEventListener) {
     prevLink.addEventListener("click", prevMo, false); 
     nextLink.addEventListener("click", nextMo, false);
   } else if (prevLink.attachEvent)  {
     prevLink.attachEvent("onclick", prevMo);
     nextLink.attachEvent("onclick", nextMo);
   }

   var dateField = document.getElementById("tripDate");
   if (dateField.addEventListener) {
      dateField.addEventListener("click", displayCalendar, false);
   } else if (dateField.attachEvent) {
      dateField.attachEvent("onclick", displayCalendar);
   }
   
   var closeButton = document.getElementById("close");
   if (closeButton.addEventListener) {
      closeButton.addEventListener("click", hideCalendar, false);
   } else if (closeButton.attachEvent) {
      closeButton.attachEvent("onclick", hideCalendar);
   }
   
   var dateCells = document.getElementsByTagName("td");
   if (dateCells[0].addEventListener) {
      for (var i = 0; i < dateCells.length; i++) {
         dateCells[i].addEventListener("click", selectDate, false);
      }
   } else if (dateCells[0].attachEvent) {
      for (var i = 0; i < dateCells.length; i++) {
         dateCells[i].attachEvent("onclick", selectDate);
      }
   }
   
   var docBody = document.getElementsByTagName("body");
   if (docBody[0].addEventListener) {
      docBody[0].addEventListener("click", hideCalendar, true);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}

