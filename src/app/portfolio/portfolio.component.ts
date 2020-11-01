import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  buyControl = new FormControl('');
  sellControl = new FormControl('');
  buylist: any;
  currentItem: string;
  buytotal: number;
  selltotal: number;
  sellok: boolean;
  sellfailure: boolean;
  buyok: boolean;
  buyfailure: boolean;
  loaded: boolean;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.sellok = false;
    this.sellfailure = false;
    this.buyok = false;
    this.buyfailure = false;
    const templist = localStorage.getItem('buylist');
    if (templist && templist !== '{}'){
      this.buylist = JSON.parse(templist);
    }
    this.buyControl.valueChanges.subscribe(num => {
      const numbers = num;
      this.buytotal = numbers * this.buylist[this.currentItem].price;
    });
    this.sellControl.valueChanges.subscribe(num => {
      const numbers = num;
      this.selltotal = numbers * this.buylist[this.currentItem].price;
    });
    this.loaded = true;
  }
  buyitem(content, item: string): void{
    this.currentItem = item;
    this.buytotal = 0;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  sellitem(content, item: string): void{
    this.currentItem = item;
    this.selltotal = 0;
    this.modalService.open(content,{backdropClass: 'light-blue-backdrop'});
  }
  buyStocks(): void{
    if (!this.buyControl.value || this.buyControl.value === null || this.buyControl.value === 0){
      return;
    }
    if ( this.buyControl.value < 0){
      this.buyok = false;
      this.buyfailure = true;
      return ;
    }
    this.buylist[this.currentItem].total += this.buytotal;
    this.buylist[this.currentItem].number += this.buyControl.value;
    const avg = this.buylist[this.currentItem].total / this.buylist[this.currentItem].number;
    this.buylist[this.currentItem].avg = avg;
    if (this.buylist[this.currentItem].price - avg < -0.0000001){
      this.buylist[this.currentItem].up = false;
      this.buylist[this.currentItem].down = true;
      this.buylist[this.currentItem].color = '#008000';
    }
    else if ( this.buylist[this.currentItem].price - avg > 0.0000001){
      this.buylist[this.currentItem].up = true;
      this.buylist[this.currentItem].down = false;
      this.buylist[this.currentItem].color = '#ff0000';
    }else{
      this.buylist[this.currentItem].up = false;
      this.buylist[this.currentItem].down = false;
      this.buylist[this.currentItem].color = '#000000';
    }
    localStorage.setItem('buylist', JSON.stringify(this.buylist));
    this.buyok = true;
    this.buyfailure = false;
  }
  sellStocks(): void{
    if (!this.sellControl.value || this.sellControl.value === null || this.sellControl.value === 0){
      return;
    }
    if (this.sellControl.value > this.buylist[this.currentItem].number || this.sellControl.value < 0){
      this.sellok = false;
      this.sellfailure = true;
      return ;
    }
    this.buylist[this.currentItem].total -= this.selltotal;
    this.buylist[this.currentItem].number -= this.sellControl.value;
    if (this.buylist[this.currentItem].number === 0){
      delete this.buylist[this.currentItem];
      if (JSON.stringify(this.buylist) === '{}'){
        this.buylist = undefined;
      }
    }
    if (this.buylist){
      localStorage.setItem('buylist', JSON.stringify(this.buylist));
    }else{
      localStorage.removeItem('buylist');
    }
    this.sellok = true;
    this.sellfailure = false;
  }

}
