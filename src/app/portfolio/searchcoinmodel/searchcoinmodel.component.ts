import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Coin } from 'src/app/shared/models/Coin';
import * as fromRoot from '../../app.reducer';
import { TransactionModelComponent } from '../transaction-model/transaction-model.component';

@Component({
  selector: 'app-searchcoinmodel',
  templateUrl: './searchcoinmodel.component.html',
  styleUrls: ['./searchcoinmodel.component.scss'],
})
export class SearchcoinmodelComponent implements OnInit {
  coins: Coin[];
  assets: Coin[] | undefined;

  constructor(
    private store: Store<fromRoot.State>,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SearchcoinmodelComponent>
  ) {}

  ngOnInit(): void {
    this.store.select(fromRoot.getCoinState).subscribe((data) => {
      this.coins = data.coins;
      this.assets = this.coins;
      console.log(this.assets);
    });
  }

  handleChange(term: any) {
    const input = term.target.value.toLowerCase();
    this.assets = this.coins.filter((a) => {
      return (
        a.name.toLowerCase().includes(input) ||
        a.symbol.toLowerCase().includes(input)
      );
    });
  }

  openTransactionModel(asset: Coin) {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(TransactionModelComponent, {
      panelClass: 'search-dialog',
      data: asset,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
