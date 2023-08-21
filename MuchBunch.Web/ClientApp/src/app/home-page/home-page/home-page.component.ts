import { Component } from '@angular/core';

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
  companyUser: boolean = true;

  ngOnInit(): void {}
}
