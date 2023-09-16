import { Component, OnInit, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { EditBunchBM } from 'src/app/models/BM/editBunch.model';
import { OrderBM } from 'src/app/models/BM/orderBM.model';
import { UserOrderDto } from 'src/app/models/DTO/UserOrderDto.model';
import { ProductDTO } from 'src/app/models/DTO/productDto.model';
import { UserDTO } from 'src/app/models/DTO/userDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { BunchService } from 'src/app/services/bunch.service';

interface IModalData {
  isEditMode: boolean;
  bunch?: EditBunchBM;
}

@Component({
  selector: 'app-view-bunch',
  templateUrl: './view-bunch.component.html',
  styleUrls: ['./view-bunch.component.css'],
})
export class ViewBunchComponent implements OnInit {
  public products: ProductDTO[] = [];

  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  private userId: number;
  private user: UserDTO;

  public shouldDisableBuyButton: boolean = false;
  public isAvailable: boolean = true;

  constructor(
    private authService: AuthService,
    private bunchService: BunchService,
    private modalRef: NzModalRef,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.products = this.nzModalData?.bunch.products;

    this.authService.user.subscribe((response) => {
      this.userId = response.id;
      this.user = response;

      this.isAvailable = !(this.products.find((e) => e.quantity == 0) != null);

      this.user.orders.forEach((order) => {
        if (order.bunch.id === this.nzModalData?.bunch.id) {
          this.shouldDisableBuyButton = true;
        }
      });
    });
  }

  onBuyBunch(bunch: EditBunchBM) {
    let order: OrderBM = new OrderBM(+this.userId, bunch.id);

    this.bunchService.placeOrder(order).subscribe((_) => {
      this.shouldDisableBuyButton = true;
      this.modalRef.triggerOk();
      this.modalRef.destroy();
      this.message.success(
        `MuchBunch ${bunch.name} was successfully ordered!.`
      );

      if (this.user.isSubscribed == false) {
        this.message.info(
          `Not subscribed to our newsletter? Be first to get MuchBunches and subscribe! Simply go to your account page and subscribe. You can unsubscribe anytime, but we promise we don't spam with e-mails.`
        );
      }

      this.authService.getUserOrders(this.userId).subscribe((response) => {
        this.authService.user.value.orders = response;
        localStorage.setItem(
          'tokenInfo',
          JSON.stringify(this.authService.user.value)
        );
      });
    });
  }
}
