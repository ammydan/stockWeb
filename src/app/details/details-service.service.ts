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
  prefix = 'https://stockbackend.azurewebsites.net';
  constructor(private http: HttpClient) { }
  getDailyData(key: string): Observable<number[][]>{
    // return this.http.get<number[][]>( '/api/dailydata/' + key);
    return this.http.get<number[][]>( this.prefix + '/api/dailydata/' + key);
    // return this.http.jsonp<number[][]>(this.prefix + '/api/dailydata/' + key, 'callback');
  }
  getDescriptionData(key: string): Observable<Description>{
    // return this.http.get<Description>('/api/des/' + key);
    return this.http.get<Description>(this.prefix + '/api/des/' + key);
    // return this.http.jsonp<Description>(this.prefix + '/api/des/' + key, 'callback');
  }
  getMarketData(key: string): Observable<Market>{
    // return this.http.get<Market>('/api/market/' + key);
    return this.http.get<Market>(this.prefix + '/api/market/' + key);
    // return this.http.jsonp<Market>(this.prefix + '/api/market/' + key, 'callback');
  }
  getNewsData(key: string): Observable<Newsdata[]>{
    // return this.http.get<Newsdata[]>('/api/news/' + key);
    return this.http.get<Newsdata[]>(this.prefix + '/api/news/' + key);
    // return this.http.jsonp<Newsdata[]>(this.prefix + '/api/news/' + key, 'callback');
  }
  getHistoryData(key: string): Observable<number[][]>{
    // return this.http.get<number[][]>('/api/historydata/' + key);
    return this.http.get<number[][]>(this.prefix + '/api/historydata/' + key);
    // return this.http.jsonp<number[][]>(this.prefix + '/api/historydata/' + key, 'callback');
  }
}
