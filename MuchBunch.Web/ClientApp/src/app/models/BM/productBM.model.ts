import { ProductSubtypeBM } from './productSubtypeBM.model';
import { ProductTypeBM } from './productTypeBM.model';

export class ProductBM {
  name: string;
  imgURL: string;
  type: ProductTypeBM;
  subtypes: ProductSubtypeBM[];
  price: number;
  quantity: number;
}
