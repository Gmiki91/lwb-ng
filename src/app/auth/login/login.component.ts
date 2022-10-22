import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  showPassword = false;
  loading=false;
  sub:Subscription = Subscription.EMPTY;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 
  onLogIn(form: NgForm): void {
    const {  username, password } = form.controls;
    if (form.valid && username.value.length>2 && password.value.length>2 ) {
      this.loading=true;
      this.sub=this.authService.logIn(username.value, password.value).subscribe(
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
