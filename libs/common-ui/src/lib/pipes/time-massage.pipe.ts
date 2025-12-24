import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'timeMassage'
})
export class TimeMassagePipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (!value) return null;
    const dateNow = DateTime.now()
    const createMessage = DateTime.fromISO(value, {zone: "utc"}).toLocal()
    //Если сообщение отправленно сегодня
    if (dateNow.hasSame(createMessage, 'day')) {
      return "Сегодня"
    }
    //Если сообщение отправленно вчера
  const yesterday = dateNow.minus({days: 1})
    if (yesterday.hasSame(createMessage, 'day')) {
      return "Вчера"
    }
    return createMessage.toFormat('dd.MM.yyyy')
  }
}
