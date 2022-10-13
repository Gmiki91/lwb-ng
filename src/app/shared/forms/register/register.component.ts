import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../form.scss']
})
export class RegisterComponent implements OnInit {

  classes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  @ViewChild('registerForm') form?: NgForm;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }
  submit(): void {
    if (this.form && this.form.valid) {
      const { fullNameC, fullNameL, dob, grade,parentName,phoneNumber,address, ukraineSchool, healthIssues, vegetarian,homeGoing } = this.form.controls;
      const student: Student = {
        fullNameC: fullNameC.value,
        fullNameL: fullNameL.value,
        dob: dob.value,
        currentGrade: grade.value,
        healthIssues: healthIssues.value,
        parentName:parentName.value,
        phoneNumber:phoneNumber.value,
        address:address.value,
        vegetarian: vegetarian.value ==='' ? false : vegetarian.value,
        homeGoing:homeGoing.value ==='' ? false : homeGoing.value,
        ukraineSchool: ukraineSchool.value,
        registeredAt: Date.now(),
        missedClassAt:[],
        foodOrderedFor:[]
      }
      this.studentService.registerStudent(student);
    }
  }
}