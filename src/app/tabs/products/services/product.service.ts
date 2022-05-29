import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getList(){
    const api = 'https://webapi.angulareducation.com/api/products/getlist';
    return this.httpClient.get(api);
  }
}
