import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') form!: NgForm;
  showPassword: boolean = false;
  passwordMissmatch:boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSignUp(): void {
    const { fullName, email, password, phone,address } = this.form.controls;
    const match = this.passwordsMatch();
    if (this.form.valid && match) {
      const user: User = {
        fullName:fullName.value,
        password: password.value,
        email: email.value,
        phone:phone.value,
        address:address.value
      }
      this.authService.signUp(user)
    }
  }
  passwordsMatch():boolean{
    this.passwordMissmatch = this.form.controls['password'].value!==this.form.controls['password2'].value;
    return  !this.passwordMissmatch;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}