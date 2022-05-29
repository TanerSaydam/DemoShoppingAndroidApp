import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewDidEnter } from '@ionic/angular';
import { BasketModel } from '../models/basket-model';
import { BasketService } from '../services/basket.service';
import { PaymentModel } from './models/payment-model';
import { SendPaymentModel } from './models/send-paymend-model';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements ViewDidEnter {

  baskets: BasketModel[] = [];
  paymentModel: PaymentModel;
  sendPaymentModel: SendPaymentModel;
  cartOwner: string;
  cvv: string;
  cartNumber: string;
  expirationDate: string;
  total = 0;

  constructor(
    private basketService: BasketService,
    private paymentService: PaymentService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ionViewDidEnter(): void {
    this.getBasketList();
  }

 getBasketList(){
    this.basketService.getList().subscribe((res: any)=>{
      this.total = 0;
      this.baskets = res.data;
      res.data.forEach(element => {
        this.total = this.total + element.quantity * element.product.price;
      });
    },(err)=>{
      console.log();
    });
  }

  payment() {
    this.paymentModel = new PaymentModel();
    this.paymentModel.id = 0;
    this.paymentModel.cartNumber = this.cartNumber;
    this.paymentModel.cartOwner = this.cartOwner;
    this.paymentModel.cvv = this.cvv;
    this.paymentModel.expirationDate = this.expirationDate;
    this.paymentModel.date = Date();

    this.sendPaymentModel = new SendPaymentModel();
    this.sendPaymentModel.payment = this.paymentModel;
    this.sendPaymentModel.baskets = this.baskets;

    this.paymentService.sendPayment(this.sendPaymentModel).subscribe((res: any)=>{
      this.presentToast(res.message);
      this.router.navigate(['/tabs/baskets']);
    },(err)=>{
      this.presentToast(err.errror);
    });
  }

  async presentToast(_message: string) {
    const toast = await this.toastController.create({
      message: _message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }


}
