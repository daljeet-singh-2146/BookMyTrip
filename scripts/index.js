import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();
const tomorrow = dayjs().add(1, 'days')

document.querySelector('.date-input-box').setAttribute('min', today.format('YYYY-MM-DD'));

document.querySelector('.today-btn').addEventListener('click', () => {
    document.querySelector('.date-input-box').value = today.format('YYYY-MM-DD')
});

document.querySelector('.tomorrow-btn').addEventListener('click', () => {
    document.querySelector('.date-input-box').value = tomorrow.format('YYYY-MM-DD')
});

let source;
let destination;
let date;

document.querySelector('.search-btn').addEventListener('click', () => {
    source = document.querySelector('.from-input-box').value.toLowerCase();
    destination = document.querySelector('.to-input-box').value.toLowerCase();
    date = document.querySelector('.date-input-box').value
    localStorage.setItem('tripData', JSON.stringify({source, destination, date}))
})

