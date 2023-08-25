import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = (): boolean => true;

  //user or roles info
  isAuthed: boolean = false;
  companyRole: boolean = false;
  adminRole: boolean = false;

  homeRoute: boolean = true;
  browseRoute: boolean = false;
  administrationRoute: boolean = false;
  aboutRoute: boolean = false;
  registerRoute: boolean = false;
  loginRoute: boolean = false;
  profileRoute: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      if (response == null) {
        this.authService.autoLogin();
      }

      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.companyRole = this.authService.getUserProperty('role') == 'company';
      this.adminRole = this.authService.getUserProperty('role') == 'admin';

      this.routeResolver();
    });
  }

  search(value: string): void {
    this.httpClient
      .jsonp<{ result: Array<[string, string]> }>(
        `https://suggest.taobao.com/sug?code=utf-8&q=${value}`,
        'callback'
      )
      .subscribe((data) => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.result.forEach((item) => {
          listOfOption.push({
            value: item[0],
            text: item[0],
          });
        });
        this.listOfOption = listOfOption;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.message.success('Logged out.');
  }

  routeResolver() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((navEnd: NavigationEnd) => {
        switch (navEnd.urlAfterRedirects) {
          case '/home':
            this.homeRoute = true;
            this.browseRoute = false;
            this.administrationRoute = false;
            this.aboutRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            break;
          case '/browse':
            this.homeRoute = false;
            this.browseRoute = true;
            this.administrationRoute = false;
            this.aboutRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            break;
          case '/administration':
            this.homeRoute = false;
            this.browseRoute = false;
            this.administrationRoute = true;
            this.aboutRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            break;
          case '/about':
            this.homeRoute = false;
            this.browseRoute = false;
            this.administrationRoute = false;
            this.aboutRoute = true;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            break;
          case '/register':
            this.homeRoute = false;
            this.browseRoute = false;
            this.administrationRoute = false;
            this.aboutRoute = false;
            this.registerRoute = true;
            this.loginRoute = false;
            this.profileRoute = false;
            break;
          case '/login':
            this.homeRoute = false;
            this.browseRoute = false;
            this.administrationRoute = false;
            this.aboutRoute = false;
            this.registerRoute = false;
            this.loginRoute = true;
            this.profileRoute = false;
            break;
          case '/profile':
            this.homeRoute = false;
            this.browseRoute = false;
            this.administrationRoute = false;
            this.aboutRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = true;
            break;
          case '/codebooks':
            this.homeRoute = false;
            this.browseRoute = false;
            this.administrationRoute = false;
            this.aboutRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = true;
            break;
        }
      });
  }
}
