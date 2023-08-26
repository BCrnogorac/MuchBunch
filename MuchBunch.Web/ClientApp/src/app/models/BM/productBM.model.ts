import { ProductSubtypeBM } from './productSubtypeBM.model';
import { ProductTypeBM } from './productTypeBM.model';

export class ProductBM {
  name: string;
  imageUrl: string;
  type: ProductTypeBM;
  subtypes: ProductSubtypeBM[];
  price: number;
  quantity: number;
  companyId?: number;
}
