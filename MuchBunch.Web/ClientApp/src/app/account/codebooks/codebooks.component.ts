import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InsertProductTypeBM } from 'src/app/models/BM/insertProductTypeBM.model';
import { ProductSubtypeBM } from 'src/app/models/BM/productSubtypeBM.model';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { ProductService } from 'src/app/services/product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-codebooks',
  templateUrl: './codebooks.component.html',
  styleUrls: ['./codebooks.component.css'],
})
export class CodebooksComponent implements OnInit {
  public formGroup: FormGroup;

  public types: ProductTypeBM[];
  public subtypes: ProductSubtypeBM[] = [];

  public selectedType: ProductTypeBM;

  public isEditMode: boolean = false;
  public currentType: ProductTypeBM;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getProductTypes();
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      typeName: ['', Validators.required],
    });
  }

  getProductTypes() {
    this.productService.getTypes().subscribe((response) => {
      this.types = response;
      this.selectedType = this.types[0];
      this.onSelectedType(this.selectedType);
    });
  }

  onSelectedType(type: ProductTypeBM) {
    if (type != null) {
      this.productService
        .getSubtypesByParentId(type.id)
        .subscribe((response) => {
          this.subtypes = response;
        });
    }
  }

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(controlInstance?: string): void {
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `${controlInstance}`,
    };

    let index = this.listOfControl.push(control);
    this.formGroup.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl('', Validators.required)
    );
    this.goToBottom();
  }

  removeField(
    i: { id: number; controlInstance: string },
    e?: MouseEvent
  ): void {
    e?.preventDefault();

    if (this.listOfControl.length > 0) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.formGroup.removeControl(i.controlInstance);
    }
  }

  deleteButton(i: { id: number; controlInstance: string }, e?: MouseEvent) {
    e?.preventDefault();

    if (this.isEditMode == true) {
      this.callConfirmModal(
        'Warning.',
        `Are you sure you want to delete ${this.currentType.name}?`
      );
    } else {
      this.removeField(i);
    }
  }

  submitForm(controlId: number) {
    console.log(controlId);
    let typename: string = this.formGroup.get(
      `${this.listOfControl.find((e) => e.id === controlId).controlInstance}`
    ).value;

    console.log(this.isEditMode);

    if (this.isEditMode == false) {
      let type: InsertProductTypeBM = new InsertProductTypeBM(typename);

      console.log('unutar if petlje');
      this.productService.addNewType(type).subscribe(() => {
        console.log('unutar subscribea');
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.getProductTypes();
        this.message.success(`Type ${typename} was successfully added.`);
      });
    } else {
      let editType: ProductTypeBM = new ProductTypeBM(
        this.currentType.id,
        typename
      );

      this.productService.editType(editType).subscribe(() => {
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.getProductTypes();
        this.message.success(`Type ${typename} was successfully edited.`);
        this.isEditMode = false;
        this.currentType = null;
      });
    }
  }

  editForm(type: ProductTypeBM) {
    this.isEditMode = true;
    this.currentType = type;
    this.types.splice(
      this.types.findIndex((e) => e.id === type.id),
      1
    );
    this.addField(type.name);
    this.formGroup
      .get(
        `${
          this.listOfControl.find((e) => e.controlInstance === type.name)
            .controlInstance
        }`
      )
      .setValue(`${type.name}`);
  }

  goToBottom() {
    const element = document.getElementById('scrollIntoView');
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  callConfirmModal(title: string, text: string) {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: title,
      nzCentered: true,
      nzModalType: 'confirm',
      nzContent: text,
      nzOnOk: () => {
        this.productService.removeType(this.currentType.id).subscribe(() => {
          modal.destroy();
          this.message.success(
            `Type ${this.currentType.name} was successfully removed.`
          );
          this.removeField(
            this.listOfControl.find(
              (e) => e.controlInstance === this.currentType.name
            )
          );
          this.isEditMode = false;
        });
      },
      nzOnCancel: () => {
        this.getProductTypes();
        this.removeField(
          this.listOfControl.find(
            (e) => e.controlInstance === this.currentType.name
          )
        );
      },
    });
  }
}
