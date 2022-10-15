import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DayNames, MonthNames } from '../shared/models/constants';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'

@Component({
  selector: 'app-class-book',
  templateUrl: './class-book.component.html',
  styleUrls: ['./class-book.component.scss']
})
export class ClassBookComponent implements OnInit, OnDestroy {
  days = DayNames;
  date = new Date();
  subscription: Subscription = Subscription.EMPTY;
  sub2: Subscription = Subscription.EMPTY;
  students?: Student[];
  year!: number;
  daysOfWeek!: string[];
  studentsToUpdate: Student[] = [];
  loading = true;
  constructor(private route: ActivatedRoute, private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.date.setHours(8, 0, 0, 0);
    this.initDates(this.date);
    this.route.queryParams.subscribe(params => {
      this.subscription = this.studentService.getStudentsOfClass(params['grade'])
        .subscribe(students => { this.students = students; this.loading = false; });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.sub2.unsubscribe();
  }

  changeWeek(value: number) {
    const dayOfMonth = this.date.getDate() + (value * 7);
    this.date.setDate(dayOfMonth);
    this.initDates(this.date)
  }

  changeMonth(value: number) {
    const month = this.date.getMonth() + value;
    if (month < 0) {
      this.date.setMonth(11);
      this.changeYear(-1);
    } else if (month > 11) {
      this.date.setMonth(0);
      this.changeYear(1);
    } else {
      this.date.setMonth(month);
    }
    this.initDates(this.date)
  }

  changeYear(value: number) {
    this.date.setFullYear(this.date.getFullYear() + value);
    this.initDates(this.date)
  }

  isStudentPresent(student: Student, index: number) {
    const date = this.getDate(index);
    return student.missedClassAt.find(missedDate => missedDate === date.getTime()) ? "absent" : "present";
  }

  setPresence(student: Student, value: 'absent' | 'present', index: number) {
    const date = this.getDate(index).getTime();
    if (value == 'absent') {
      student.missedClassAt.push(date);
    } else {
      const i = student.missedClassAt.indexOf(date);
      student.missedClassAt.splice(i, 1);
    }
    this.studentsToUpdate.push(student);
  }

  sumOfPresentStudents(index: number) {
    let sum = 0;
    this.students?.forEach(student => {
      if (this.isStudentPresent(student, index) === "present")
        sum++;
    });
    return sum;
  }

  save(): void {
    this.loading=true;
    this.sub2 = this.studentService.updateStudents(this.studentsToUpdate).subscribe(success => {
      this.loading=false;
      if (success) {
        alert("Saved");
      } else {
        alert("something went wrong");
      }
    });
    
    
  }

  private getDate(index: number): Date {
    const result = new Date(this.date);
    result.setDate(result.getDate() + index)
    return result;
  }
  private initDates(date: Date): void {
    this.year = date.getFullYear();
    const dates = eachDayOfInterval({
      start: startOfWeek(this.date, { weekStartsOn: 1 }),
      end: endOfWeek(this.date, { weekStartsOn: 1 })
    })
    this.daysOfWeek = dates.map(date => `${MonthNames[date.getMonth()]} - ${date.getDate()}`)
  }
}
