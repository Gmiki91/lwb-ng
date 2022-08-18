import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  classes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  @ViewChild('registerForm') form?: NgForm;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }
  submit(): void {
    if (this.form && this.form.valid) {
      const { firstName, lastName, grade } = this.form.controls;
      this.studentService.registerStudent(firstName.value, lastName.value,grade.value);
    }
  }
}
