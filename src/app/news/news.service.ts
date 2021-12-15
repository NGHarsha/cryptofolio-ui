import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { News } from '../shared/models/News';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  url = 'https://cryptofolio-server.herokuapp.com/api/news';
  constructor(private httpClient: HttpClient) {}

  fetchNews() {
    let news: News[];
    return this.httpClient.get<News[]>(this.url).pipe(
      map((res) => {
        news = res;
        console.log(news);
        return news;
      }),
      catchError((err) => throwError('Something went wrong with provider'))
    );
  }
}
