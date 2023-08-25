import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleDTO } from '../models/DTO/roleDto.model';
import { InsertRoleBM } from '../models/BM/insertRoleBM.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/role`;
  }

  getRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(`${this.serviceBaseUrl}`);
  }

  addNewRole(role: InsertRoleBM): Observable<InsertRoleBM> {
    return this.http.post<InsertRoleBM>(`${this.serviceBaseUrl}`, role);
  }

  editRole(role: RoleDTO): Observable<RoleDTO> {
    return this.http.post<RoleDTO>(`${this.serviceBaseUrl}/edit`, role);
  }

  removeRole(roleId: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceBaseUrl}/${roleId}`);
  }
}
