import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, timer, Subscription} from 'rxjs';
import {debounce} from 'rxjs/operators';
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
  constructor(private searchService: GetSearchService, private router: Router) { }

  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
    this.unsubscribeValue = this.myControl.valueChanges.pipe(debounce(() => timer(500))).subscribe(value => {
      this.searchValue = value;
      this.filterKeyword  = this.searchService.getAutocompleteData(value);
    });
  }


  ngOnDestroy(): void {
    this.unsubscribeValue.unsubscribe();
  }

  searchDetail(): void{
    this.router.navigate( ['details', this.myControl.value] );
  }
}
