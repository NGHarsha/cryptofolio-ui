import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signInURL = 'https://cryptofolio-server.herokuapp.com/api/users/login';
  signUpUrl = 'https://cryptofolio-server.herokuapp.com/api/users/signup';

  constructor(private httpClient: HttpClient, private router: Router) {}

  performAuth(type: string, email: string, password: string, name = null) {
    if (type === 'signin') {
      return this.httpClient
        .post(
          this.signInURL,
          {
            email,
            password,
          },
          { observe: 'response' }
        )
        .pipe(
          catchError((error) => {
            return throwError(error.error);
          })
        );
    } else {
      return this.httpClient
        .post(
          this.signUpUrl,
          {
            email,
            password,
            name,
          },
          { observe: 'response' }
        )
        .pipe(
          catchError((error) => {
            return throwError(error.error);
          })
        );
    }
  }

  saveUser(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getUser() {
    let user = localStorage.getItem('loggedInUser');

    if (user) {
      return JSON.parse(user);
    }
    return user;
  }

  isAuthenticated() {
    let user = this.getUser();

    return user ? !jwtHelper.isTokenExpired(user.token) : false;
  }

  signout() {
    //console.log(localStorage.getItem('loggedInUser'));
    localStorage.clear();
    this.router.navigate(['/']);
    //console.log(localStorage.getItem('loggedInUser'));
  }
}
