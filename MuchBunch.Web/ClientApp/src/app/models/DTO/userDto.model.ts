import { UserOrderDto } from './UserOrderDto.model';

export class UserDTO {
  id: number;
  name: string;
  email: string;
  role: string;
  isSubscribed: boolean;
  orders?: UserOrderDto[];

  constructor(
    id: number,
    name: string,
    email: string,
    role: string,
    isSubscribed: boolean,
    orders?: UserOrderDto[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.isSubscribed = isSubscribed;
    this.orders = orders;
  }
}
