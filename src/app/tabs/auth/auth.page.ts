import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from './models/auth-model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {


  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    const auhtModel = new AuthModel();
    auhtModel.email = this.email;
    auhtModel.password = this.password;

    this.authService.login(auhtModel).subscribe((res: any)=>{
      localStorage.setItem('token', res.data.token);
      this.router.navigate(['/tabs']);
    });
  }

}
