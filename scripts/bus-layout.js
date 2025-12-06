import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { buses } from '../data/buses-data.js';

const tripData = JSON.parse(localStorage.getItem('tripData'));
const busName = JSON.parse(localStorage.getItem('busName'));
const bookingData = JSON.parse(localStorage.getItem('bookingData')) || [];

let departureTime = '23:00';
let basePrice = 950;

buses.forEach((bus) => {
  if (
    tripData.destination === bus.destination &&
    tripData.source === bus.source &&
    busName.busName === bus.busName
  ) {
    departureTime = bus.departureTime;
    basePrice = bus.price;
  }
});

const totalSeats = 32;
const seatsPerSide = totalSeats / 2;
const leftSeatsContainer = document.querySelector('.left-seats');
const rightSeatsContainer = document.querySelector('.right-seats');

let date = tripData.date;
for (let i = 0; true; i++) {
  if (date === dayjs().add(i, 'days').format('YYYY-MM-DD')) {
    date = dayjs().add(i, 'days').format('dddd, DD MMMM');
    break;
  }
}

const soldSeats = [2, 5, 9, 13, 18, 21, 27, 31]; 
function generateSeats(container, startNumber, count, side) {
  for (let i = 0; i < count; i++) {
    const seatNumber = startNumber + i;
    const isWindowSeat = (side === 'left' && i % 2 === 0) || (side === 'right' && i % 2 === 1);
    const seatPrice = isWindowSeat ? basePrice + 500 : basePrice;

    const seatDiv = document.createElement('div');
    seatDiv.classList.add('seat-container');

    if (soldSeats.includes(seatNumber)) {
      seatDiv.innerHTML = `
        <img class="seat sold-img" src="Images/seat-sold.png" alt="sold">
        <p class="seat-price sold">Sold</p>
      `;
      container.appendChild(seatDiv);
      continue;
    }

    const alreadyBooked = bookingData.some(
      (b) =>
        b.seatNumber === seatNumber &&
        b.busName === busName.busName &&
        b.source === tripData.source &&
        b.destination === tripData.destination &&
        b.date === date
    );

    if (alreadyBooked) {
      seatDiv.classList.add('booked');
      seatDiv.innerHTML = `
        <img class="seat booked-img" src="Images/seat-booked.png" alt="booked">
        <p class="seat-price booked-price">Booked</p>
      `;
    } else {
      seatDiv.innerHTML = `
        <img class="seat" src="Images/seat-available.png" alt="seat">
        <p class="seat-price">₹${seatPrice}</p>
      `;
    }

    seatDiv.addEventListener('click', () => {
      if (seatDiv.classList.contains('booked')) {
        const confirmCancel = confirm(`Cancel Seat Number ${seatNumber}?`);
        if (confirmCancel) {
          seatDiv.classList.remove('booked');
          seatDiv.innerHTML = `
            <img class="seat" src="Images/seat-available.png" alt="seat">
            <p class="seat-price">₹${seatPrice}</p>
          `;
          const index = bookingData.findIndex(
            (b) =>
              b.seatNumber === seatNumber &&
              b.busName === busName.busName &&
              b.source === tripData.source &&
              b.destination === tripData.destination &&
              b.date === date
          );
          if (index !== -1) bookingData.splice(index, 1);
          localStorage.setItem('bookingData', JSON.stringify(bookingData));
        }
      } else if (!seatDiv.classList.contains('sold')) {
        const confirmBooking = confirm(`Confirm Seat Number ${seatNumber} for ₹${seatPrice}?`);
        if (confirmBooking) {
          seatDiv.classList.add('booked');
          seatDiv.innerHTML = `
            <img class="seat booked-img" src="Images/seat-booked.png" alt="booked">
            <p class="seat-price booked-price">Booked</p>
          `;
          bookingData.push({
            source: tripData.source,
            destination: tripData.destination,
            seatNumber,
            busName: busName.busName,
            date,
            departureTime,
            price: seatPrice,
          });
          localStorage.setItem('bookingData', JSON.stringify(bookingData));
        }
      }
    });

    container.appendChild(seatDiv);
  }
}

generateSeats(leftSeatsContainer, 1, seatsPerSide, 'left');
generateSeats(rightSeatsContainer, 17, seatsPerSide, 'right');

document.querySelector('.route').innerHTML = `
  ${tripData.source.charAt(0).toUpperCase() + tripData.source.slice(1)} &#8594; 
  ${tripData.destination.charAt(0).toUpperCase() + tripData.destination.slice(1)} (${date})
`;

document.querySelector('.bus-layout-info').innerHTML = `
  <p class="bus-name">${busName.busName}</p>
  <p class="route-info">
    ${tripData.source.charAt(0).toUpperCase() + tripData.source.slice(1)}
    &#8594; ${tripData.destination.charAt(0).toUpperCase() + tripData.destination.slice(1)}
  </p>
  <p class="date">${date}</p>
  <img class="bus-img" src="Images/${busName.busName}.jpg" alt="bus image">
  <div class="location">
    <p class="boarding-point">Boarding Point</p>
    <p class="pickup">&#9733; Kashmere Gate ISBT</p>
  </div>
  <div class="location">
    <p class="dropping-point">Dropping Point</p>
    <p class="destination">&#9733; Private Bus Parking ${
      tripData.destination.charAt(0).toUpperCase() + tripData.destination.slice(1)
    }</p>
  </div>
  <img class="amenities" src="Images/amenities.png" alt="amenities">
`;