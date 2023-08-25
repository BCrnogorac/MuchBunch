import { BunchDTO } from './bunchDto.model';

export class ThemeDto {
  id: number;
  name: string;
  bunches: BunchDTO[];

  constructor(id: number, name: string, bunches: BunchDTO[]) {
    this.name = name;
    this.id = id;
    this.bunches = bunches;
  }
}
