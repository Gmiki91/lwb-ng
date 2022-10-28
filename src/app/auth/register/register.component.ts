import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../shared/models/student.model';
import { StudentService } from '../../shared/services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading=false;
  classes: number[] = [ 2, 3, 4, 5, 6, 7, 8, 9];
  @ViewChild('registerForm') form?: NgForm;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }
  submit(): void {
    if (this.form && this.form.valid) {
      const { fullNameC, fullNameL,email, dob, grade,pgName,phoneNumber,address, ukraineSchool, healthIssues, vegetarian,homeGoing,pw } = this.form.controls;
      const student: Student = {
        fullNameC: fullNameC.value,
        fullNameL: fullNameL.value,
        dob: dob.value,
        currentGrade: grade.value,
        healthIssues: healthIssues.value,
        pgName:pgName.value,
        phone:phoneNumber.value,
        address:address.value,
        email:email.value,
        vegetarian: vegetarian.value ==='' ? false : vegetarian.value,
        homeGoing:homeGoing.value ==='' ? false : homeGoing.value,
        ukraineSchool: ukraineSchool.value,
        registeredAt: Date.now(),
        missedClassAt:[],
        foodOrderedFor:[],
        archived:false,
        pw:pw.value
      }
      this.loading=true;
      this.studentService.registerStudent(student);
    }
  }
}
