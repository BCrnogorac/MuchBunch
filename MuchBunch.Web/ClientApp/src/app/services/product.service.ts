import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductBM } from '../models/BM/productBM.model';
import { ProductTypeBM } from '../models/BM/productTypeBM.model';
import { ProductSubtypeBM } from '../models/BM/productSubtypeBM.model';
import { InsertProductTypeBM } from '../models/BM/insertProductTypeBM.model';
import { InsertProductSubtypeBM } from '../models/BM/insertProductSubtypeBM.model';
import { ProductDTO } from '../models/DTO/productDto.model';
import { EditProductBM } from '../models/BM/editProductBM.model';

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

  editProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.serviceBaseUrl}/edit`, product);
  }

  addNewType(type: InsertProductTypeBM): Observable<InsertProductTypeBM> {
    return this.http.post<InsertProductTypeBM>(
      `${this.serviceBaseUrl}Type`,
      type
    );
  }

  addNewSubtype(
    subtype: InsertProductSubtypeBM
  ): Observable<InsertProductSubtypeBM> {
    return this.http.post<InsertProductSubtypeBM>(
      `${this.serviceBaseUrl}SubType`,
      subtype
    );
  }

  editType(type: ProductTypeBM): Observable<ProductTypeBM> {
    return this.http.post<ProductTypeBM>(
      `${this.serviceBaseUrl}Type/edit`,
      type
    );
  }

  editSubtype(subtype: ProductSubtypeBM): Observable<ProductSubtypeBM> {
    return this.http.post<ProductSubtypeBM>(
      `${this.serviceBaseUrl}SubType/edit`,
      subtype
    );
  }

  removeType(typeId: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceBaseUrl}Type/${typeId}`);
  }

  removeSubtype(subtypeId: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceBaseUrl}SubType/${subtypeId}`);
  }
}
