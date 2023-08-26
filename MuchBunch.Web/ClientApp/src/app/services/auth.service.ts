import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBM } from '../models/BM/loginBM.model';
import { RegisterBM } from '../models/BM/registerBM.model';
import { TokenDto } from '../models/DTO/tokenDto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserModel } from '../models/user.model';
import { RoleDTO } from '../models/DTO/roleDto.model';
import { UserDTO } from '../models/DTO/userDto.model';
import { ProductBM } from '../models/BM/productBM.model';
import { ProductDTO } from '../models/DTO/productDto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceBaseUrl = '';
  public user = new BehaviorSubject<UserDTO | null>(null);
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
    return this.http.post<TokenDto>(`${this.serviceBaseUrl}/login`, loginModel);
  }

  register(registerModel: RegisterBM): Observable<TokenDto> {
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
        let currentUser: UserDTO = JSON.parse(
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
    let currentUser: UserDTO = new UserDTO(
      decodedToken['sub'],
      decodedToken['name'],
      decodedToken['email'],
      decodedToken[`${this.RoleClaimName}`]
    );
    this.user.next(currentUser);
    localStorage.setItem('tokenInfo', JSON.stringify(currentUser));
    console.log('Stored');
  }

  getUserProperty(property?: string): string {
    if (this.user.value != null) {
      return this.user.value[`${property}`];
    }
    return null;
  }

  getUserProducts(companyId: number): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(
      `${this.serviceBaseUrl}/${companyId}/products`
    );
  }
}
