import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortfolioService } from '../portfolio.service';
import * as fromRoot from '../../app.reducer';
import * as portfolioActions from '../../shared/state-management/actions/portfolio.actions';
import * as newsActions from '../../shared/state-management/actions/news.actions';
import { Portfolio } from 'src/app/shared/models/Portfolio';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SearchcoinmodelComponent } from '../searchcoinmodel/searchcoinmodel.component';
import { News } from 'src/app/shared/models/News';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;
  isLoaded: boolean;
  news: News[];
  images: any;
  currentTransactions: Transaction[];

  constructor(
    private dialog: MatDialog,
    private portfolioService: PortfolioService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    // this.store.select(fromRoot.getPortfolios).subscribe((data) => {
    //   console.log(data);
    //   this.portfolios = data.portfolios;
    //   this.selectedPortfolio = data.selectedPortfolio!;
    //   console.log(this.selectedPortfolio);
    //   this.isLoaded = data.loaded;
    // });

    // this.store.dispatch(new portfolioActions.fetchPortfolios());

    this.portfolioService.fetchPortfolios().subscribe((data: any) => {
      this.selectedPortfolio = data.portfolios.find(
        (p: Portfolio) => p.isPrimary
      );
      this.portfolios = data.portfolios;
      this.isLoaded = true;
    });

    this.store.dispatch(new newsActions.FetchPortfolioNews());
    this.store.select(fromRoot.getNews).subscribe((data) => {
      this.news = data.news;
    });
    this.portfolioService
      .getNewsImages()
      .subscribe((data) => (this.images = data));
  }

  openSearchCoinModel() {
    const dialogRef = this.dialog.open(SearchcoinmodelComponent, {
      panelClass: 'search-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  timeSince(date: Date) {
    return moment(date).fromNow();
  }

  getRandomImage(i: number) {
    let image = this.images[i];
    return image.urls.small;
  }
}
