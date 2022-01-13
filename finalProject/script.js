//Variable declarations
let key = "28a7577259001790d5fca0cdd8147f7e";
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//fetches for api
fetch('https://api.openweathermap.org/data/2.5/onecall?lat=48.407326&lon=-123.329773&exclude=hourly,current,minutely,alerts&appid=' + key)
  .then(response => response.json())
  .then(data => getWeather(data));

function getWeather(data){
	
	console.log(data);
	
	//let img2 = new Image();
    //img2.src ="http://openweathermap.org/img/wn/" + (data.daily[5].weather[0].icon) + "@2x.png";
	//document.getElementById("day2").appendChild(img2);
	 for(let i = 0; i < 7; i++){
		let img = new Image();
		img.src ="http://openweathermap.org/img/wn/" + (data.daily[i].weather[0].icon) + "@2x.png";
		document.getElementById("day" + i).append(img); 
		 
	 }
}
//calendar
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
	
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'day0';
      }
	if (i - paddingDays === day + 1 && nav === 0) {
        daySquare.id = 'day1';
      }
	  if (i - paddingDays === day + 2 && nav === 0) {
        daySquare.id = 'day2';
      }
	  if (i - paddingDays === day + 3 && nav === 0) {
        daySquare.id = 'day3';
      }
	  if (i - paddingDays === day + 4 && nav === 0) {
        daySquare.id = 'day4';
      }
	  if (i - paddingDays === day + 5 && nav === 0) {
        daySquare.id = 'day5';
      }
	  if (i - paddingDays === day + 6 && nav === 0) {
        daySquare.id = 'day6';
      }
	  if (i - paddingDays === day + 7 && nav === 0) {
        daySquare.id = 'day7';
      }
      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare); 


  }
  
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();


let curday = function(sp){
today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //As January is 0.
let yyyy = today.getFullYear();

if(dd<10) dd='0'+dd;
if(mm<10) mm='0'+mm;
return (mm+sp+dd+sp+yyyy);
};
document.getElementById("today").innerHTML = (curday('/'));


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}                  