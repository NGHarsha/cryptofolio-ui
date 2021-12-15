import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { PortfolioService } from 'src/app/portfolio/portfolio.service';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';

import * as PortfolioActions from '../actions/portfolio.actions';
import { of } from 'rxjs';
import { Portfolio } from '../../models/Portfolio';

@Injectable()
export class PortfolioEffects {
  constructor(
    private actions$: Actions,
    private portfolioService: PortfolioService
  ) {}

  // fetchPortfolios$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PortfolioActions.FETCH_PORTFOLIOS),
  //     mergeMap(() =>
  //       this.portfolioService.fetchPortfolios().pipe(
  //         map(
  //           (portfolios) =>
  //             new PortfolioActions.fetchPortfoliosSuccess(portfolios)
  //         ),
  //         catchError((err) =>
  //           of(new PortfolioActions.fetchPortfoliosFailure(err))
  //         )
  //       )
  //     )
  //   )
  // );

  fetchAndPopulatePrimaryPortfolio$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PortfolioActions.FETCH_PORTFOLIOS),
        mergeMap(() =>
          this.portfolioService.fetchPortfolios().pipe(
            map((portfolios: any) => {
              let selectedPortfolio = portfolios.portfolios.find(
                (p: Portfolio) => p.isPrimary
              );
              return new PortfolioActions.fetchPortfoliosSuccess({
                portfolios,
                selectedPortfolio,
              });
            }),
            catchError((err) =>
              of(new PortfolioActions.fetchPortfoliosFailure(err))
            )
          )
        )
      )
    // concatMap(() => this.portfolioService.fetchPortfolios()),
    // concatMap((res) =>
    //   this.portfolioService.populatePortfolio(res).pipe(
    //     map((portfolios) => {
    //       return new PortfolioActions.fetchPortfoliosSuccess(portfolios);
    //     }),
    //     catchError((err) =>
    //       of(new PortfolioActions.fetchPortfoliosFailure(err))
    //     )
    //   )
    // )
    //)
  );

  populatePortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PortfolioActions.populatePortfolio>(
        PortfolioActions.POPULATE_PORTFOLIO
      ),
      mergeMap((action) =>
        this.portfolioService.populatePortfolio(action.payload).pipe(
          map(
            (transactions) =>
              new PortfolioActions.populatePortfolioSuccess({
                pid: action.payload,
                transactions,
              })
          ),
          catchError((err) =>
            of(new PortfolioActions.populatePortfolioFailure(err))
          )
        )
      )
    )
  );
}
