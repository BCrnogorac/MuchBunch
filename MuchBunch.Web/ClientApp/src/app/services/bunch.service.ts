import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BunchDTO } from '../models/DTO/bunchDto.model';
import { Observable } from 'rxjs';
import { OrderBM } from '../models/BM/orderBM.model';
import { EditBunchBM } from '../models/BM/editBunch.model';

@Injectable({
  providedIn: 'root',
})
export class BunchService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/bunch`;
  }

  insertBunch(bunch: BunchDTO): Observable<BunchDTO> {
    return this.http.post<BunchDTO>(`${this.serviceBaseUrl}`, bunch);
  }

  getBunchesByCompanyId(companyId: number): Observable<BunchDTO[]> {
    return this.http.get<BunchDTO[]>(
      `${this.serviceBaseUrl}/user/${companyId}`
    );
  }

  getBunchById(id: number): Observable<EditBunchBM[]> {
    return this.http.get<EditBunchBM[]>(`${this.serviceBaseUrl}/${id}`);
  }

  deleteBunch(bunchId: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceBaseUrl}/${bunchId}`);
  }

  editBunch(bunch: BunchDTO): Observable<BunchDTO> {
    return this.http.post<BunchDTO>(`${this.serviceBaseUrl}/edit`, bunch);
  }

  getBunches() {
    return this.http.get<BunchDTO[]>(`${this.serviceBaseUrl}`);
  }

  placeOrder(order: OrderBM): Observable<void> {
    return this.http.post<void>(`${this.serviceBaseUrl}/order`, order);
  }
}
