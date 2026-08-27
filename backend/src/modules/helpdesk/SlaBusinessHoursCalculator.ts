export interface BusinessHoursSchedule {
  timezone: string;
  startHour: number; // 9 = 9am
  endHour: number;   // 17 = 5pm
  workDays: number[]; // [1,2,3,4,5] = Mon-Fri
  holidays: string[]; // ['2026-01-01', '2026-12-25']
}

export class SlaBusinessHoursCalculator {
  public static defaultSchedule: BusinessHoursSchedule = {
    timezone: 'UTC',
    startHour: 9,
    endHour: 17,
    workDays: [1, 2, 3, 4, 5],
    holidays: [],
  };

  public static addBusinessHours(
    startDate: Date,
    hoursToAdd: number,
    schedule: BusinessHoursSchedule = this.defaultSchedule
  ): Date {
    const current = new Date(startDate.getTime());
    let remainingMinutes = hoursToAdd * 60;
    const workDayMinutes = (schedule.endHour - schedule.startHour) * 60;

    while (remainingMinutes > 0) {
      const dayOfWeek = current.getUTCDay();
      const isWorkDay = schedule.workDays.includes(dayOfWeek);
      const dateStr = current.toISOString().split('T')[0];
      const isHoliday = schedule.holidays.includes(dateStr);

      if (!isWorkDay || isHoliday) {
        // Advance to next day at startHour
        current.setUTCDate(current.getUTCDate() + 1);
        current.setUTCHours(schedule.startHour, 0, 0, 0);
        continue;
      }

      const currentHour = current.getUTCHours();
      const currentMinute = current.getUTCMinutes();
      const currentMinutesFromMidnight = currentHour * 60 + currentMinute;
      const startMinutes = schedule.startHour * 60;
      const endMinutes = schedule.endHour * 60;

      if (currentMinutesFromMidnight < startMinutes) {
        current.setUTCHours(schedule.startHour, 0, 0, 0);
        continue;
      }

      if (currentMinutesFromMidnight >= endMinutes) {
        current.setUTCDate(current.getUTCDate() + 1);
        current.setUTCHours(schedule.startHour, 0, 0, 0);
        continue;
      }

      const availableMinutesToday = endMinutes - currentMinutesFromMidnight;
      if (remainingMinutes <= availableMinutesToday) {
        current.setUTCMinutes(current.getUTCMinutes() + remainingMinutes);
        remainingMinutes = 0;
      } else {
        remainingMinutes -= availableMinutesToday;
        current.setUTCDate(current.getUTCDate() + 1);
        current.setUTCHours(schedule.startHour, 0, 0, 0);
      }
    }

    return current;
  }
}
