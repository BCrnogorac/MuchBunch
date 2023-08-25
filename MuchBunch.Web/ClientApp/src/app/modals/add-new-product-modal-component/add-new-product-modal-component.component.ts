import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProductSubtypeBM } from 'src/app/models/BM/productSubtypeBM.model';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-new-product-modal-component',
  templateUrl: './add-new-product-modal-component.component.html',
  styleUrls: ['./add-new-product-modal-component.component.css'],
})
export class AddNewProductModalComponentComponent implements OnInit {
  public formGroup: FormGroup;

  public selectedType: any = null;
  public shouldRestartSubtypes: boolean = false;

  public types: ProductTypeBM[];
  public subtypes: ProductSubtypeBM[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private modalRef: NzModalRef,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.productService.getTypes().subscribe((response) => {
      this.types = response;
    });
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      type: ['', Validators.required],
      subtypes: [null, Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  getFormValues(): void {
    if (this.formGroup.valid) {
      let formModel = this.formGroup.getRawValue();
      let productName = formModel.name;
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

  onSelectedType(type: ProductTypeBM) {
    if (type != null) {
      this.formGroup.get('subtypes').setValue(null);
      this.productService
        .getSubtypesByParentId(type.id)
        .subscribe((response) => {
          this.subtypes = response;
        });
    }
  }
}
