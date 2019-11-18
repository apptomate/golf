import moment from 'moment';

//Alert Message
export const getAlertMessage = (icon, text) => ({
    icon: icon,
    text: text
});

//Custom Date Format
export function dateFormat(date, format) {
    if (moment(date).isValid()) {
        return moment(date).format(format);
    } else {
        return '';
    }
}