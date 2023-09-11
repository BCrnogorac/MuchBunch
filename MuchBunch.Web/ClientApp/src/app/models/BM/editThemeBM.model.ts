export class EditThemeBM {
  id: number;
  name: string;
  isActive: boolean;

  constructor(id: number, name: string, isActive: boolean) {
    this.name = name;
    this.id = id;
    this.isActive = isActive;
  }
}
