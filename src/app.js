'use strict';
import createElement from './components/createElement';

class Datepicker {
    constructor(root) {
        this.root = root;
        this.tableHead = null;
        this.tableBody = null;
        this.head = null;
        this.headTitle = null;
        this.container = null;
        this.savedDate = null;
        this.controlDiapazon = {};

        this.startField = document.querySelector('#date_start');
        this.endField = document.querySelector('#date_end');

        let date = new Date();
        this.day = date.getDay();
        this.date = date.getDate();
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.arrDays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octember', 'Novermber', 'December'];
        this.dayInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.handlePrevMonthButtonClick = this.handlePrevMonthButtonClick.bind(this);
        this.handleNextMonthButtonClick = this.handleNextMonthButtonClick.bind(this);
        this.handleClickChooseDate = this.handleClickChooseDate.bind(this);

        this.root.addEventListener('click', this.toggleCalendar.bind(this));

        this.init();
        this.update();
    }
    toggleCalendar() {
        this.container.classList.toggle('active');
        this.diapazonConrol();
    }
    diapazonConrol() {
        if (this.root === this.startField) {
            this.controlDiapazon.currentVal = this.endField.value;
            this.controlDiapazon.currentFlag = 'end';
        } else {
            this.controlDiapazon.currentVal = this.startField.value;
            this.controlDiapazon.currentFlag = 'start';
        }
    }
    handlePrevMonthButtonClick() {
        this.month = this.month - 1;

        if (this.month === -1) {
            this.month = 11;
            this.year = this.year - 1;
        }
        this.changeHead();
        this.update();
    }
    handleNextMonthButtonClick() {
        this.month = this.month + 1;

        if (this.month === 12) {
            this.month = 0;
            this.year = this.year + 1;
        }
        this.changeHead();
        this.update();        
    }
    changeHead() {
        this.headTitle.textContent = this.arrMonths[this.month] + ' ' + this.year;
    }
    handleClickChooseDate(e) {
        let dateItem = e.target;
        let dateItems = this.container.querySelectorAll('.date-item');
        this.savedDate = e.target.getAttribute('data-time');
        dateItems.forEach(el => el.classList.remove('picked'));
        dateItem.classList.add('picked');
        dateItem.closest('.widget_field').querySelector('.field').value = this.savedDate;
        this.toggleCalendar();
    }
    init() {
        this.tableHead = createElement('thead', null,
            this.arrDays.map(weekday =>
                createElement('th', null, weekday)
            )
        );
        this.tableBody = createElement('tbody', null);
        this.table = createElement('table', { className: 'table' },
            this.tableHead,
            this.tableBody
        );
        this.prevMonthButton = createElement('span', {
            className: 'btn-nav btn-prev',
            onclick: this.handlePrevMonthButtonClick
        }, '<');

        this.nextMonthButton = createElement('span', {
            className: 'btn-nav btn-next',
            onclick: this.handleNextMonthButtonClick
        }, '>');
        this.headTitle = createElement('span', null, this.arrMonths[this.month] + ' ' + this.year);
        this.head = createElement('div', { className: 'head' },
            this.headTitle,
            this.prevMonthButton,
            this.nextMonthButton
        );
        this.container = createElement('div', { className: 'container' },
            this.head,
            this.table
        );
        this.render();
    }
    getDayOfMonth(year, month, day) {
        let dayWeek = new Date(year, month, day).getDay();
        return dayWeek;
    }
    getDaysMonth() {
        const data = [];
        const DAYS_IN_WEEK = 7;
        const LAST_MONTH = 11;
        const CURRENT_MONTH = new Date().getMonth();
        let day = 1;
        let dayPrevMonth = 1;
        let dayNextMonth = 1;

        for (let i = 0; i < (this.dayInMonths[this.month] + this.getDayOfMonth(this.year, this.month, 1)) / DAYS_IN_WEEK; i++) {
            data[i] = [];
            for (let j = 0; j < DAYS_IN_WEEK; j++) {
                if (i === 0 && j < this.getDayOfMonth(this.year, this.month, 1)) {
                    let dayPrevious = this.dayInMonths[this.month !== 0 ? this.month - 1 : LAST_MONTH] - this.getDayOfMonth(this.year, this.month, 1) + dayPrevMonth++;
                    data[i][j] = createElement(
                        'span',
                        {
                            className: 'inactive date-item',
                            onclick: this.handleClickChooseDate,
                            'data-time': `${this.month !== 0 ? this.shortMonth[this.month - 1] : this.shortMonth[LAST_MONTH]} ${dayPrevious},${this.month !== 0 ? this.year : this.year - 1}`
                        },
                        dayPrevious
                    );
                } else if (day > this.dayInMonths[this.month]) {
                    data[i][j] = createElement(
                        'span',
                        {
                            className: 'inactive date-item',
                            onclick: this.handleClickChooseDate,
                            'data-time': `${this.month >= 11 ? this.shortMonth[0] : this.shortMonth[this.month + 1]} ${dayNextMonth},${this.month >= 11 ? this.year + 1 : this.year}`
                        },
                        dayNextMonth++
                    );
                } else {
                    data[i][j] = createElement(
                        'span',
                        {
                            className: day === this.date && this.month === CURRENT_MONTH ? 'active date-item' : 'date-item',
                            onclick: this.handleClickChooseDate,
                            'data-time': `${this.shortMonth[this.month]} ${day},${this.year}`
                        },
                        day++
                    );
                }
            }   
        }
        return data;
    }
    render() {
        this.root.after(this.container);
    }
    checkDay(day) {
        if (day.getAttribute('data-time') === this.savedDate) {
            day.classList.add('picked');
        }
        return day;
    }
    update() {
        const month = this.getDaysMonth();
        
        const tableBody = createElement('tbody', null,
            month.map(week => 
                createElement('tr', null,
                    week.map(day => createElement('td', null, this.checkDay(day)))
                )
            )
        );

        this.table.removeChild(this.tableBody);
        this.tableBody = tableBody;
        this.table.appendChild(this.tableBody);
    }
}

const rootArr = document.querySelectorAll('.field');

rootArr.forEach((root) => {
    function datepicker() {
        new Datepicker(root)
    }
    document.addEventListener('DOMContentLoaded', datepicker);
});