import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { eachDayOfInterval, startOfWeek, endOfWeek, isFriday, isWeekend, nextMonday } from 'date-fns';
import { DayNames, DayNamesUk, DayNamesHu, MonthNames, MonthNamesUk, MonthNamesHu } from '../../shared/models/constants';
import { Student } from 'src/app/shared/models/student.model';
import { StudentService } from 'src/app/shared/services/student.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss'],
})

export class FoodOrderComponent implements OnInit, OnDestroy {
  @Input() student!: Student;
  days: string[] = [];
  months: string[] = [];
  dates!: Date[];
  daysOfWeek: string[] = [];
  checkedDays: number[] = [];
  subscription:Subscription= Subscription.EMPTY;

  constructor(private studentService: StudentService, private translocoService:TranslocoService) { }

  ngOnInit(): void {
    const currentLang = this.translocoService.getActiveLang();
    this._langChanged(currentLang);
    this.subscription = this.translocoService.langChanges$.subscribe(lang => this._langChanged(lang));
    this.checkedDays = this.student.foodOrderedFor;
    let today = new Date();
    if (isWeekend(today) || isFriday(today)) today = nextMonday(today);
    this.dates = eachDayOfInterval({
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: endOfWeek(today, { weekStartsOn: 1 })
    })

    this.daysOfWeek = this.dates.map(date => `${MonthNames[date.getMonth()]} - ${date.getDate()}`)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onChange(i: number, checked: boolean) {
    const result = this.dates[i].getTime();
    if (checked) {
      this.checkedDays.push(result)
      this.checkedDays = [...new Set(this.checkedDays)]
    } else {
      const index = this.checkedDays.indexOf(result);
      this.checkedDays.splice(index, 1);
    }
  }

  checkIfOrdered(i: number): boolean {
    let res = false;
    const date = this.dates[i].getTime();
    this.student.foodOrderedFor.forEach(el => {
      if (el === date) res = true;
    })
    return res;
  }

  disableCheckbox(i: number): boolean {
    const selectedDay = this.dates[i].getTime();
    const currentDay = Date.now();
    // 1 nappal előre kell rendelni
    return selectedDay - currentDay < 24 * 60 * 60 * 1000
  }

  updateFoodOrder(): void {
    this.student.foodOrderedFor = this.checkedDays;
    this.studentService.updateFoodOrders(this.student);
  }

  private _langChanged(lang: string) {
    if (lang === "en") {
      this.days = DayNames;
      this.months = MonthNames;
    } else if (lang === "uk") {
      this.days = DayNamesUk;
      this.months = MonthNamesUk;
    } else {
      this.days = DayNamesHu;
      this.months = MonthNamesHu;
    }
  }


}