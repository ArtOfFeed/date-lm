'use strict';
import DateRangepicker from './components/DateRangepicker';

const startField = document.querySelector('#date_start');
const endField = document.querySelector('#date_end');

const daterangepicker = new DateRangepicker(startField, endField);

document.addEventListener('submit', (e) => {
    e.preventDefault();
    if (daterangepicker.getValue() === false) {
        alert('Date fault');
    } else {
        alert('Date correnct');
    }
});