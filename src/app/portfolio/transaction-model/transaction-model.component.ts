import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Coin } from 'src/app/shared/models/Coin';
import * as fromRoot from '../../app.reducer';
import * as portfolioActions from '../../shared/state-management/actions/portfolio.actions';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-transaction-model',
  templateUrl: './transaction-model.component.html',
  styleUrls: ['./transaction-model.component.scss'],
})
export class TransactionModelComponent implements OnInit {
  transactionForm: FormGroup;
  currentPrice: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Coin,
    public dialogRef: MatDialogRef<TransactionModelComponent>,
    private portfolioService: PortfolioService,
    private spinner: NgxSpinnerService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      volume: new FormControl('', [Validators.required, Validators.min(0)]),
      atprice: new FormControl('', [Validators.required, Validators.min(0)]),
      type: new FormControl('buy', [Validators.required]),
    });

    this.store.select(fromRoot.getCoins).subscribe((data) => {
      data.forEach((c) => {
        if (c.name === this.data.name) {
          this.currentPrice = c.current_price;
        }
      });
    });
  }

  onSubmit() {
    this.spinner.show();
    let portfolioId: any;
    this.store
      .select(fromRoot.getSelectedPortfolio)
      .subscribe((data) => (portfolioId = data?.id!));
    this.portfolioService
      .addTransactionByPortfolioId(
        this.data,
        this.transactionForm.value,
        portfolioId
      )
      .subscribe(
        (res) => {
          this.store.dispatch(
            new portfolioActions.populatePortfolio(portfolioId)
          );
          this.dialogRef.close(res);
          this.spinner.hide();
        },
        (err) => {
          //console.log(err);
          this.spinner.hide();
        }
      );
  }
}
