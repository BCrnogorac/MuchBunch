import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
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

  public companies: UserDTO[];
  public products: ProductDTO[];
  public themes: ThemeDto[];

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

      this.themeService.getThemes().subscribe((response) => {
        this.themes = response;
        this.themes.splice(0, 1);
      });

      if (this.isCompany == true) {
        this.authService.getUserProducts(this.authService.user.value.id);
      }
    }

    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      companyId: [null],
      name: ['', Validators.required],
      themeCheckbox: [],
      themeId: [null],
      imageUrl: ['', Validators.required],
      productIds: [[], Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern('^(?:\\d*\\.)?\\d+$')],
      ],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onSelectedThemeCheckbox(isThemedCheckbox: boolean) {
    this.shouldShowThemeSelect = isThemedCheckbox;
  }

  onSelectedCompany(selectedCompanyId: number) {
    console.log(selectedCompanyId);
    if (selectedCompanyId) {
      this.authService
        .getUserProducts(selectedCompanyId)
        .subscribe((response) => {
          this.products = response;
        });
    }
  }

  getFormValues(): void {
    // if (this.nzModalData.isEditMode == false) {
    //   this.insertProduct();
    // }
    this.insertProduct();
  }

  insertProduct() {
    if (this.formGroup.valid) {
      let formModel: BunchDTO = this.formGroup.getRawValue();
      formModel.themeCheckbox = null;
      console.log(formModel);

      if (this.isThemedCheckbox === false) {
        formModel.themeId = 0;
      }

      if (this.isCompany) {
        formModel.companyId = this.authService.user.value.id;
        console.log(formModel);
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

  // editProduct() {
  //   if (this.formGroup.valid) {
  //     let formModel: ProductDTO = this.formGroup.getRawValue();
  //     formModel.id = this.selectedProduct.id;

  //     if (this.isCompany) {
  //       formModel.company = this.authService.user.value;
  //     } else {
  //       formModel.company = this.companies.find(
  //         (e) => e.id === this.selectedCompany
  //       );
  //     }

  //     this.productService.editProduct(formModel).subscribe(() => {
  //       this.modalRef.triggerOk();
  //       this.modalRef.destroy();
  //       this.message.success(
  //         `Product ${formModel.name} was successfully edited.`
  //       );
  //     });
  //   } else {
  //     Object.values(this.formGroup.controls).forEach((control) => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }
}
