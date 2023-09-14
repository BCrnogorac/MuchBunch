export class UserModel {
  name: string;
  email: string;
  role: string;
  isSubscribed: boolean;

  constructor(
    name: string,
    email: string,
    role: string,
    isSubscribed: boolean
  ) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.isSubscribed = isSubscribed;
  }
}
