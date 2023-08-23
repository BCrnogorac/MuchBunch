import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductTypeBM } from '../models/BM/productTypeBM.model';

@Injectable({ providedIn: 'root' })
export class productTypeResolver
  implements Resolve<Observable<ProductTypeBM[]>>
{
  constructor(private service: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductTypeBM[]> {
    return this.service.getTypes();
  }
}
