import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DetailsService} from './details-service.service';
import {ActivatedRoute} from '@angular/router';
import * as Highchartstock from 'highcharts/highstock';
import {FormControl} from '@angular/forms';
import {concat, interval, merge, Subscription} from 'rxjs';
import IndicatorsCore from 'highcharts/indicators/indicators';
import vbp from 'highcharts/indicators/volume-by-price';
import {Newsdata} from '../interfaces/newsdata';
import {Description} from '../interfaces/description';
import {Market} from '../interfaces/market';
import {retry, timeout} from 'rxjs/operators';

IndicatorsCore(Highchartstock);
vbp(Highchartstock);
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy{
  myControl = new FormControl('');
  currentTime: Date;
  timeClose: any;
  hasdetail: boolean;
  market: boolean;
  openTime: Date;
  chartloaded: boolean;
  Highcharts = Highchartstock;
  HighchartsHistory = Highchartstock;
  chartOptions: any;
  historyOptions: any;
  firstTime: boolean;
  keyw: string;
  total: number;
  unSubscribe: Subscription;
  likeit: boolean;
  closeMessage: boolean;
  likeList: any = {};
  buylist: any = {};
  thenewsData: Newsdata[];
  currentX: number;
  publishdate: Date;
  historydata: number[][] ;
  buyok: boolean;
  buyfailure: boolean;
  description: Description;
  marketData: Market;
  dailyData: number[][];
  jobhandler: any;
  loaded: boolean;
  closenews: Subscription;
  closehistory: Subscription;
  closedaily: Subscription;
  closemarket: Subscription;
  closedescription: Subscription;
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
    this.buyok = false;
    this.buyfailure = false;
    this.loaded = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      keyword => {
        this.keyw = keyword.get('searchvalue');
        const watch = localStorage.getItem('watchlist');
        const mybuys = localStorage.getItem('buylist');
        // get local history data
        if (watch){
          this.likeList = JSON.parse(watch);
          if (this.likeList[this.keyw]) {
            this.likeit = true;
          }
        }
        if (mybuys){
          this.buylist = JSON.parse(mybuys);
        }
        this.closedescription = this.detailsService.getDescriptionData(this.keyw)
          .pipe(timeout(4500), retry(2))
          .subscribe(value => {
            if ('error' in value){
              return;
            }
            this.hasdetail = true;
            this.description = value;
            this.closemarket = this.detailsService.getMarketData(this.keyw)
            .pipe( timeout(4500), retry(2))
            .subscribe(value2 => {
              this.marketData = value2;
              this.openTime = new Date(this.marketData.timestamp);
              if (this.currentTime.valueOf() - this.openTime.valueOf() > 60000){
                this.market = false;
              }else {
                this.market = true;
              }

              this.closedaily = this.detailsService.getDailyData(this.keyw)
                .pipe( timeout(4500), retry(2))
                .subscribe(value3 => {
                this.dailyData = value3;
                this.chartOptions = {
                  title: {
                    text: this.description.ticker
                  },
                  navigator: {
                    series: {
                      color: this.marketData.color,
                      fillOpacity: 1
                    }
                  },
                  colors: [this.marketData.color],
                  rangeSelector: {
                    enabled: false
                  },
                  series: [{
                    name: this.description.ticker,
                    data: this.dailyData
                  }]};
                this.loaded = true;
                const that = this;
                this.jobhandler = setInterval(() => {
                  that.closemarket.unsubscribe();
                  that.closedaily.unsubscribe();
                  that.closedescription.unsubscribe();
                  that.closemarket = this.detailsService.getMarketData(this.keyw)
                    .subscribe(value4 => {
                      this.marketData = value4;
                      this.openTime = new Date(this.marketData.timestamp);
                      if (this.currentTime.valueOf() - this.openTime.valueOf() > 60000) {
                        this.market = false;
                      } else {
                        this.market = true;
                      }
                      that.closedaily = this.detailsService.getDailyData(this.keyw).subscribe(value5 => {
                        this.dailyData = value5;
                        this.chartOptions = {
                          title: {
                            text: this.description.ticker
                          },
                          navigator: {
                            series: {
                              color: this.marketData.color,
                              fillOpacity: 1
                            }
                          },
                          colors: [this.marketData.color],
                          rangeSelector: {
                            enabled: false
                          },
                          series: [{
                            name: this.description.ticker,
                            data: this.dailyData
                          }]
                        };
                      });
                    });
                }, 15000);
              });
            });
        },
          error => {
          this.hasdetail = false;
          });
        // get the news data.
        this.closenews = this.detailsService.getNewsData(this.keyw).subscribe(news => {
            this.thenewsData = news;
          }
        );
        // get the history data.
        this.closehistory = this.detailsService.getHistoryData(this.keyw)
          .pipe(timeout(15000), retry(2))
          .subscribe(mydata => {
          this.historydata = mydata;
          const len = this.historydata.length;
            // set the allowed units for data grouping
          const  groupingUnits = [[
              'week',             // unit name
              [1]               // allowed multiples
            ], [
              'month',
              [1, 2, 3, 4, 6]
            ]];
          const ohlc = [];
          const volume = [];

          for (let i = 0; i < len; i += 1) {
            ohlc.push([
              mydata[i][0], // the date
              mydata[i][1], // open
              mydata[i][2], // high
              mydata[i][3], // low
              mydata[i][4] // close
            ]);

            volume.push([
              mydata[i][0], // the date
              mydata[i][5] // the volume
            ]);
          }
          this.historyOptions = {
            rangeSelector: {
              selected: 2
            },

            title: {
              text: this.keyw + ' Historical'
            },

            subtitle: {
              text: 'With SMA and Volume by Price technical indicators'
            },

            yAxis: [{
              startOnTick: false,
              endOnTick: false,
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: 'OHLC'
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                enabled: true
              }
            }, {
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: 'Volume'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
            }],

            tooltip: {
              split: true
            },

            plotOptions: {
              series: {
                dataGrouping: {
                  units: groupingUnits
                }
              }
            },

            series: [{
              type: 'candlestick',
              name: this.keyw,
              id: this.keyw,
              zIndex: 2,
              data: ohlc
            }, {
              type: 'column',
              name: 'Volume',
              id: 'volume',
              data: volume,
              yAxis: 1
            }, {
              type: 'vbp',
              linkedTo: this.keyw,
              params: {
                volumeSeriesID: 'volume'
              },
              dataLabels: {
                enabled: false
              },
              zoneLines: {
                enabled: false
              }
            }, {
              type: 'sma',
              linkedTo: this.keyw,
              zIndex: 1,
              marker: {
                enabled: false
              }
            }]
          };
        });
      }
    );
    // value change
    this.unSubscribe = this.myControl.valueChanges.subscribe(value => {
      const numbers = value;
      this.total = numbers * this.marketData.last;
    });
  }
  buyStocks(): void{
    if (!this.myControl.value || this.myControl.value === null || this.myControl.value === 0){
      return;
    }
    if (this.myControl.value < 0){
      this.buyfailure = true;
      this.buyok = false;
      return ;
    }
    if (this.buylist[this.description.ticker]){
      this.buylist[this.description.ticker].number += this.myControl.value;
      this.buylist[this.description.ticker].total += this.total;
      this.buylist[this.description.ticker].price = this.marketData.last;
      const avg = this.buylist[this.description.ticker].total / this.buylist[this.description.ticker].number;
      this.buylist[this.description.ticker].avg = avg;
      if (this.buylist[this.description.ticker].price - avg < -0.0000001){
        this.buylist[this.description.ticker].up = false;
        this.buylist[this.description.ticker].down = true;
        this.buylist[this.description.ticker].color = '#008000';
      }
      else if ( this.buylist[this.description.ticker].price - avg > 0.0000001){
        this.buylist[this.description.ticker].up = true;
        this.buylist[this.description.ticker].down = false;
        this.buylist[this.description.ticker].color = '#ff0000';
      }else{
        this.buylist[this.description.ticker].up = false;
        this.buylist[this.description.ticker].down = false;
        this.buylist[this.description.ticker].color = '#000000';
      }
    } else{
      this.buylist[this.description.ticker] = {
        ticker: this.description.ticker,
        number: this.myControl.value,
        total: this.total,
        name: this.description.name,
        price: this.marketData.last,
        up: false,
        down: false,
        color: '#000000',
        avg: this.marketData.last
      };
    }
    this.buyok = true;
    this.buyfailure = false;
    localStorage.setItem('buylist', JSON.stringify(this.buylist));
    console.log('buy stocks!!');
  }
  likeStock(): void{
    if (!this.likeit){
      console.log('add');
      this.likeList[this.description.ticker] = {
        ticker: this.description.ticker,
        name: this.description.name,
        last: this.marketData.last,
        change: this.marketData.change,
        changePercent: this.marketData.changePercent,
        color: this.marketData.color,
        up: this.marketData.up,
        down: this.marketData.down
      };
      localStorage.setItem('watchlist', JSON.stringify(this.likeList));
    }else{
      delete this.likeList[this.description.ticker];
      localStorage.setItem('watchlist', JSON.stringify(this.likeList));
    }
    this.likeit = !this.likeit;
    this.closeMessage = false;
  }
  shareNews(): void{
    console.log('share!!!');
  }

  openBackDropCustomClass(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  openShare(content, x): void{
    this.currentX = x;
    // this.currentY = y;
    this.publishdate = new Date(this.thenewsData[x].publishedAt);
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  ngOnDestroy(): void {
    clearInterval(this.timeClose);
    clearInterval(this.jobhandler);
    this.unSubscribe.unsubscribe();
    this.closedaily.unsubscribe();
    this.closehistory.unsubscribe();
    this.closedescription.unsubscribe();
    this.closenews.unsubscribe();
    this.closemarket.unsubscribe();
  }

}
