import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  currentUser: User;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log(username)
    return this.http.post(`${this.baseUrl}auth/signin`, { username, password })
    .pipe(
      map((response: any) => {
        const user = response;          
        if(user) {
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.accessToken);
          this.currentUser = user.user;
          console.log(this.currentUser);
        }
      })
    );
  } 

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
  }
}