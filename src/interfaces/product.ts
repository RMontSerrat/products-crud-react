export interface IProduct {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export type IProductWithId = Required<Pick<IProduct, 'id'>> & Omit<IProduct, 'id'>;
