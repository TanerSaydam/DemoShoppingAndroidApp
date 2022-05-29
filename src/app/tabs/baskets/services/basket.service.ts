import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasketModel } from '../models/basket-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getList(){
    const api = 'https://webapi.angulareducation.com/api/baskets/getlist';
    return this.httpClient.get(api);
  }

  addBasket(basketModel: BasketModel){
    const api = 'https://webapi.angulareducation.com/api/baskets/add';
    return this.httpClient.post(api, basketModel);
  }

  deleteBasket(basketModel: BasketModel){
    const api = 'https://webapi.angulareducation.com/api/baskets/delete';
    return this.httpClient.post(api, basketModel);
  }
}
