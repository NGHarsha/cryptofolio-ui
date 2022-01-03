import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { News } from 'src/app/shared/models/News';
import * as fromRoot from '../../app.reducer';
import * as newsActions from '../../shared/state-management/actions/news.actions';
import { NewsService } from '../news.service';
import * as moment from 'moment';

@Component({
  selector: 'app-portfolio-news',
  templateUrl: './portfolio-news.component.html',
  styleUrls: ['./portfolio-news.component.scss'],
})
export class PortfolioNewsComponent implements OnInit {
  news: News[];
  images: any;
  isLoaded: boolean;
  isPortfolioLoaded: boolean;
  imagesLoaded: boolean = false;

  constructor(
    private store: Store<fromRoot.State>,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new newsActions.FetchPortfolioNews());
    this.store.select(fromRoot.getNews).subscribe((data) => {
      this.isLoaded = data.loaded;
      this.news = data.news;
    });
    this.store
      .select(fromRoot.getLoaded)
      .subscribe((data) => (this.isPortfolioLoaded = data));
    this.newsService.getNewsImages().subscribe((data) => {
      this.images = data;
      this.imagesLoaded = true;
    });
  }

  timeSince(date: Date) {
    return moment(date).fromNow();
  }

  getRandomImage(i: number) {
    let image = this.images[i % this.images.length];
    return image.webformatURL;
  }

  saveNews(n: News) {
    //console.log(n);
  }
}
