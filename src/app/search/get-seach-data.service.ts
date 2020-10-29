import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchKey} from '../interfaces/search-key';


@Injectable({
  providedIn: 'root'
})
export class GetSearchService {
  prefix = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getAutocompleteData(key: string): Observable<SearchKey[]> {
    // return this.http.get<SearchKey[]>(this.prefix + '/api/search/' + key);
    return this.http.jsonp<SearchKey[]>(this.prefix + '/api/search/' + key, `callback`);
  }
}
