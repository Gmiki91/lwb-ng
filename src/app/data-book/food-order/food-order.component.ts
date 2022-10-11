import { Component, Input, OnInit } from '@angular/core';
import { eachDayOfInterval, startOfWeek, endOfWeek, isFriday, isWeekend, nextMonday } from 'date-fns';
import { DayNames, MonthNames } from 'src/app/shared/models/constants';
import { Student } from 'src/app/shared/models/student.model';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['../data-book.component.scss'],
})

export class FoodOrderComponent implements OnInit {
  @Input() student!: Student;
  days = DayNames;
  dates!: Date[];
  showNextWeek = false;
  daysOfWeek: string[] = [];
  checkedDays: Date[] = [];

  constructor(private studentService:StudentService) { }

  ngOnInit(): void { 
    let today = new Date();
    today.setHours(8,0,0,0);
    if (isWeekend(today) || isFriday(today)) {
      this.showNextWeek = true;
      today = nextMonday(today);
      this.dates = eachDayOfInterval({
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 })
      })
    } else {
      this.showNextWeek = false;
      this.dates = eachDayOfInterval({
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 })
      })
    }
    this.daysOfWeek = this.dates.map(date => `${MonthNames[date.getMonth()]} - ${date.getDate()}`)
  }

  onChange(i: number, checked: boolean) {
    const result = this._correctDate(i);
    if (checked) {
      this.checkedDays.push(result)
    } else {
      const index = this.dates.indexOf(result);
      this.checkedDays.splice(index, 1);
    }
  }

  checkIfOrdered(i:number):boolean{
    let res=false;
    const result = this._correctDate(i);
    result.setHours(0,0,0,0);
    this.student.foodOrderedFor.forEach(el=>{
      const date2=new Date(el)
      date2.setHours(0,0,0,0);
      res= result.getTime() === date2.getTime();
    })
    console.log(res);
    return res;
  }

  updateFoodOrder():void{
    this.student.foodOrderedFor.push(...this.checkedDays);
    console.log(this.checkedDays)
    this.student.foodOrderedFor = [...new Set(this.student.foodOrderedFor)];
    console.log(this.student.foodOrderedFor)
    this.studentService.updateFoodOrders(this.student);
  }

  private _correctDate(i:number):Date{
    let today = this.showNextWeek ? nextMonday(new Date()) : new Date();
    const result = startOfWeek(today, { weekStartsOn: 1 });
    result.setDate(result.getDate() + i);
    result.setHours(8,0,0,0);
    return result;
  }

}