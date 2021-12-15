import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { CoinService } from 'src/app/main/services/coin.service';

import * as CoinActions from '../actions/coin.actions';

@Injectable()
export class CoinEffects {
  constructor(private actions$: Actions, private coinService: CoinService) {}

  fetchCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinActions.FETCH_COINS),
      mergeMap(() =>
        this.coinService.fetchCoins().pipe(
          map((coins) => new CoinActions.FetchCoinsSuccess(coins)),
          catchError(() => of(new CoinActions.FetchCoinsFailure()))
        )
      )
    )
  );
}
