import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SubscribeBM } from 'src/app/models/BM/subscribeBM.model';
import { UserOrderDto } from 'src/app/models/DTO/UserOrderDto.model';
import { UserDTO } from 'src/app/models/DTO/userDto.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public user: UserDTO;
  public orders: UserOrderDto[];
  public ordersCount: number;

  public isSubscribed: boolean;

  constructor(
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((response) => {
      this.user = response;
      this.orders = response.orders;
      this.ordersCount = this.orders.length;

      this.isSubscribed = response.isSubscribed;

      console.log(this.ordersCount);
    });
  }

  onSubscriptionChange(isSubscribed: boolean) {
    let subscription: SubscribeBM = new SubscribeBM(this.user.id, isSubscribed);
    this.authService.updateSubscribeStatus(subscription).subscribe((_) => {
      this.message.success(`You are now subscribed to MuchBunch newsletter!`);
      this.authService.user.value.isSubscribed = isSubscribed;
      localStorage.setItem(
        'tokenInfo',
        JSON.stringify(this.authService.user.value)
      );
    });
  }
}
