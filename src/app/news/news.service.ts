import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { News } from '../shared/models/News';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  url = 'https://cryptofolio-server.herokuapp.com/api/news';
  unsplashUrl: string = `https://api.unsplash.com/search/photos?query=crypto&client_id=${environment.unsplashAPI}`;

  constructor(private httpClient: HttpClient) {}

  fetchNews() {
    let news: News[];
    return this.httpClient.get<{ news: News[] }>(this.url).pipe(
      map((res) => {
        news = res.news;
        //console.log(news);
        return news;
      }),
      catchError((err) => throwError('Something went wrong with provider'))
    );
  }

  getNewsImages() {
    return this.httpClient.get<any>(`${this.url}/images`).pipe(
      map((res) => {
        return res.images;
      })
    );
  }
}
