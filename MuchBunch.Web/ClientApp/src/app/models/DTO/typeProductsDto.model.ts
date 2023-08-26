import { ProductTypeBM } from '../BM/productTypeBM.model';
import { ProductDTO } from './productDto.model';

export class TypeProductDto {
  type: ProductTypeBM;
  products?: ProductDTO[];
}
