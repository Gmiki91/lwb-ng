import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') form!: NgForm;
  showPassword = false;
  passwordMissmatch = false;
  loading=false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }
  onSignUp(): void {
    const { email, password } = this.form.controls;
    const match = this.passwordsMatch();
    if (this.form.valid && match) {
      const user: User = {
        password: password.value,
        email: email.value,
        type: '0'
      }
      this.authService.signUp(user);
      this.loading=true;
    }
  }
  passwordsMatch(): boolean {
    this.passwordMissmatch = this.form.controls['password'].value !== this.form.controls['password2'].value;
    return !this.passwordMissmatch;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
