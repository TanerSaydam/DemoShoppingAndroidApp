import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController, ViewDidEnter } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { BasketModel } from '../baskets/models/basket-model';
import { BasketService } from '../baskets/services/basket.service';
import { ProductModel } from './models/product-model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements ViewDidEnter, AfterContentChecked {

  isAuthenticated = false;
  filterText = '';
  products: ProductModel[] = [];
  loading: any;
  quantity = 1;
  isLoading = false;
  constructor(
    private productService: ProductService,
    private toastController: ToastController,
    private basketService: BasketService,
    private loadingController: LoadingController,
    private menu: MenuController,
    private authService: AuthService
  ) { }

  ionViewDidEnter(): void {
    this.getList();
  }

  ngAfterContentChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  getList(){
    this.isLoading = true;
    this.present();
    this.productService.getList().subscribe((res: any)=>{
      this.isLoading = false;
      this.dismiss();
      this.products = res.data;
    },(err)=>{
      this.isLoading = false;
      this.dismiss();
      this.presentToast('Bir hata oluştur');
    });
  }

  addQuantity(product: ProductModel){
    const quantity = document.getElementById('name-' + product.id).innerHTML;
    if (+quantity + 1 > product.inventoryQuantity) {
      this.presentToast('Adet stok adedinden fazla olamaz');
      return;
    }
    document.getElementById('name-' + product.id).innerHTML = (+quantity + 1).toString();
  }

  outQuantity(product: ProductModel){
    const quantity = document.getElementById('name-' + product.id).innerHTML;
    if (+quantity - 1 < 1) {
      this.presentToast('Adet en az 1 olmalıdır');
      return;
    }
    document.getElementById('name-' + product.id).innerHTML = (+quantity - 1).toString();
  }

  async presentToast(_message: string) {
    const toast = await this.toastController.create({
      message: _message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  addBasket(product: ProductModel){
    this.isLoading = true;
    this.present();
    const quantity = document.getElementById('name-' + product.id).innerHTML;
    const basketModel: BasketModel = new BasketModel();
    basketModel.id = 0;
    basketModel.productId = product.id;
    basketModel.product = product;
    basketModel.quantity = +quantity;

    this.basketService.addBasket(basketModel).subscribe((res)=>{
      this.isLoading = false;
      this.dismiss();
      this.presentToast('Ürün sepete başarıyla eklendi');
      this.getList();
    },(err)=>{
      this.isLoading = false;
      this.dismiss();
      this.presentToast('Bir hata oluştur');
    });
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


}
