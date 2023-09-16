import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs';
import { BunchDTO } from 'src/app/models/DTO/bunchDto.model';
import { BunchService } from 'src/app/services/bunch.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ViewBunchComponent } from 'src/app/modals/view-bunch/view-bunch.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public bunches: BunchDTO[] = [];

  public selectedValue: any;

  //user or roles info
  public isAuthed: boolean = false;
  public companyRole: boolean = false;
  public adminRole: boolean = false;
  public username: string = '';

  public homeRoute: boolean = true;
  public browseRoute: boolean = false;
  public administrationRoute: boolean = false;
  public aboutRoute: boolean = false;
  public registerRoute: boolean = false;
  public loginRoute: boolean = false;
  public profileRoute: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
    private bunchService: BunchService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      if (response == null) {
        this.authService.autoLogin();
      } else {
        this.username = response.name;
      }

      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.companyRole = this.authService.getUserProperty('role') == 'company';
      this.adminRole = this.authService.getUserProperty('role') == 'admin';

      this.routeResolver();

      this.bunchService.getBunches().subscribe((response) => {
        this.bunches = response;
      });
    });
  }

  onSelectedBunch(selectedBunch: BunchDTO) {
    if (selectedBunch != null) {
      const modal: NzModalRef = this.modalService.create({
        nzTitle: '',
        nzCentered: true,
        nzContent: ViewBunchComponent,
        nzData: {
          isEditMode: false,
          bunch: selectedBunch,
        },
        nzWidth: 1200,
        nzFooter: null,
      });
    }
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
          case '/my-bunches':
            this.homeRoute = false;
            this.browseRoute = false;
            this.administrationRoute = false;
            this.aboutRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = true;
            break;
          case '/inventory':
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
