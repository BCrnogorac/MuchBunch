export class UserLoginBM {
  public email: string;
  public hashedPassword: string;

  constructor(email: string, hashedPassword: string) {
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}
