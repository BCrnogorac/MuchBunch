import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ProductBM } from 'src/app/models/BM/productBM.model';
import { ProductSubtypeBM } from 'src/app/models/BM/productSubtypeBM.model';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { ProductDTO } from 'src/app/models/DTO/productDto.model';
import { UserDTO } from 'src/app/models/DTO/userDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { RolesService } from 'src/app/services/role.service';

interface IModalData {
  isEditMode: boolean;
  product?: ProductDTO;
}

@Component({
  selector: 'app-add-new-product-modal-component',
  templateUrl: './add-new-product-modal-component.component.html',
  styleUrls: ['./add-new-product-modal-component.component.css'],
})
export class AddNewProductModalComponentComponent implements OnInit {
  public formGroup: FormGroup;

  public selectedType: any = null;
  public selectedProduct: any = null;
  public selectedCompany: any = null;
  public selectedSubtypes: any = null;
  public shouldRestartSubtypes: boolean = false;

  public types: ProductTypeBM[];
  public subtypes: ProductSubtypeBM[] = [];

  public isAdmin: boolean = false;
  public isCompany: boolean = false;
  public companies: UserDTO[];
  public products: ProductDTO[];

  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private authService: AuthService,
    private roleService: RolesService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      this.isAdmin = this.authService.getUserProperty('role') == 'admin';
      this.isCompany = this.authService.getUserProperty('role') == 'company';
    });

    if (this.isAdmin && !this.nzModalData.product) {
      //company role id is 2
      this.roleService.getUsersByRole(2).subscribe((response) => {
        this.companies = response;
      });
    }

    this.productService.getTypes().subscribe((response) => {
      this.types = response;

      if (
        this.nzModalData.product != null &&
        this.nzModalData.isEditMode == true
      ) {
        this.initEditFormThroughInventory(this.nzModalData.product);
      }
    });

    if (this.nzModalData.isEditMode == true && !this.isAdmin) {
      this.getProductDetails();
    }

    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      product: [null],
      companyId: [null],
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      type: [null, Validators.required],
      subtypes: [null, Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern('^(?:\\d*\\.)?\\d+$')],
      ],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  initEditForm(product: ProductDTO): void {
    this.selectedProduct = this.products.find((p) => p.id === product.id);

    this.selectedType = this.types.find(
      (e) => e.id === this.selectedProduct.type.id
    );

    this.formGroup = this.fb.group({
      product: [this.selectedProduct],
      company: [product.company],
      name: [this.selectedProduct.name, Validators.required],
      imageUrl: [product.imageUrl, Validators.required],
      type: [this.selectedType, Validators.required],
      subtypes: [product.subTypes, Validators.required],
      price: [
        product.price,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      quantity: [
        product.quantity,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
  }

  initEditFormThroughInventory(product: ProductDTO): void {
    this.selectedType = this.types.find((e) => e.id === product.type.id);

    this.formGroup = this.fb.group({
      product: [null],
      company: [product.company],
      name: [product.name, Validators.required],
      imageUrl: [product.imageUrl, Validators.required],
      type: [this.selectedType, Validators.required],
      subtypes: [product.subTypes, Validators.required],
      price: [
        product.price,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      quantity: [
        product.quantity,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
  }

  getProductDetails(companyId?: number) {
    if (companyId != null) {
      this.authService.getUserProducts(companyId).subscribe((response) => {
        this.products = response;
      });
    } else {
      this.authService
        .getUserProducts(this.authService.user.value.id)
        .subscribe((response) => {
          this.products = response;
        });
    }
  }

  getFormValues(): void {
    if (this.nzModalData.isEditMode == false) {
      this.insertProduct();
    } else {
      this.editProduct();
    }
  }

  insertProduct() {
    if (this.formGroup.valid) {
      let formModel: ProductDTO = this.formGroup.getRawValue();
      let productName = formModel.name;

      if (this.isCompany) {
        formModel.company = this.authService.user.value;
      }

      this.productService.addNewProduct(formModel).subscribe(() => {
        this.modalRef.triggerOk();
        this.modalRef.destroy();
        this.message.success(`Product ${productName} was successfully added.`);
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

  editProduct() {
    if (this.formGroup.valid) {
      let formModel: ProductDTO = this.formGroup.getRawValue();
      formModel.id = this.selectedProduct.id;

      if (this.isCompany) {
        formModel.company = this.authService.user.value;
      } else {
        formModel.company = this.companies.find(
          (e) => e.id === this.selectedCompany
        );
      }

      this.productService.editProduct(formModel).subscribe(() => {
        this.modalRef.triggerOk();
        this.modalRef.destroy();
        this.message.success(
          `Product ${formModel.name} was successfully edited.`
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

  onSelectedType(type: ProductTypeBM) {
    if (type != null) {
      if (this.nzModalData.isEditMode == false) {
        this.formGroup.get('subtypes').setValue(null);
      }

      this.productService
        .getSubtypesByParentId(type.id)
        .subscribe((response) => {
          this.subtypes = response;

          if (this.nzModalData.product != null) {
            var productSubtypesIds: number[] =
              this.nzModalData.product?.subTypes.map((st) => st.id);
          } else {
            var productSubtypesIds: number[] =
              this.selectedProduct?.subTypes.map((st) => st.id);
          }

          this.selectedSubtypes = this.subtypes.filter((st) =>
            productSubtypesIds?.find((e) => e === st.id)
          );
        });
    }
  }

  onSelectedProduct(product: ProductDTO) {
    if (product != null && product?.id != null) {
      this.initEditForm(product);
    }
  }

  onSelectedCompany(companyId: number) {
    if (companyId != null) {
      this.getProductDetails(companyId);
    }
  }
}
