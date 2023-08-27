import { ProductDTO } from './productDto.model';

export class BunchDTO {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  themeId?: number;
  companyId: number;
  productIds: number[];
  themeCheckbox?: any;
  bunch?: any;
}
