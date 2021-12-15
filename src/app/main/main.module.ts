import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CoinComponent } from './coin/coin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, CoinComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [HomeComponent, RouterModule, CoinComponent],
})
export class MainModule {}
