import { UserModel } from '../user.model';
import { ProductDTO } from './productDto.model';
import { ThemeDto } from './themeDto.model';

export class BunchDTO {
  id: number;
  name: string;
  price: number;
  theme: ThemeDto;
  company: UserModel;
  products: ProductDTO[];
}
