import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = (): boolean => true;

  //user or roles info
  isAuthed: boolean = true;
  companyRole: boolean = true;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

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
  }
}
