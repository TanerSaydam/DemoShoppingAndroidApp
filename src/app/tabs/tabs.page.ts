import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { BasketService } from './baskets/services/basket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements AfterContentChecked {

  isAuthenticated = false;
  total = 0;
  constructor(
    private basketService: BasketService,
    private authService: AuthService
  ) { }

  ngAfterContentChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  getBasketTotal(){
    this.basketService.getList().subscribe((res: any)=>{
      this.total = 0;
      res.data.forEach(element => {
        this.total = this.total + element.quantity * element.product.price;
      });
    });
  }

  logout(){
    localStorage.clear();
  }
}
