export class RegisterUserModel {
  public username: string;
  public email: string;
  public hashedPassword: string;

  constructor(username: string, email: string, hashedPassword: string) {
    this.username = username;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}
