import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/shared/models/student.model';
import { format } from 'date-fns';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/shared/services/student.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['../data-book.component.scss'],
})
export class StudentComponent implements OnInit, OnDestroy {
  @ViewChild('form') form?: NgForm;
  subscription: Subscription = Subscription.EMPTY;
  formattedDate: string = '';
  student:Student;
  edit = false;
  loading = false;
  constructor(
    private studentService: StudentService,
    private dialogRef: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{student: Student,parentMode:boolean}) {
      this.student = data.student;
  }

  ngOnInit(): void {
    this.formattedDate = format(new Date(this.student.dob), 'yyyy/MM/dd');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit(): void {
    if (this.edit) {
      this._updateData();
    }
    this.edit = !this.edit;
  }

  private _updateData(): void {
    if (this.form && this.form.valid) {
      const { email, currentGrade, pgName, phone, address, ukraineSchool, healthIssues, vegetarian } = this.form.controls;
      const student: Student = {
        ...this.student,
        currentGrade: currentGrade.value,
        healthIssues: healthIssues.value.length>0 ? healthIssues.value.split(',') : [],
        pgName: pgName.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
        vegetarian: vegetarian.value === '' ? false : vegetarian.value,
        ukraineSchool: ukraineSchool.value,
      }
      this.loading = true;
      this.subscription = this.studentService.updateStudent(student).subscribe(success => {
        if (success) {
          this.loading=false;
          this.dialogRef.close();
        } else {
          alert("An error has occured. Please try again.");
        }
      })
    }
  }
}
