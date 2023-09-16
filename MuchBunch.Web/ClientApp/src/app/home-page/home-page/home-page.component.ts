import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ViewBunchComponent } from 'src/app/modals/view-bunch/view-bunch.component';
import { BunchDTO } from 'src/app/models/DTO/bunchDto.model';
import { ThemeDto } from 'src/app/models/DTO/themeDto.model';
import { UserDTO } from 'src/app/models/DTO/userDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/role.service';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  //info about user
  public isAuthed: boolean = false;
  public companyRole: boolean = false;
  public adminRole: boolean = false;

  public companies: UserDTO[];
  public themedBunches: BunchDTO[] = [];
  public themes: ThemeDto[] = [];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private roleService: RolesService,
    private themeService: ThemesService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.companyRole = this.authService.getUserProperty('role') == 'company';
      this.adminRole = this.authService.getUserProperty('role') == 'admin';
    });

    this.roleService.getUsersByRole(2).subscribe((response) => {
      this.companies = response;
    });

    this.themeService.getThemes().subscribe((response) => {
      this.themes = response;

      this.themeService
        .getBunchesByThemeId(this.themes.find((e) => e.isActive === true).id)
        .subscribe((response) => {
          this.themedBunches = response.bunches;
        });
    });
  }

  onViewBunch(bunch: BunchDTO) {
    const modal: NzModalRef = this.modalService.create({
      nzCentered: true,
      nzContent: ViewBunchComponent,
      nzData: {
        isEditMode: true,
        bunch: bunch,
      },
      nzWidth: 1200,
      nzFooter: null,
    });
  }
}
