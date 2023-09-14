import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { AddNewProductModalComponentComponent } from 'src/app/modals/add-new-product-modal-component/add-new-product-modal-component.component';
import { ProductBM } from 'src/app/models/BM/productBM.model';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { ProductDTO } from 'src/app/models/DTO/productDto.model';
import { TypeProductDto } from 'src/app/models/DTO/typeProductsDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  public productTypes: ProductTypeBM[];
  public products: ProductDTO[];
  public productsByCompany: TypeProductDto[];

  private typesSubscription: Subscription;

  public isAdmin: boolean = false;
  public isCompany: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      this.isAdmin = this.authService.getUserProperty('role') == 'admin';
      this.isCompany = this.authService.getUserProperty('role') == 'company';
    });
    if (this.isCompany === true) {
      this.productService
        .getProductsByTypeByCompany(this.authService.user.value.id)
        .subscribe((response) => {
          this.productsByCompany = response;
        });
    }
    this.getTypes();
  }

  getTypes() {
    this.typesSubscription = this.route.data.subscribe((data) => {
      this.productTypes = data.types;
    });
  }

  onSelectedPanel(productTypeId: number) {
    if (this.isAdmin) {
      this.productService
        .getProductsByType(productTypeId)
        .subscribe((response) => {
          this.products = response;
        });
    } else {
      this.products = this.productsByCompany.find(
        (e) => e.type.id === productTypeId
      )?.products;
    }
  }

  ngOnDestroy() {
    if (this.typesSubscription) {
      this.typesSubscription.unsubscribe();
    }
  }

  onEditProduct(product: ProductDTO) {
    const modal: NzModalRef = this.modalService.create({
      nzCentered: true,
      nzContent: AddNewProductModalComponentComponent,
      nzData: {
        isEditMode: true,
        product: product,
      },
      nzWidth: 900,
      nzFooter: null,
    });
  }

  onDeleteProduct(product: ProductDTO) {
    this.callConfirmModal(
      'Warning.',
      `Are you sure you want to delete ${product.name}?`,
      product
    );
  }

  callConfirmModal(title: string, text: string, product: ProductDTO) {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: title,
      nzCentered: true,
      nzModalType: 'confirm',
      nzContent: text,
      nzOnOk: () => {
        this.productService.deleteProduct(product.id).subscribe(() => {
          modal.destroy();
          this.message.success(
            `Type ${product.name} was successfully removed.`
          );

          if (this.isAdmin) {
            this.productService
              .getProductsByType(product.type.id)
              .subscribe((response) => {
                this.products = response;
              });
          } else {
            this.productService
              .getProductsByTypeByCompany(this.authService.user.value.id)
              .subscribe((response) => {
                this.productsByCompany = response;

                this.products = this.productsByCompany.find(
                  (e) => e.type.id === product.type.id
                )?.products;

                console.log(this.products);
              });
          }
        });
      },
    });
  }
}
