import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginBM } from '../models/userLoginBM.model';
import { RegisterUserModel } from '../models/registerUser.model';
import { TokenDto } from '../models/tokenDto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceBaseUrl = '';
  //user = new BehaviorSubject<User>(null);

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/user`;
  }

  login(userModel: UserLoginBM): void {
    //Observable<TokenDto> {
    //return this.http.get<TokenDto>(`${this.serviceBaseUrl}/token`);
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWhlIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTIyNzQwMTgsImlzcyI6Imh0dHA6Ly93d3cubXVuY2hidW5jaC5jb20vYXBpIiwiYXVkIjoiaHR0cDovL3d3dy5tdW5jaGJ1bmNoLmNvbSJ9.27JNuhCZz7Wq_-w6sxUuWxs0z4grweY5ltyzNFSVwZw';
    let tokenInfo = this.getDecodedAccessToken(token);
    this.storeTokenToLocalStorage(tokenInfo);
  }

  register(registerUserModel: RegisterUserModel): void {
    console.log(registerUserModel);
  }

  getDecodedAccessToken(token: string): any {
    try {
      console.log(jwt_decode(token));
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  storeTokenToLocalStorage(token: string): void {
    localStorage.setItem('tokenInfo', JSON.stringify({ token: token }));
    console.log('Stored');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    console.log('Local storage cleared.');
  }
}
