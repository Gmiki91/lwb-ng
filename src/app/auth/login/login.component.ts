import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;

  
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }
 
 
  onLogIn(form: NgForm): void {
    const {  email, password } = form.controls;

    if (form.valid) {
      this.authService.logIn(email.value, password.value);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
