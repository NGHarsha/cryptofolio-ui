import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from '../main/main.module';
import { SearchcoinmodelComponent } from './searchcoinmodel/searchcoinmodel.component';
import { TransactionModelComponent } from './transaction-model/transaction-model.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: 'portfolio', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent,
    SearchcoinmodelComponent,
    TransactionModelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MainModule,
  ],
  exports: [RouterModule],
})
export class PortfolioModule {}
