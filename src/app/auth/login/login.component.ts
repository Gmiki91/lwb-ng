import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;

  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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
