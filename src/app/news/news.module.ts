import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { PortfolioNewsComponent } from './portfolio-news/portfolio-news.component';

@NgModule({
  declarations: [PortfolioNewsComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [PortfolioNewsComponent],
})
export class NewsModule {}
