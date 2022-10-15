import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

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

  constructor(private router: Router, private service: TranslocoService, ) {}
  ngOnInit(): void { }

  changeSiteLanguage(language: any): void {
    const lang = language.target.value
    this.service.setActiveLang(lang);
    this.selected = this.languageList.find(f => f.code === lang)!;
  }
  
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  onChange() {

    window.location.href = `/${this.activeLocale}`;
  }
}
