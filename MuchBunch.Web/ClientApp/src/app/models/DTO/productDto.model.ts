import { ProductSubtypeBM } from '../BM/productSubtypeBM.model';
import { ProductTypeBM } from '../BM/productTypeBM.model';
import { UserDTO } from './userDto.model';

export class ProductDTO {
  id: number;
  name: string;
  imageUrl: string;
  type: ProductTypeBM;
  subTypes: ProductSubtypeBM[];
  price: number;
  quantity: number;
  company: UserDTO;
}
