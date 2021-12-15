import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Coin } from 'src/app/shared/models/Coin';
import { Transaction } from 'src/app/shared/models/Transaction';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  @Input() coin: Coin;
  @Input() rank: number;
  @Input() transaction: Transaction;
  @Input() isHomeCoin: boolean = false;
  @Input() isPortfolioCoin: boolean = false;
  isLoading: boolean;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {}
}
