import { ProductTypeBM } from '../BM/productTypeBM.model';
import { UserDTO } from './userDto.model';

export class ProductDTO {
  id: number;
  name: string;
  imageUrl: string;
  type: ProductTypeBM;
  subtypes: ProductTypeBM[];
  price: number;
  quantity: number;
  company: UserDTO;
}
