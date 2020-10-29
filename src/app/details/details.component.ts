import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Detailsvalue} from '../interfaces/detailsvalue';
import {DetailsService} from './details-service.service';
import {ActivatedRoute} from '@angular/router';
import * as Highchartstock from 'highcharts/highstock';
import {FormControl} from '@angular/forms';
import {catchError, debounce, retry} from 'rxjs/operators';
import {Observable, Subscription, timer} from 'rxjs';
import {Newsdata} from '../interfaces/newsdata';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy{
  myControl = new FormControl('');
  details: Detailsvalue;
  currentTime: Date;
  timeClose: any;
  hasdetail: boolean;
  market: boolean;
  openTime: Date;
  chartloaded: boolean;
  Highcharts = Highchartstock;
  chartOptions: any;
  firstTime: boolean;
  keyw: string;
  total: number;
  unSubscribe: Subscription;
  likeit: boolean;
  closeMessage: boolean;
  thenewsData: Array<Newsdata[]> = [];
  currentX: number;
  currentY: number;
  publishdate: Date;
  constructor(private modalService: NgbModal, private detailsService: DetailsService, private route: ActivatedRoute) {
    this.timeClose = setInterval(() => {
      this.currentTime = new Date();
    }, 1);
    this.hasdetail = true;
    this.market = true;
    this.chartloaded = false;
    this.firstTime = true;
    this.likeit = false;
    this.closeMessage = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      keyword => {
        console.log('hello');
        this.keyw = keyword.get('searchvalue');
        this.repeatgetDate();
        this.detailsService.getNewsData(this.keyw).subscribe(news => {
          for (let i = 0 ; i < news.length; i += 2){
            this.thenewsData.push(news.slice(i, i + 2));
          }
        });
        // setInterval(() => {
        //   this.detailsService.getDetailData(this.keyw).subscribe(response => {
        //       this.hasdetail = true;
        //       this.openTime = new Date(response.timestamp);
        //       if (this.openTime < this.currentTime){
        //         this.market = false;
        //       }else {
        //         this.market = true;
        //       }
        //       this.chartOptions = {
        //         title: {
        //           text: response.ticker
        //         },
        //         navigator: {
        //           series: {
        //             color: response.color,
        //             fillOpacity: 1
        //           }
        //         },
        //         colors: [response.color],
        //         rangeSelector: {
        //           enabled: false
        //         },
        //         series: [{
        //           data: response.dailydata
        //         }]};
        //       this.details = response;
        //     },
        //     error => {
        //       // console.log(error);
        //       if (this.firstTime) {
        //         this.hasdetail = false;
        //         this.firstTime = false;
        //       }
        //     });
        // }, 15000);
        // console.log(keyw);
        // this.detailsService.getDetailData(keyw).subscribe(response => {
        //     this.hasdetail = true;
        //     this.openTime = new Date(response.timestamp);
        //     this.details = new Observable<Detailsvalue>((observer) => {
        //       observer.next(response);
        //       console.log(response);
        //       return {
        //         unsubscribe(): void{
        //         }
        //       };
        //     });
        //     if (this.openTime < this.currentTime){
        //       this.market = false;
        //     }else {
        //       this.market = true;
        //     }
        //   },
        //   error => {
        //     // console.log(error);
        //     this.hasdetail = false;
        //   });

      }
    );
    this.unSubscribe = this.myControl.valueChanges.subscribe(value => {
      const numbers = value;
      this.total = numbers * this.details.last;
    });
  }
  repeatgetDate(): void{
    this.detailsService.getDetailData(this.keyw).subscribe(response => {
        this.hasdetail = true;
        this.openTime = new Date(response.timestamp);
        if (this.openTime < this.currentTime){
          this.market = false;
        }else {
          this.market = true;
        }
        this.chartOptions = {
          title: {
            text: response.ticker
          },
          navigator: {
            series: {
              color: response.color,
              fillOpacity: 1
            }
          },
          colors: [response.color],
          rangeSelector: {
            enabled: false
          },
          series: [{
            name: response.ticker,
            data: response.dailydata
          }]};
        this.details = response;
      },
      error => {
        // console.log(error);
        if (this.firstTime) {
          this.hasdetail = false;
          this.firstTime = false;
        }
      });
  }
  buyStocks(): void{
    console.log('buy stocks!!');
  }
  likeStock(): void{
    this.likeit = !this.likeit;
    this.closeMessage = false;
    console.log('like');
  }
  shareNews(): void{
    console.log('share!!!');
  }

  openBackDropCustomClass(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  openShare(content, x, y): void{
    this.currentX = x;
    this.currentY = y;
    this.publishdate = new Date(this.thenewsData[x][y].publishedAt);
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  ngOnDestroy(): void {
    clearInterval(this.timeClose);
    this.unSubscribe.unsubscribe();
  }

}
