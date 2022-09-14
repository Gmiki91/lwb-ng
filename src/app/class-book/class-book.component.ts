import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentComponent } from '../forms/student/student.component';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-class-book',
  templateUrl: './class-book.component.html',
  styleUrls: ['./class-book.component.scss']
})
export class ClassBookComponent implements OnInit, OnDestroy {
  subscription: Subscription = Subscription.EMPTY;
  students?: Student[];
  constructor(private route: ActivatedRoute, private studentService: StudentService,private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.subscription = this.studentService.getStudentsOfClass(params['grade'])
      .subscribe(students=>this.students = students);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openStudentData(student:Student):void{
    
      const dialogRef = this.dialog.open(StudentComponent, { data:student });
      // dialogRef.afterClosed().subscribe((result: Result) => {
      //   if (result !== undefined) {
      //     this.studentService.giveStudentResult(id, result, this.grade, this.subject);
      //   }
      // });

  }
}
