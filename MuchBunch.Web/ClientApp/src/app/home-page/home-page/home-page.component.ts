import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  //info about bundle
  array = [1, 2, 3, 4];
  imgSrc =
    'https://www.catan.com/sites/default/files/2021-08/3DBox_CATAN_0.png';
  bundleTitle = 'Bundle title';

  //info about alert txt
  alertTitle: string = 'Hello Company,';
  alertDecription: string =
    'The next month we are rolling out brand new MuchBunch themed Halloween. Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum';

  //info about user
  isAuthed: boolean = false;
  companyRole: boolean = false;
  adminRole: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.companyRole = this.authService.getUserProperty('role') == 'company';
      this.adminRole = this.authService.getUserProperty('role') == 'admin';
    });
  }
}
