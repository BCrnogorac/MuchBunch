import { ProductSubtypeBM } from '../BM/productSubtypeBM.model';
import { ProductTypeBM } from '../BM/productTypeBM.model';

export class EditProductBM {
  id: number;
  name: string;
  imageUrl: string;
  type: ProductTypeBM;
  subTypes: ProductSubtypeBM[];
  price: number;
  quantity: number;
  companyId: number;
}
