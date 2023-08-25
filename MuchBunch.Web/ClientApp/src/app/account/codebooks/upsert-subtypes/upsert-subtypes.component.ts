import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { InsertProductSubtypeBM } from 'src/app/models/BM/insertProductSubtypeBM.model';
import { InsertProductTypeBM } from 'src/app/models/BM/insertProductTypeBM.model';
import { ProductSubtypeBM } from 'src/app/models/BM/productSubtypeBM.model';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-upsert-subtypes',
  templateUrl: './upsert-subtypes.component.html',
  styleUrls: ['./upsert-subtypes.component.css'],
})
export class UpsertSubtypesComponent {
  public formGroup: FormGroup;

  public types: ProductTypeBM[];
  public subtypes: ProductSubtypeBM[] = [];

  public selectedType: ProductTypeBM;

  public isEditMode: boolean = false;
  public currentSubtype: ProductTypeBM;

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
      subtypeName: ['', Validators.required],
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
        `Are you sure you want to delete ${this.currentSubtype.name}?`
      );
    } else {
      this.removeField(i);
    }
  }

  submitForm(controlId: number) {
    let subtypename: string = this.formGroup.get(
      `${this.listOfControl.find((e) => e.id === controlId).controlInstance}`
    ).value;

    if (this.isEditMode == false) {
      let subtype: InsertProductSubtypeBM = new InsertProductSubtypeBM(
        subtypename,
        this.selectedType.id
      );
      console.log(subtype);

      this.productService.addNewSubtype(subtype).subscribe(() => {
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.onSelectedType(this.selectedType);
        this.message.success(`Subtype ${subtypename} was successfully added.`);
      });
    } else {
      let editSubtype: ProductSubtypeBM = new ProductSubtypeBM(
        this.currentSubtype.id,
        subtypename,
        this.selectedType.id
      );

      this.productService.editSubtype(editSubtype).subscribe(() => {
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.onSelectedType(this.selectedType);
        this.message.success(`Subtype ${subtypename} was successfully edited.`);
        this.isEditMode = false;
        this.currentSubtype = null;
      });
    }
  }

  editForm(subtype: ProductTypeBM) {
    this.isEditMode = true;
    this.currentSubtype = subtype;
    this.subtypes.splice(
      this.subtypes.findIndex((e) => e.id === subtype.id),
      1
    );
    this.addField(subtype.name);
    this.formGroup
      .get(
        `${
          this.listOfControl.find((e) => e.controlInstance === subtype.name)
            .controlInstance
        }`
      )
      .setValue(`${subtype.name}`);
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
        this.productService
          .removeSubtype(this.currentSubtype.id)
          .subscribe(() => {
            modal.destroy();
            this.message.success(
              `Subtype ${this.currentSubtype.name} was successfully removed.`
            );
            this.removeField(
              this.listOfControl.find(
                (e) => e.controlInstance === this.currentSubtype.name
              )
            );
            this.isEditMode = false;
          });
      },
      nzOnCancel: () => {
        this.getProductTypes();
        this.removeField(
          this.listOfControl.find(
            (e) => e.controlInstance === this.currentSubtype.name
          )
        );
      },
    });
  }
}
