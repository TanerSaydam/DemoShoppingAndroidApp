import { Pipe, PipeTransform } from '@angular/core';
import { BasketModel } from '../../baskets/models/basket-model';
import { ProductModel } from '../models/product-model';

@Pipe({
  name: 'productPipe'
})
export class ProductPipe implements PipeTransform {

  transform(value: ProductModel[], filterText: string): ProductModel[] {
    if (filterText !== '' || filterText !== undefined) {
      return value.filter(p=> p.name.toLowerCase().indexOf(filterText.toLowerCase())!== -1);
    }
    return value;
  }

}
