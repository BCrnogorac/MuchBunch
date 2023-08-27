import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { EditBunchBM } from 'src/app/models/BM/editBunch.model';
import { ProductSubtypeBM } from 'src/app/models/BM/productSubtypeBM.model';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { BunchDTO } from 'src/app/models/DTO/bunchDto.model';
import { ProductDTO } from 'src/app/models/DTO/productDto.model';
import { ThemeDto } from 'src/app/models/DTO/themeDto.model';
import { UserDTO } from 'src/app/models/DTO/userDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { BunchService } from 'src/app/services/bunch.service';
import { ProductService } from 'src/app/services/product.service';
import { RolesService } from 'src/app/services/role.service';
import { ThemesService } from 'src/app/services/themes.service';

interface IModalData {
  isEditMode: boolean;
  product?: ProductDTO;
}

@Component({
  selector: 'app-upsert-bunch-modal',
  templateUrl: './upsert-bunch-modal.component.html',
  styleUrls: ['./upsert-bunch-modal.component.css'],
})
export class UpsertBunchModalComponent {
  public formGroup: FormGroup;
  public isThemedCheckbox: boolean = false;

  public isAdmin: boolean = false;
  public isCompany: boolean = false;

  public selectedCompanyId: any;
  public selectedBunch: any;
  public selectedProducts: any;

  public companies: UserDTO[];
  public products: ProductDTO[];
  public themes: ThemeDto[];
  public bunches: BunchDTO[];

  public shouldShowThemeSelect: boolean = true;

  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private authService: AuthService,
    private roleService: RolesService,
    private themeService: ThemesService,
    private bunchService: BunchService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      this.isAdmin = this.authService.getUserProperty('role') == 'admin';
      this.isCompany = this.authService.getUserProperty('role') == 'company';
    });

    if (this.isAdmin) {
      //company role id is 2
      this.roleService.getUsersByRole(2).subscribe((response) => {
        this.companies = response;
      });
    }
    this.themeService.getThemes().subscribe((response) => {
      this.themes = response;
      this.themes.splice(0, 1);
    });

    if (this.isCompany) {
      this.authService
        .getUserProducts(this.authService.user.value.id)
        .subscribe((response) => {
          this.products = response;
        });
    }

    if (this.nzModalData.isEditMode == true) {
      this.getUserBunches();
    }

    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      companyId: [null],
      bunch: [''],
      name: ['', Validators.required],
      themeCheckbox: [],
      themeId: [null],
      imageUrl: ['', Validators.required],
      productIds: [[], Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern('^(?:\\d*\\.)?\\d+$')],
      ],
    });
  }

  initEditForm(bunch: EditBunchBM): void {
    if (bunch.theme.id != 0) {
      this.isThemedCheckbox = true;
    }

    console.log(this.products);

    this.selectedProducts = this.products.filter((p) =>
      bunch.products.find((e) => e.id === p.id)
    );

    this.formGroup = this.fb.group({
      companyId: [bunch.company.id],
      bunch: [bunch],
      name: [bunch.name, Validators.required],
      themeCheckbox: [],
      themeId: [bunch.theme.id],
      imageUrl: [bunch.imageUrl, Validators.required],
      productIds: [this.selectedProducts.map((e) => e.id), Validators.required],
      price: [
        bunch.price,
        [Validators.required, Validators.pattern('^(?:\\d*\\.)?\\d+$')],
      ],
    });
  }

  onSelectedThemeCheckbox(isThemedCheckbox: boolean) {
    this.shouldShowThemeSelect = isThemedCheckbox;
  }

  onSelectedCompany(selectedCompanyId: number) {
    if (selectedCompanyId) {
      this.authService
        .getUserProducts(selectedCompanyId)
        .subscribe((response) => {
          this.products = response;
        });

      if (this.nzModalData.isEditMode) {
        this.bunchService
          .getBunchesByCompanyId(selectedCompanyId)
          .subscribe((response) => {
            this.bunches = response;
          });
      }
    }
  }

  getFormValues(): void {
    if (this.nzModalData.isEditMode == false) {
      this.insertBunch();
    } else {
      this.editBunch();
    }
  }

  insertBunch() {
    if (this.formGroup.valid) {
      let formModel: BunchDTO = this.formGroup.getRawValue();
      formModel.themeCheckbox = null;

      if (this.isThemedCheckbox === false) {
        formModel.themeId = 0;
      }

      if (this.isCompany) {
        formModel.companyId = this.authService.user.value.id;
      }

      this.bunchService.insertBunch(formModel).subscribe(() => {
        this.modalRef.triggerOk();
        this.modalRef.destroy();
        this.message.success(`Bunch ${formModel.name} was successfully added.`);
      });
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  editBunch() {
    if (this.formGroup.valid) {
      let formModel: BunchDTO = this.formGroup.getRawValue();

      formModel.id = formModel.bunch.id;
      formModel.bunch = null;
      formModel.themeCheckbox = null;

      if (this.isThemedCheckbox === false) {
        formModel.themeId = 0;
      }

      console.log(formModel);

      if (this.isCompany) {
        formModel.companyId = this.authService.user.value.id;
      }

      this.bunchService.editBunch(formModel).subscribe(() => {
        this.modalRef.triggerOk();
        this.modalRef.destroy();
        this.message.success(
          `Bunch ${formModel.name} was successfully edited.`
        );
      });
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getUserBunches() {
    this.bunchService
      .getBunchesByCompanyId(this.authService.user.value.id)
      .subscribe((response) => {
        this.bunches = response;
      });
  }

  onSelectedBunch(selectedBunch: EditBunchBM) {
    if (this.selectedBunch) {
      this.initEditForm(selectedBunch);
    }
  }
}
