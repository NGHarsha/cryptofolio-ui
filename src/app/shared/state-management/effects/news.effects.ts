import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NewsService } from 'src/app/news/news.service';
import * as NewsActions from '../actions/news.actions';

@Injectable()
export class NewsEffects {
  constructor(private actions$: Actions, private newsService: NewsService) {}

  fetchCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.FETCH_PORTFOLIO_NEWS),
      mergeMap(() =>
        this.newsService.fetchNews().pipe(
          map(
            (news) => new NewsActions.FetchPortfolioNewsSuccess(news),
            catchError(() => of(new NewsActions.FetchPortfolioNewsFailure()))
          )
        )
      )
    )
  );
}
