import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Portfolio } from '../shared/models/Portfolio';
import { Transaction } from '../shared/models/Transaction';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { Coin } from '../shared/models/Coin';
import { environment } from 'src/environments/environment';

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
    console.log(user.userId);
    return this.httpClient.get(`${this.portfolioUrl}/user/${user.userId}`);
  }

  populatePortfolio(response: any) {
    // console.log(response);
    const primaryPortfolio = response.portfolios.find(
      (p: Portfolio) => p.isPrimary
    );
    let temp: Portfolio[] = response.portfolios;

    return this.httpClient
      .get<{ transactions: Transaction[] }>(
        `${this.transactionUrl}/${primaryPortfolio.id}`
      )
      .pipe(
        map((res) => {
          return (response = temp.map((p: Portfolio) => {
            if (p.isPrimary) {
              return {
                ...p,
                transactions: res.transactions,
              };
            } else {
              return p;
            }
          }));
        })
      );
  }

  addTransactionByPortfolioId(asset: Coin, transaction: any) {
    let user = this.authService.getUser();
    let portfolioId;
    this.store
      .select(fromRoot.getPortfolios)
      .subscribe((data) => (portfolioId = data.selectedPortfolio));
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

  getNewsImages() {
    return this.httpClient
      .get<any>(this.unsplashUrl)
      .pipe(map((res) => res.results));
  }
}
