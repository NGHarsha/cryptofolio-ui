import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Portfolio } from 'src/app/shared/models/Portfolio';
import { NewportfoliomodelComponent } from '../newportfoliomodel/newportfoliomodel.component';
import * as fromRoot from '../../app.reducer';
import * as portfolioActions from '../../shared/state-management/actions/portfolio.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { FetchCoins } from 'src/app/shared/state-management/actions/coin.actions';
import { interval } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @Input() selectedPortfolio: Portfolio;
  @Input() portfolios: Portfolio[];
  @Output() changePortfolioEvent = new EventEmitter<any>();
  portfolio: Portfolio | null;
  balance: number;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    // this.store.select(fromRoot.getSelectedPortfolio).subscribe((data) => {
    //   this.store.dispatch(
    //     new portfolioActions.updateStatistics({ level: 'portfolio', data })
    //   );
    //   this.portfolio = data;
    // });

    this.store.dispatch(
      new portfolioActions.updateStatistics({
        level: 'portfolio',
        data: { ...this.selectedPortfolio },
      })
    );

    this.store.dispatch(new FetchCoins());

    interval(2000).subscribe((x) => this.computeBalance());
  }

  changePortfolio(event: any) {
    this.changePortfolioEvent.emit(event);
  }

  openNewPortfolioModel() {
    const dialogRef = this.dialog.open(NewportfoliomodelComponent);

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
      this.store.dispatch(new portfolioActions.fetchPortfolios());
    });
  }

  computeBalance() {
    this.store.select(fromRoot.getStatistics).subscribe((data) => {
      this.balance = data?.balance!;
    });
  }
}
