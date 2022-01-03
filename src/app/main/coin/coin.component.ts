import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Coin } from 'src/app/shared/models/Coin';
import { Transaction } from 'src/app/shared/models/Transaction';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit, OnDestroy {
  @Input() coin: Coin;
  @Input() rank: number;
  @Input() transaction: Transaction;
  @Input() isHomeCoin: boolean = false;
  @Input() isPortfolioCoin: boolean = false;
  isLoading: boolean;
  temp: Coin;
  raising: boolean;

  websocket: WebSocketSubject<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.temp = { ...this.coin };

    if (!this.websocket || this.websocket.closed) {
      this.websocket = webSocket(
        `wss://stream.binance.com:9443/ws/${this.temp.symbol.toLowerCase()}usdt@ticker`
      );
      this.websocket.subscribe(
        (msg) => {
          msg.c > this.temp.current_price
            ? (this.raising = true)
            : (this.raising = false);
          this.temp.current_price = msg.c;
          this.temp.price_change_percentage_24h = msg.P;
        },
        (err) => {
          //console.log(err)
        },
        () => {
          //console.log('Closing')
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.websocket) {
      this.websocket.complete();
    }
  }
}
