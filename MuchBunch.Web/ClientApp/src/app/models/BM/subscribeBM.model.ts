export class SubscribeBM {
  userId: number;
  isSubscribed: boolean;

  constructor(userId: number, isSubscribed: boolean) {
    this.userId = userId;
    this.isSubscribed = isSubscribed;
  }
}
