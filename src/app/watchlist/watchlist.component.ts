import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  likelist: any;
  loaded = false;
  constructor(private route: Router) { }
  ngOnInit(): void {
    const mylist = localStorage.getItem('watchlist');
    if (mylist && mylist !== '{}'){
      this.likelist = JSON.parse(mylist);
    }
    this.loaded = true;
  }
  deleteItem(key: string): void{
    delete this.likelist[key];
    localStorage.setItem('watchlist', JSON.stringify(this.likelist));
    if (this.likelist && JSON.stringify(this.likelist) === '{}'){
      this.likelist = undefined;
      localStorage.removeItem('watchlist');
    }
  }
  seedetail(key: string): void{
    this.route.navigate(['details', key]);
  }

}
