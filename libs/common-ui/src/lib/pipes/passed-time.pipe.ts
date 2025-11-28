import { Pipe, PipeTransform } from '@angular/core';
import { DateTime, DurationLikeObject, Interval } from 'luxon'


@Pipe({
  name: 'passedTime'
})
export class PassedTimePipe implements PipeTransform {
  formatDate: (keyof DurationLikeObject)[] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
  
  searchFormatDate(interval: any): keyof DurationLikeObject {
    for (const format of this.formatDate) {
      const time = Math.floor(interval.length(format))
      if (time > 0) return format
    }
    return 'seconds'
  }

  transform(value: string | null): string | null {
    if (!value) return null
    
    const now = DateTime.now()
    const creatPost = DateTime.fromISO(value, { zone: "utc" }).toLocal()
    const interval = Interval.fromDateTimes(creatPost, now)
    const formatDate = this.searchFormatDate(interval)
    const durValue = interval.toDuration([formatDate])
    const result = durValue.toHuman({maximumFractionDigits: 0})
    return `${result} назад`
    }
  }
