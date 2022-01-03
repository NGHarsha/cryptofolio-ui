import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/Transaction';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationmodelComponent } from '../confirmationmodel/confirmationmodel.component';
import * as fromRoot from '../../app.reducer';
import * as portfolioActions from '../../shared/state-management/actions/portfolio.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'portfolio-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit, OnDestroy {
  @Input() transaction: Transaction;

  websocket: WebSocketSubject<any>;
  temp: Transaction;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.temp = { ...this.transaction };

    if (!this.websocket || this.websocket.closed) {
      //console.log(this.temp.symbol);
      this.websocket = webSocket(
        `wss://stream.binance.com:9443/ws/${this.temp.symbol.toLowerCase()}usdt@ticker`
      );
      this.websocket.subscribe(
        (msg) => {
          this.temp.current_price = msg.c;
          this.temp.price_change_percentage_24h = msg.P;
          this.temp.value = this.temp.current_price * this.temp.volume;
          this.temp.pandl = this.temp.value - this.temp.investment;
          this.store.dispatch(
            new portfolioActions.updateStatistics({
              level: 'coin',
              data: { ...this.temp },
            })
          );
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
}
