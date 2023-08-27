import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UpsertBunchModalComponent } from 'src/app/modals/upsert-bunch-modal/upsert-bunch-modal.component';
import { BunchDTO } from 'src/app/models/DTO/bunchDto.model';
import { UserDTO } from 'src/app/models/DTO/userDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { BunchService } from 'src/app/services/bunch.service';
import { RolesService } from 'src/app/services/role.service';

@Component({
  selector: 'app-my-bunches',
  templateUrl: './my-bunches.component.html',
  styleUrls: ['./my-bunches.component.css'],
})
export class MyBunchesComponent implements OnInit {
  public formGroup: FormGroup;

  public bunches: BunchDTO[];

  public isAdmin: boolean = false;
  public isCompany: boolean = false;

  public selectedCompany: any;
  public companies: UserDTO[];

  public shouldDisplayEmptyText: boolean = false;

  constructor(
    private bunchService: BunchService,
    private authService: AuthService,
    private fb: FormBuilder,
    private roleService: RolesService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((response) => {
      this.isAdmin = this.authService.getUserProperty('role') == 'admin';
      this.isCompany = this.authService.getUserProperty('role') == 'company';
    });

    if (this.isCompany) {
      this.bunchService
        .getBunchesByCompanyId(this.authService.user.value.id)
        .subscribe((response) => {
          this.bunches = response;

          if (response.length == 0) {
            this.shouldDisplayEmptyText = true;
          } else {
            this.shouldDisplayEmptyText = false;
          }
        });
    } else {
      this.roleService.getUsersByRole(2).subscribe((response) => {
        this.companies = response;
      });
    }

    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      companyId: [''],
    });
  }

  onEditBunch(bunch: BunchDTO) {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: 'Edit Bunch.',
      nzCentered: true,
      nzContent: UpsertBunchModalComponent,
      nzData: {
        isEditMode: true,
        bunch: bunch,
        companyId: this.selectedCompany,
      },
      nzWidth: 900,
      nzFooter: null,
    });
  }

  onSelectedCompany(selectedCompanyId: number) {
    if (selectedCompanyId) {
      this.bunchService
        .getBunchesByCompanyId(selectedCompanyId)
        .subscribe((response) => {
          this.shouldDisplayEmptyText = false;
          this.bunches = response;

          if (response.length == 0) {
            this.shouldDisplayEmptyText = true;
          } else {
            this.shouldDisplayEmptyText = false;
          }
        });
    }
  }
}