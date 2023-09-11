import { BunchDTO } from './bunchDto.model';

export class ThemeDto {
  id: number;
  name: string;
  isActive: boolean;
  bunches?: BunchDTO[];

  constructor(
    id: number,
    name: string,
    isActive: boolean,
    bunches?: BunchDTO[]
  ) {
    this.name = name;
    this.id = id;
    this.isActive = isActive;
    this.bunches = bunches;
  }
}
