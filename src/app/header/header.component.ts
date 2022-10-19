import { Component, OnInit,OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, map, filter, Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  languageList = [
    { code: 'uk', label: 'Український' },
    { code: 'en', label: 'English' },
    { code: 'hu', label: 'Magyar' }
  ];
  selected = this.languageList[0];
  loggedIn$!: Observable<boolean>;
  backArrowVisible = false;
  sub:Subscription = Subscription.EMPTY;
  constructor(private router: Router, private service: TranslocoService, private auth: AuthService) { }
  ngOnInit(): void {
   this.sub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        map(event => event as NavigationStart))
      .subscribe(event => this.backArrowVisible=event.url!=='/')
    this.auth.requestLogInStatus();
    this.loggedIn$ = this.auth.getLogInStatus();
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }
  changeSiteLanguage(language: any): void {
    const lang = language.target.value
    this.service.setActiveLang(lang);
    this.selected = this.languageList.find(f => f.code === lang)!;
  }

  logout(): void {
    localStorage.clear();
    this.auth.logOut();
    this.router.navigate(['/login']);

  }
}
