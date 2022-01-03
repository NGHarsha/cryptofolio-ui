import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromRoot from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import { Coin } from '../shared/models/Coin';
import { Portfolio } from '../shared/models/Portfolio';
import { Transaction } from '../shared/models/Transaction';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  portfolioUrl: string =
    'https://cryptofolio-server.herokuapp.com/api/portfolio';
  transactionUrl: string =
    'https://cryptofolio-server.herokuapp.com/api/transactions/portfolio';
  unsplashUrl: string = `https://api.unsplash.com/search/photos?query=crypto&client_id=${environment.unsplashAPI}`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  fetchPortfolios() {
    let user = this.authService.getUser();
    //console.log(user.userId);
    return this.httpClient.get(`${this.portfolioUrl}/user/${user.userId}`);
  }

  populatePortfolio(pid?: any) {
    //console.log(pid);
    //console.log(response);
    let url;
    if (pid) {
      url = `${this.transactionUrl}/${pid}`;
    } else {
      url = this.transactionUrl;
    }
    //console.log('Populate service', pid);

    // const primaryPortfolio = response.portfolios.find(
    //   (p: Portfolio) => p.isPrimary
    // );
    // let temp: Portfolio[] = response.portfolios;

    return this.httpClient.get<{ portfolio: Portfolio }>(url).pipe(
      map((res) => res.portfolio),
      catchError((error) => throwError(error))
    );
  }

  addTransactionByPortfolioId(asset: Coin, transaction: any, portfolioId: any) {
    let user = this.authService.getUser();
    let investment = transaction.volume * transaction.atprice;
    return this.httpClient
      .post<{ portfolio: Portfolio }>(`${this.portfolioUrl}/${portfolioId}`, {
        name: asset.name,
        symbol: asset.symbol,
        image: asset.image,
        volume: transaction.volume,
        atprice: transaction.atprice,
        type: transaction.type,
        investment,
      })
      .pipe(catchError((error) => throwError(error.error)));
  }

  deleteTransactionByPortfolioId(data: Transaction) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient
      .delete(`${this.portfolioUrl}/${data.portfolio}`, options)
      .pipe(catchError((error) => throwError(error.error)));
  }

  addPortfolio(data: any) {
    let user = this.authService.getUser();
    //console.log(user);
    //console.log(data);
    return this.httpClient.post(
      `${this.portfolioUrl}/user/${user.userId}`,
      data
    );
  }

  getNewsImages() {
    return this.httpClient
      .get<any>(this.unsplashUrl)
      .pipe(map((res) => res.results));
  }
}
