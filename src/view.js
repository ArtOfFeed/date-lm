'use strict';
import createElement from './components/createElement';

class Datepicker {
    constructor(model, root) {
        this.root = root;
        
        this.tableHead = null;
        this.tableBody = null;
        this.head = null;
        this.container = null;
        
        this.handlePrevMonthButtonClick = this.handlePrevMonthButtonClick.bind(this);
        this.handleNextMonthButtonClick = this.handleNextMonthButtonClick.bind(this);

        this.init();
        console.log(date.toLocaleDateString('sv-SE'));
    }
    handlePrevMonthButtonClick() {
        this.date.month = this.date.month - 1;
        if (this.date.month === 0) {
            this.date.month = 11;
            this.date.year = this.date.year - 1;
        }
        this.init();
    }
    handleNextMonthButtonClick() {
        this.date.month = this.date.month + 1;
        if (this.date.month === 12) {
            this.date.month = 0;
            this.date.year = this.date.year + 1;
        }
        this.init();        
    }
    init() {
        this.tableHead = createElement('thead', null,
            this.date.arrDays.map(weekday =>
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
        this.head = createElement('div', { className: 'head' },
            this.date.arrMonths[this.date.month] + ' ' + this.date.year,
            this.prevMonthButton,
            this.nextMonthButton
        );
        this.container = createElement('div', { className: 'container' },
            this.head,
            this.table
        );
        this.root.appendChild(this.container);
    }
    render() {
        this.root.appendChild(this.container);
    }
    update() {
        const month = [];
        
        const tableBody = createElement('tbody', null,
            month.map(week => 
                createElement('tr', null,
                    week.map(day => createElement('td', null, day))
                )
            )
        );
    }
}