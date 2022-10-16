import { Component, Input,  OnInit } from '@angular/core';
import { eachDayOfInterval, startOfWeek, endOfWeek, isFriday, isWeekend, nextMonday } from 'date-fns';
import { DayNames,  MonthNames } from '../../shared/models/constants';
import { Student } from 'src/app/shared/models/student.model';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss'],
})

export class FoodOrderComponent implements OnInit {
  @Input() student!: Student;
  dayNames=DayNames;
  months: string[]=[];
  days:number[]=[];
  dates!: Date[];
  daysOfWeek: string[] = [];
  checkedDays: number[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.checkedDays = this.student.foodOrderedFor;
    let today = new Date();
    if (isWeekend(today) || isFriday(today)) today = nextMonday(today);
    this.dates = eachDayOfInterval({
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: endOfWeek(today, { weekStartsOn: 1 })
    })

    this.months = this.dates.map(date => MonthNames[date.getMonth()])
    this.days = this.dates.map(date => date.getDate());
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

}