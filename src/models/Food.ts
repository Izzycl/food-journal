import { get } from "lodash";

export interface IFood {
  id: number;
  image: string;
  description: string;
}

export class Food implements IFood {
  id: number;
  image: string;
  description: string;
  constructor(params: Partial<IFood>) {
    this.id = get(params, "id", -1);
    this.image = get(params, "image", "");
    this.description = get(params, "description", "");
  }
}
