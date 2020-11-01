import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Newsdata} from '../interfaces/newsdata';
import {Description} from '../interfaces/description';
import {Market} from '../interfaces/market';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  prefix = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getDailyData(key: string): Observable<number[][]>{
    return this.http.jsonp<number[][]>(this.prefix + '/api/dailydata/' + key, 'callback');
  }
  getDescriptionData(key: string): Observable<Description>{
    return this.http.jsonp<Description>(this.prefix + '/api/des/' + key, 'callback');
  }
  getMarketData(key: string): Observable<Market>{
    return this.http.jsonp<Market>(this.prefix + '/api/market/' + key, 'callback');
  }
  getNewsData(key: string): Observable<Newsdata[]>{
    return this.http.jsonp<Newsdata[]>(this.prefix + '/api/news/' + key, 'callback');
  }
  getHistoryData(key: string): Observable<number[][]>{
    return this.http.jsonp<number[][]>(this.prefix + '/api/historydata/' + key, 'callback');
  }
  // // getDailyData(key: string, date: string): Observable<Detailsvalue>{
  // getDailyData(key: string): Observable<any>{
  //   // const dailyURL = `${this.prefix}'/api/daily/'${key}?thedate=${date}`;
  //   const dailyURL = `${this.prefix}'/api/daily/'${key}`;
  //   return this.http.jsonp<Detailsvalue>( dailyURL, 'callback');
  // }
}
