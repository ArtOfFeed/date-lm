class DateModel {

}

DateModel.DAY_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
DateModel.ARR_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octember', 'Novermber', 'December'];
DateModel.ARR_DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

let date = new Date();
DateModel(date);

export default DateModel;