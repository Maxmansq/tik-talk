import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dataLocal'
})
export class DataLocalPipe implements PipeTransform {

  transform(value: string | null): string | null {
      if (!value) return null;
      const creatMessage = DateTime.fromISO(value, {zone: 'utc'}).toLocal()
      return creatMessage.toFormat('HH:mm')
  }

}
