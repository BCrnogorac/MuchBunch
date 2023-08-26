import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { AddNewProductModalComponentComponent } from '../modals/add-new-product-modal-component/add-new-product-modal-component.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(private modalService: NzModalService) {}

  ngOnInit() {}

  addNewProduct() {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: 'Create new Product.',
      nzCentered: true,
      nzContent: AddNewProductModalComponentComponent,
      nzData: {
        isEditMode: false,
      },
      nzWidth: 900,
      nzFooter: null,
    });
  }

  showEditModal() {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: 'Edit Product.',
      nzCentered: true,
      nzContent: AddNewProductModalComponentComponent,
      nzData: {
        isEditMode: true,
      },
      nzWidth: 900,
      nzFooter: null,
    });
  }
}
