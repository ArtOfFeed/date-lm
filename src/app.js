'use strict';
import createElement from './components/createElement';

class Datepicker {
    constructor(date, root) {
        this.root = root;
        this.day = date.getDay();
        this.date = date.getDate();
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.tableHead = null;
        this.tableBody = null;
        this.head = null;
        this.headTitle = null;
        this.container = null;
        this.startField = null;
        this.endField = null;
        this.arrDays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octember', 'Novermber', 'December'];
        this.dayInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.handlePrevMonthButtonClick = this.handlePrevMonthButtonClick.bind(this);
        this.handleNextMonthButtonClick = this.handleNextMonthButtonClick.bind(this);
        this.handleFieldClick = this.handleFieldClick.bind(this);

        this.init();
        this.update();

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
    handleFieldClick() {
        
    }
    changeHead() {
        this.headTitle.textContent = this.arrMonths[this.month] + ' ' + this.year;
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
        this.prevMonthButton = createElement('button', {
            className: 'btn btn-prev',
            onclick: this.handlePrevMonthButtonClick
        }, '<');

        this.nextMonthButton = createElement('button', {
            className: 'btn btn-next',
            onclick: this.handleNextMonthButtonClick
        }, '>');
        this.headTitle = createElement('span', null, this.arrMonths[this.month] + ' ' + this.year);
        this.head = createElement('div', { className: 'head' },
            this.headTitle,
            this.prevMonthButton,
            this.nextMonthButton
        );
        this.startField = createElement('input', {
            onclick: this.handleFieldClick
        }, '')
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
                            'data-time': `${dayPrevious}-${this.month !== 0 ? this.month : LAST_MONTH + 1}-${this.year}`
                        },
                        dayPrevious
                    );
                } else if (day > this.dayInMonths[this.month]) {
                    data[i][j] = createElement('span', {'data-time': `${dayNextMonth}-${this.month >= 11 ? 1 : this.month + 2}-${this.year}`}, dayNextMonth++);
                } else {
                    data[i][j] = createElement('span', {'data-time': `${day}-${this.month + 1}-${this.year}`}, day++);
                }
            }   
        }
        return data;
    }
    render() {
        this.root.appendChild(this.container);
    }
    update() {
        const month = this.getDaysMonth();
        
        const tableBody = createElement('tbody', null,
            month.map(week => 
                createElement('tr', null,
                    week.map(day => createElement('td', null, day))
                )
            )
        );

        this.table.removeChild(this.tableBody);
        this.tableBody = tableBody;
        this.table.appendChild(this.tableBody);
    }
}

const date = new Date();
const root = document.querySelector('#app');
new Datepicker(date, root);