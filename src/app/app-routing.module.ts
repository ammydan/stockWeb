import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {DetailsComponent} from './details/details.component';
import {WatchlistComponent} from './watchlist/watchlist.component';
import {PortfolioComponent} from './portfolio/portfolio.component';

const routes: Routes = [
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'watchlist', component: WatchlistComponent},
          { path: 'details/:searchvalue', component: DetailsComponent },
          {path: 'search', component: SearchComponent},
          {path: '', component: SearchComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
