import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  userName?: string;
  type?: 1 | 2 | 3;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.getCurrentUser().subscribe(user => {
      this.userName = user.name ? user.name : localStorage.getItem('username')!;
      this.type = user.type ? user.type : parseInt(localStorage.getItem('type')!) as 1|2|3;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut():void{
    localStorage.removeItem('username');
    localStorage.removeItem('type');
    this.userName=undefined;
    this.router.navigate(['/'])
  }

}
