import { ProductModel } from '../../products/models/product-model';

export class BasketModel{
  id: number;
  quantity: number;
  productId: number;
  product: ProductModel;
}
