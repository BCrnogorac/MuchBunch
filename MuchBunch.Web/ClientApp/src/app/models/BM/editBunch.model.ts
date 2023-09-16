import { ProductDTO } from '../DTO/productDto.model';
import { ThemeDto } from '../DTO/themeDto.model';
import { UserDTO } from '../DTO/userDto.model';

export class EditBunchBM {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  theme?: ThemeDto;
  company: UserDTO;
  products: ProductDTO[];
  themeCheckbox?: any;
}
