import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PortfolioService } from 'src/app/portfolio/portfolio.service';
import * as PortfolioActions from '../actions/portfolio.actions';

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

  fetchPortfolios$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PortfolioActions.FETCH_PORTFOLIOS),
        mergeMap(() =>
          this.portfolioService.fetchPortfolios().pipe(
            map((data: any) => {
              return new PortfolioActions.fetchPortfoliosSuccess({
                portfolios: data.portfolios,
              });
            }),
            catchError((err) =>
              of(new PortfolioActions.fetchPortfoliosFailure(err))
            )
          )
        )
      )

    //   concatMap(() => this.portfolioService.fetchPortfolios()),
    //   concatMap((res) =>
    //     this.portfolioService.populatePortfolio(res).pipe(
    //       map((portfolios) => {
    //         return new PortfolioActions.fetchPortfoliosSuccess(portfolios);
    //       }),
    //       catchError((err) =>
    //         of(new PortfolioActions.fetchPortfoliosFailure(err))
    //       )
    //     )
    //   )
    // )
  );

  populatePortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PortfolioActions.populatePortfolio>(
        PortfolioActions.POPULATE_PORTFOLIO
      ),
      mergeMap((action) => {
        //console.log(action.payload);
        return this.portfolioService.populatePortfolio(action.payload).pipe(
          map(
            (portfolio) =>
              new PortfolioActions.populatePortfolioSuccess({
                portfolio: portfolio,
              })
          ),
          catchError((err) =>
            of(new PortfolioActions.populatePortfolioFailure(err))
          )
        );
      })
    )
  );
}
