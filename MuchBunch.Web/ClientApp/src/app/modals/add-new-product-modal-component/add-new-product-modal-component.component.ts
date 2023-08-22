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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-new-product-modal-component',
  templateUrl: './add-new-product-modal-component.component.html',
  styleUrls: ['./add-new-product-modal-component.component.css'],
})
export class AddNewProductModalComponentComponent implements OnInit {
  public formGroup: FormGroup;

  //todo: delete when model is added
  public types: string[] = ['board game', 'book', 'accessories', 'miniatures'];
  public subtypes: string[] = [
    'board game',
    'book',
    'accessories',
    'miniatures',
  ];

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private modalRef: NzModalRef,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      imgURL: ['', Validators.required],
      type: ['', Validators.required],
      subtype: [],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  getFormValues(): void {
    if (this.formGroup.valid) {
      let formModel = this.formGroup.getRawValue();
      console.log(formModel);

      //todo: ovo u subscribeu od metode
      this.modalRef.triggerOk();
      this.modalRef.destroy();
      this.message.success('Successfully added.');
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
