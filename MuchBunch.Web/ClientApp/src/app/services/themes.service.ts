import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeBM } from '../models/BM/themeBM.model';
import { EditThemeBM } from '../models/BM/editThemeBM.model';
import { ThemeDto } from '../models/DTO/themeDto.model';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/theme`;
  }

  getThemes(): Observable<ThemeDto[]> {
    return this.http.get<ThemeDto[]>(`${this.serviceBaseUrl}`);
  }

  addNewTheme(theme: ThemeBM): Observable<ThemeBM> {
    return this.http.post<ThemeBM>(`${this.serviceBaseUrl}`, theme);
  }

  editTheme(theme: EditThemeBM): Observable<EditThemeBM> {
    return this.http.post<EditThemeBM>(`${this.serviceBaseUrl}/edit`, theme);
  }

  removeTheme(themeId: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceBaseUrl}/${themeId}`);
  }
}
