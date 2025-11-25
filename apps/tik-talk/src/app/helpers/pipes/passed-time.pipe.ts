import { Pipe, PipeTransform } from '@angular/core';
import { DateTime, DurationLikeObject, Interval } from 'luxon'


@Pipe({
  name: 'passedTime'
})
export class PassedTimePipe implements PipeTransform {
  formatDate: (keyof DurationLikeObject)[] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
  
  searchFormatDate(interval: any): keyof DurationLikeObject {
    for (var format of this.formatDate) {
      var time = Math.floor(interval.length(format))
      if (time > 0) return format
    }
    return 'seconds'
  }

  transform(value: string | null): string | null {
    if (!value) return null
    
    var now = DateTime.now()
    var creatPost = DateTime.fromISO(value, { zone: "utc" }).toLocal()
    var interval = Interval.fromDateTimes(creatPost, now)
    var formatDate = this.searchFormatDate(interval)
    var durValue = interval.toDuration([formatDate])
    var result = durValue.toHuman({maximumFractionDigits: 0})
    return `${result} назад`
    }
  }
