import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, timer, Subscription} from 'rxjs';
import {catchError, debounce, mergeMap} from 'rxjs/operators';
import {GetSearchService} from './get-seach-data.service';
import {SearchKey} from '../interfaces/search-key';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{
  myControl = new FormControl('');
  filterKeyword: Observable<SearchKey[]>;
  unsubscribeValue: Subscription;
  searchValue: string;
  loadingSearch: boolean;
  constructor(private searchService: GetSearchService, private router: Router) { }

  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
    this.unsubscribeValue = this.myControl.valueChanges.pipe(debounce(() => timer(500))).subscribe(value => {
      // console.log('change');
      this.searchValue = value;
      if (!value || value === ''){
        this.searchValue = null;
        this.loadingSearch = false;
        this.filterKeyword = null;
        return ;
      }
      this.loadingSearch = true;
      this.filterKeyword  = this.searchService.getAutocompleteData(value).pipe(
        mergeMap(thevalue => {
          this.loadingSearch = false;
          return new Observable<SearchKey[]>(reserver => {
            reserver.next(thevalue);
          });
        }),
        catchError( error => {
          this.loadingSearch = false;
          return new Observable<SearchKey[]>();
        })
      );
    });
  }


  ngOnDestroy(): void {
    this.unsubscribeValue.unsubscribe();
  }

  searchDetail(): void{
    this.router.navigate( ['details', this.myControl.value] );
  }
}
