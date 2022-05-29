import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendPaymentModel } from '../models/send-paymend-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private httpClient: HttpClient
  ) { }

  sendPayment(sendPamentModel: SendPaymentModel){
    const api = 'https://webapi.angulareducation.com/api/Orders/addPayment';
    return this.httpClient.post(api,sendPamentModel);
  }
}
