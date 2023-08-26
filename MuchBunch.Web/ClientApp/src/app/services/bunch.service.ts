import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BunchDTO } from '../models/DTO/bunchDto.model';
import { Observable } from 'rxjs';

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
}
