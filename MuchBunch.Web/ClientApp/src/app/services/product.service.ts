import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductBM } from '../models/BM/productBM.model';
import { ProductTypeBM } from '../models/BM/productTypeBM.model';
import { ProductSubtypeBM } from '../models/BM/productSubtypeBM.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/product`;
  }

  addNewProduct(product: ProductBM): Observable<ProductBM> {
    console.log(product);
    return this.http.post<ProductBM>(`${this.serviceBaseUrl}`, product);
  }

  getTypes(): Observable<ProductTypeBM[]> {
    return this.http.get<ProductTypeBM[]>(`${this.serviceBaseUrl}type`);
  }

  getSubtypesByParentId(parentId: number): Observable<ProductSubtypeBM[]> {
    return this.http.get<ProductSubtypeBM[]>(
      `${this.serviceBaseUrl}subtype/${parentId}`
    );
  }

  getProducts(): Observable<ProductBM[]> {
    return this.http.get<ProductBM[]>(`${this.serviceBaseUrl}`);
  }

  getProductsByType(id: number): Observable<ProductBM[]> {
    return this.http.get<ProductBM[]>(`${this.serviceBaseUrl}/type/${id}`);
  }
}
