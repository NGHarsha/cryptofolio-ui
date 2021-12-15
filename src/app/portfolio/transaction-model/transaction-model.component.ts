import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Coin } from 'src/app/shared/models/Coin';
import { isThisTypeNode } from 'typescript';
import { PortfolioService } from '../portfolio.service';
import * as fromRoot from '../../app.reducer';
import * as portfolioActions from '../../shared/state-management/actions/portfolio.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-transaction-model',
  templateUrl: './transaction-model.component.html',
  styleUrls: ['./transaction-model.component.scss'],
})
export class TransactionModelComponent implements OnInit {
  transactionForm: FormGroup;

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
  }

  onSubmit() {
    this.spinner.show();
    this.portfolioService
      .addTransactionByPortfolioId(this.data, this.transactionForm.value)
      .subscribe(
        (res) => {
          this.store.dispatch(new portfolioActions.fetchPortfolios());
          this.dialogRef.close(res);
          this.spinner.hide();
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }
}
