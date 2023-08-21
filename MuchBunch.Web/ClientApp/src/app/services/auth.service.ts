import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBM } from '../models/BM/loginBM.model';
import { RegisterBM } from '../models/BM/registerBM.model';
import { TokenDto } from '../models/DTO/tokenDto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceBaseUrl = '';
  public user = new BehaviorSubject<UserModel | null>(null);
  RoleClaimName =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/user`;
  }

  login(loginModel: LoginBM): Observable<TokenDto> {
    console.log(loginModel);
    return this.http.post<TokenDto>(`${this.serviceBaseUrl}/login`, loginModel);
  }

  register(registerModel: RegisterBM): Observable<TokenDto> {
    console.log(registerModel);
    return this.http.post<TokenDto>(
      `${this.serviceBaseUrl}/register`,
      registerModel
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.user.next(null);
    console.log('Local storage cleared.');
  }

  autoLogin() {
    if (this.user.value == null) {
      if (localStorage.getItem('tokenInfo') != null) {
        let currentUser: UserModel = JSON.parse(
          localStorage.getItem('tokenInfo')
        );
        this.user.next(currentUser);
      }
    }
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
    let decodedToken = this.getDecodedAccessToken(token);
    let currentUser: UserModel = new UserModel(
      decodedToken['sub'],
      decodedToken['email'],
      decodedToken[`${this.RoleClaimName}`]
    );
    this.user.next(currentUser);
    console.log(this.user.value);
    localStorage.setItem('tokenInfo', JSON.stringify({ currentUser }));
    console.log('Stored');
  }
}