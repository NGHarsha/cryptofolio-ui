import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/shared/models/Coin';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/state-management/actions/ui.actions';
import * as coinActions from '../../shared/state-management/actions/coin.actions';

import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

    console.log('Dispatching');
    this.store.dispatch(new coinActions.FetchCoins());
  }
}
