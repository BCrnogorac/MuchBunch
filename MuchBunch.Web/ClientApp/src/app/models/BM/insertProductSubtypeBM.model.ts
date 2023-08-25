export class InsertProductSubtypeBM {
  name: string;
  parentId: number;

  constructor(name: string, parentId: number) {
    this.name = name;
    this.parentId = parentId;
  }
}
