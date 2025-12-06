const bookingData = JSON.parse(localStorage.getItem('bookingData')) || []

function generateHTML() {
    let bookingHTML = '';
    bookingData.forEach((bus) => {
    bookingHTML += `
    <div class="booking-elm">
        <div class="top-section">
            <p class="bus-name">${bus.busName}<img class="bus-img" src="Images/bus.png"></p>
            <img class="ticket" src="Images/ticket.png">
        </div>
        <p class="route">${bus.source.charAt(0).toUpperCase() + bus.source.slice(1)}
         &#8594; ${bus.destination.charAt(0).toUpperCase() + bus.destination.slice(1)}</p>
        <p class="seat-number">Seat Number: ${bus.seatNumber}</p>
        <div class="booking-info">
            <p class="pickup">Pickup: <span class="place">ISBT Kashmere Gate</span></p>
            <p class="date-cont">Date: <span class="date">${bus.date}</span></p>
            <p class="departure-time">Departure Time - <span class="time">${bus.departureTime}
            </span></p>
            <p class="price">&#8377; ${bus.price}</p>
        </div>
        <div class="bottom-container">
            <p class="payment-status">Payment Status: <span class="status">Pending</span></p>
            <button class="cancel-btn">Cancel Booking</button>
        </div>
    </div>`});
    document.querySelector('.bookings-grid').innerHTML = bookingHTML;
    document.querySelectorAll('.cancel-btn').forEach((button, idx) => {
        button.addEventListener('click', () => {
            bookingData.splice(idx, 1);
            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            generateHTML();
        });
    });

    if(bookingHTML === ''){
        document.querySelector('.bookings-grid').innerHTML = `
        <p class="no-booking"><img class="search-img" src="Images/search.png">
        No Bookings Found</p>`
    }
};
generateHTML();