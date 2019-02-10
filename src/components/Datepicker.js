import createElement from '../functions/createElement';

const ARR_DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
const SHORT_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ARR_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octember', 'Novermber', 'December'];
const DAY_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class Datepicker {
    constructor(field, options) {
        this.field = field;
        this.tableHead = null;
        this.tableBody = null;
        this.head = null;
        this.headTitle = null;
        this.container = null;
        this.savedDate = null;
        this.options = options;

        let date = new Date();
        this.day = date.getDay();
        this.date = date.getDate();
        this.year = date.getFullYear();
        this.month = date.getMonth();

        this.handlePrevMonthButtonClick = this.handlePrevMonthButtonClick.bind(this);
        this.handleNextMonthButtonClick = this.handleNextMonthButtonClick.bind(this);
        this.handleClickChooseDate = this.handleClickChooseDate.bind(this);

        this.field.addEventListener('click', this.toggleCalendar.bind(this));

        this.init();
        this.update();
    }
    toggleCalendar() {
        this.container.classList.toggle('active');
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
        this.headTitle.textContent = ARR_MONTHS[this.month] + ' ' + this.year;
    }
    handleClickChooseDate(e) {
        let dateItem = e.target;
        let dateItems = this.container.querySelectorAll('.date-item');
        this.savedDate = new Date(parseInt(e.target.getAttribute('data-time'), 10));
        dateItems.forEach(el => el.classList.remove('picked'));
        dateItem.classList.add('picked');
        dateItem.closest('.widget_field').querySelector('.field').value = SHORT_MONTH[this.savedDate.getMonth()] + ' ' + this.savedDate.getDate() + ',' + this.savedDate.getFullYear().toString().slice(-2);
        this.toggleCalendar();
        this.options.onChange(this.savedDate);
    }
    init() {
        this.tableHead = createElement('thead', null,
            ARR_DAYS.map(weekday =>
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
        this.headTitle = createElement('span', null, ARR_MONTHS[this.month] + ' ' + this.year);
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
        let rows = (DAY_IN_MONTH[this.month] + this.getDayOfMonth(this.year, this.month, 1)) / DAYS_IN_WEEK;
        let cells = this.getDayOfMonth(this.year, this.month, 1);

        for (let i = 0; i < rows; i++) {
            data[i] = [];
            for (let j = 0; j < DAYS_IN_WEEK; j++) {
                if (i === 0 && j < cells) {
                    let dayPrevious = DAY_IN_MONTH[this.month !== 0 ? this.month - 1 : LAST_MONTH] - this.getDayOfMonth(this.year, this.month, 1) + dayPrevMonth++;
                    data[i][j] = createElement(
                        'span',
                        {
                            className: 'inactive date-item',
                            onclick: this.handleClickChooseDate,
                            'data-time': new Date(this.year, this.month - 1, dayPrevious).getTime(),
                            'data-date': new Date(this.year, this.month - 1, dayPrevious)
                        },
                        dayPrevious
                    );
                } else if (day > DAY_IN_MONTH[this.month]) {
                    data[i][j] = createElement(
                        'span',
                        {
                            className: 'inactive date-item',
                            onclick: this.handleClickChooseDate,
                            'data-time': new Date(this.year, this.month + 1, dayNextMonth).getTime(),
                            'data-date': new Date(this.year, this.month + 1, dayNextMonth)
                        },
                        dayNextMonth++
                    );
                } else {
                    data[i][j] = createElement(
                        'span',
                        {
                            className: day === this.date && this.month === CURRENT_MONTH ? 'active date-item' : 'date-item',
                            onclick: this.handleClickChooseDate,
                            'data-time': new Date(this.year, this.month, day).getTime(),
                            'data-date': new Date(this.year, this.month, day)
                        },
                        day++
                    );
                }
            }
        }
        return data;
    }
    render() {
        this.field.after(this.container);
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

export default Datepicker;