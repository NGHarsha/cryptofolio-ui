import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signInURL = 'https://cryptofolio-server.herokuapp.com/api/users/login';
  signUpUrl = 'https://cryptofolio-server.herokuapp.com/api/users/signup';

  constructor(private httpClient: HttpClient) {}

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
}
