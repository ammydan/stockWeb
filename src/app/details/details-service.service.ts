import { Injectable } from '@angular/core';
import {Detailsvalue} from '../interfaces/detailsvalue';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Newsdata} from '../interfaces/newsdata';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  prefix = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getDetailData(key: string): Observable<Detailsvalue>{
    return this.http.jsonp<Detailsvalue>(this.prefix + '/api/details/' + key, `callback`);
  }
  getNewsData(key: string): Observable<Newsdata[]>{
    return this.http.jsonp<Newsdata[]>(this.prefix + '/api/news/' + key, 'callback');
  }
  // // getDailyData(key: string, date: string): Observable<Detailsvalue>{
  // getDailyData(key: string): Observable<any>{
  //   // const dailyURL = `${this.prefix}'/api/daily/'${key}?thedate=${date}`;
  //   const dailyURL = `${this.prefix}'/api/daily/'${key}`;
  //   return this.http.jsonp<Detailsvalue>( dailyURL, 'callback');
  // }
}
