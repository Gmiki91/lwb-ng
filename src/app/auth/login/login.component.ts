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
  showPassword = false;
  loading=false;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }
 
  onLogIn(form: NgForm): void {
    const {  email, password } = form.controls;
    if (form.valid) {
      this.loading=true;
      this.authService.logIn(email.value, password.value).subscribe(
        {
            next: result => {
                if (result.status==='success') {
                    this.router.navigate(['/']);
                    localStorage.setItem('access_token', result.token);
                    localStorage.setItem('type',result.type);
                } 
            },
            error: repsonse => {
                alert(repsonse.error.message);
                this.loading=false;
            }
        });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
