import { Component, OnInit } from '@angular/core';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import { BasketModel } from './models/basket-model';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.page.html',
  styleUrls: ['./baskets.page.scss'],
})
export class BasketsPage implements ViewDidEnter {

  total = 0;
  baskets: BasketModel[] = [];

  constructor(
    private basketService: BasketService,
    private alertController: AlertController
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

  async presentDeleteConfirm(basketModel: BasketModel) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sil?',
      message: basketModel.product.name + ' ürününü sepetten <strong>silmek</strong> istiyor musunuz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sil',
          id: 'confirm-button',
          handler: () => {
            this.basketService.deleteBasket(basketModel).subscribe((res)=>{
              this.getBasketList();
            },(err)=>{
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
