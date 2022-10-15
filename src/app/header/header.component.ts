import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  locales = [
    { code: 'en-US', name: 'English' },
    { code: 'uk', name: 'український' },
    { code: 'hu', name: 'magyar' },
  ];
  constructor(
    @Inject(LOCALE_ID) public activeLocale: string,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  onChange() {

    window.location.href = `/${this.activeLocale}`;
  }
}
