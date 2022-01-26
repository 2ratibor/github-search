import * as dayjs from 'dayjs';

export class DateParseLogic {
    static parseToFullDate(date: string) {
        return dayjs(date).format('DD.MM.YYYY HH:mm:ss');
    }
}
