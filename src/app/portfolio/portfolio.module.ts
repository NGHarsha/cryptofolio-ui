import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from '../main/main.module';
import { SearchcoinmodelComponent } from './searchcoinmodel/searchcoinmodel.component';
import { TransactionModelComponent } from './transaction-model/transaction-model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsModule } from '../news/news.module';
import { NewportfoliomodelComponent } from './newportfoliomodel/newportfoliomodel.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ConfirmationmodelComponent } from './confirmationmodel/confirmationmodel.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoinComponent } from './coin/coin.component';

const routes: Routes = [
  {
    path: 'portfolio',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    SearchcoinmodelComponent,
    TransactionModelComponent,
    NewportfoliomodelComponent,
    ConfirmationmodelComponent,
    StatisticsComponent,
    CoinComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MainModule,
    NewsModule,
  ],
  exports: [RouterModule],
})
export class PortfolioModule {}
