import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(authModel: AuthModel){
    const api = 'https://webapi.angulareducation.com/api/users/login';
    return this.httpClient.post(api,authModel);
  }

  isAuthenticated(): boolean{
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
