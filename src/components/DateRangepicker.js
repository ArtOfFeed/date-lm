import Datepicker from './Datepicker';

class DateRangepicker {
    constructor(startField, endField) {
        this.startField = startField;
        this.endField = endField;

        this.dpStart = new Datepicker(startField, {onChange: this.fieldStartHandler});
        this.dpEnd = new Datepicker(endField, {onChange: this.fieldEndHandler});
    }
    fieldStartHandler(params) {
        console.log(params);
    }
    fieldEndHandler(params) {
        console.log(params);
    }
    getValue() {
        let flag = false;
        if (this.dpStart.savedDate < this.dpEnd.savedDate) {
            flag = true;
        }
        return flag;
    }
}

export default DateRangepicker;