export class ProductSubtypeBM {
  id: number;
  name: string;
  parentId: number;

  constructor(id: number, name: string, parentId: number) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
  }
}
