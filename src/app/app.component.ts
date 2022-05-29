import { AfterContentChecked, Component } from '@angular/core';
import { AuthService } from './tabs/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterContentChecked {
  isAuthenticated = false;

  constructor(
    private authService: AuthService
  ) {}

  ngAfterContentChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(){
    localStorage.clear();
  }
}
