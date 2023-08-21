import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserModel } from 'src/app/models/user.model';

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
  userCopy: UserModel;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      console.log('Header user');
      console.log(response);
      this.userCopy = response;

      if (response == null) {
        this.authService.autoLogin();
      }

      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.companyRole = this.authService.getUserProperty('role') == 'company';
      this.adminRole = this.authService.getUserProperty('role') == 'admin';
    });

    this.updateUserProperties();
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

  updateUserProperties() {
    console.log(this.isAuthed, this.adminRole);
  }
}
