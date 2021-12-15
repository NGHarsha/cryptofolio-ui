import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Coin } from 'src/app/shared/models/Coin';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private httpClient: HttpClient) {}

  fetchCoins = () => {
    return this.httpClient
      .get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .pipe(
        catchError((err) => {
          return throwError('Something went wrong. Please try again');
        })
      );
  };
}
