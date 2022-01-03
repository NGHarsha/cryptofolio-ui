import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { News } from 'src/app/shared/models/News';
import { Portfolio } from 'src/app/shared/models/Portfolio';
import { Transaction } from 'src/app/shared/models/Transaction';
import * as fromRoot from '../../app.reducer';
import * as portfolioActions from '../../shared/state-management/actions/portfolio.actions';
import { CoinComponent } from '../coin/coin.component';
import { ConfirmationmodelComponent } from '../confirmationmodel/confirmationmodel.component';
import { NewportfoliomodelComponent } from '../newportfoliomodel/newportfoliomodel.component';
import { PortfolioService } from '../portfolio.service';
import { SearchcoinmodelComponent } from '../searchcoinmodel/searchcoinmodel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;
  selectedPortfolio$: Observable<Portfolio>;
  isLoaded: boolean;
  news: News[];
  images: any;
  currentTransactions$: Observable<Transaction[]>;

  @ViewChildren(CoinComponent) coinList: QueryList<CoinComponent>;

  constructor(
    private dialog: MatDialog,
    private portfolioService: PortfolioService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.store.select(fromRoot.getPortfolios).subscribe((data) => {
      //console.log(data);
      this.portfolios = data;
    });

    this.store.select(fromRoot.getLoaded).subscribe((data) => {
      this.isLoaded = data;
    });

    this.store.dispatch(new portfolioActions.fetchPortfolios());
    this.store.dispatch(new portfolioActions.populatePortfolio());

    this.store.select(fromRoot.getSelectedPortfolio).subscribe((data) => {
      //console.log('selected Portfolio', data);
      this.selectedPortfolio = data!;
    });

    // this.portfolioService.populatePortfolio().subscribe((portfolio) => {
    //   console.log(portfolio);
    //   this.selectedPortfolio$ = of(portfolio);
    // });

    // this.portfolioService.fetchPortfolios().subscribe((data: any) => {
    //   this.selectedPortfolio = data.portfolios.find(
    //     (p: Portfolio) => p.isPrimary
    //   );
    //   this.portfolios = data.portfolios;
    //   this.isLoaded = true;
    // });

    // this.store.dispatch(new newsActions.FetchPortfolioNews());
    // this.store.select(fromRoot.getNews).subscribe((data) => {
    //   this.news = data.news;
    // });
    // this.portfolioService
    //   .getNewsImages()
    //   .subscribe((data) => (this.images = data));
  }

  openSearchCoinModel() {
    const dialogRef = this.dialog.open(SearchcoinmodelComponent, {
      panelClass: 'search-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
    });
  }

  openNewPortfolioModel() {
    const dialogRef = this.dialog.open(NewportfoliomodelComponent);

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
      this.store.dispatch(new portfolioActions.fetchPortfolios());
    });
  }

  openConfirmationModel(transaction: Transaction) {
    const dialogRef = this.dialog.open(ConfirmationmodelComponent, {
      data: transaction,
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
      if (result.msg === 'Delete Success') {
        this.store.dispatch(new portfolioActions.populatePortfolio());
      }
    });
  }

  timeSince(date: Date) {
    return moment(date).fromNow();
  }

  getRandomImage(i: number) {
    let image = this.images[i];
    return image.urls.small;
  }

  changePortfolio(event: any) {
    const portfolio = this.portfolios.find((p) => p.name === event);
    //console.log(portfolio);
    this.store.dispatch(new portfolioActions.populatePortfolio(portfolio!.id));
    this.store.dispatch(
      new portfolioActions.changeSelectedPortfolio(portfolio)
    );
  }
}
