import { Injectable } from '@angular/core';
import {Detailsvalue} from '../interfaces/detailsvalue';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  prefix = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getDetailData(key: string): Observable<Detailsvalue>{
    return this.http.jsonp<Detailsvalue>(this.prefix + '/api/details/' + key, `callback`);
  }
}
