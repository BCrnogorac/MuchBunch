import { ProductDTO } from './productDto.model';

export class BunchDTO {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  themeId?: number;
  companyId: number;
  products: ProductDTO[];
  themeCheckbox?: any;
  bunch?: any;
}
