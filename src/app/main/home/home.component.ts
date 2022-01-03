import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Coin } from 'src/app/shared/models/Coin';
import * as fromRoot from '../../app.reducer';
import * as coinActions from '../../shared/state-management/actions/coin.actions';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public limit: number = 10;
  allcoins: Coin[] = [];
  coins: Coin[] = [];
  displayedColumns = ['rank', 'name', 'price', 'mcap', 'volume'];
  dataSource = new MatTableDataSource<Coin>();
  isLoaded: boolean;

  constructor(
    private coinService: CoinService,
    private httpClient: HttpClient,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.store.select(fromRoot.getCoinState).subscribe((data) => {
      (this.coins = data.coins), (this.isLoaded = data.loaded);
    });

    this.store.dispatch(new coinActions.FetchCoins());
  }
}
