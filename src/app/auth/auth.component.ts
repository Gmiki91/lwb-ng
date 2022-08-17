import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showPassword: boolean = false;
  passwordMissmatch:boolean = false;
  @ViewChild('signUpForm') form!: NgForm;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSignUp(): void {
    const { username, email, password, type } = this.form.controls;
    const match = this.passwordsMatch();
    if (this.form.valid && match) {
      const user: User = {
        name: username.value,
        password: password.value,
        email: email.value,
        type: type.value
      }
      this.authService.signUp(user)
    }
  }

  passwordsMatch():boolean{
    this.passwordMissmatch = this.form.controls['password'].value!==this.form.controls['password2'].value;
    return  !this.passwordMissmatch;
  }
  onLogIn(form: NgForm): void {
    if (form.valid) {
      console.log(form);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
