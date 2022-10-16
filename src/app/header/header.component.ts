import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'uk', label: 'Український' },
    { code: 'hu', label: 'Magyar' }
  ];
  selected = this.languageList[0];
  loggedIn$!: Observable<boolean>;
  constructor(private router: Router, private service: TranslocoService, private auth: AuthService) { }
  ngOnInit(): void {
    this.auth.requestLogInStatus();
    this.loggedIn$ = this.auth.getLogInStatus();
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
