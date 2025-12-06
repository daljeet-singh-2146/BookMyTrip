import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { buses } from '../data/buses-data.js';

const tripData = JSON.parse(localStorage.getItem('tripData'))
let busesHTML = '';
let busesCount = 0;
buses.forEach((bus) => {
    if(tripData.source === bus.source && tripData.destination === bus.destination){
        busesHTML += `
        <div class="bus-container">
            <p class="source"><span class="status">IS STARTING</span> 
            from: IBST Kashmere Gate</p>
            <div class="bus-info">
                <div class="bus-name-container">
                    <p class="bus-name">${bus.busName} 
                    <img class="bus-img" src="Images/bus.png"></p>
                    <p class="bus-type">Volvo Semi-Sleeper (2+2)</p>
                </div>
                <div class="seat-available">${bus.seatEmpty} Seats Available</div>
                <div class="time">Departure Time - <span class="dept-time">
                    ${bus.departureTime}</span></div>
                <div class="price">
                    <p class="old-price">&#8377;${bus.price + 1000}</p>
                    <p class="new-price">&#8377;${bus.price}</p>
                </div>
            </div>
            <div class="view-bus">
                <a href="bus-layout.html"><button class="view" data-bus-name="${bus.busName}">
                View Seats
                </button></a>
            </div>
        </div>`
        busesCount++
    }
});

let date = tripData.date;
for (let i = 0; i < 366; i++){
    if(date === dayjs().add(i, 'days').format('YYYY-MM-DD')){
        date = dayjs().add(i, 'days').format('dddd, DD MMMM');
        break;
    }
}

document.querySelector('.route').innerHTML = `${tripData.source.charAt(0).toUpperCase() + 
        tripData.source.slice(1)} &#8594; ${tripData.destination.charAt(0).toUpperCase() + 
        tripData.destination.slice(1)} (${date})`

document.querySelector('.buses-number').innerHTML = `${busesCount} Buses`

if(!tripData.source || !tripData.date || !tripData.date){
    document.querySelector('.route-info').innerHTML = '';
    document.querySelector('.buses-grid').innerHTML = `<p class="no-result">
    <img class="search-icon" src="Images/search.png">Incomplete search data</p>`;
}

document.querySelector('.buses-found').innerHTML = `${busesCount} Buses Found`

document.querySelector('.buses-grid').innerHTML = busesHTML;

document.querySelectorAll('.view').forEach((button) => {
    button.addEventListener('click', () => {
        localStorage.setItem('busName', JSON.stringify(button.dataset));
    })
})