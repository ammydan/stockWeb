import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Detailsvalue} from '../interfaces/detailsvalue';
import {Observable} from 'rxjs';
import {DetailsService} from './details-service.service';
import {catchError} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy{
  details: Observable<Detailsvalue>;
  currentTime: Date;
  timeClose: any;
  hasdetail: boolean;
  market: boolean;
  openTime: Date;

  constructor(private modalService: NgbModal, private detailsService: DetailsService, private route: ActivatedRoute) {
    this.timeClose = setInterval(() => {
      this.currentTime = new Date();
    }, 1);
    this.hasdetail = true;
    this.market = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      keyword => {
        const keyw = keyword.get('searchvalue');
        console.log(keyw);
        this.detailsService.getDetailData(keyw).subscribe(response => {
            this.hasdetail = true;
            this.openTime = new Date(response.timestamp);
            this.details = new Observable<Detailsvalue>((observer) => {
              observer.next(response);
              console.log(response);
              return {
                unsubscribe(): void{
                }
              };
            });
            if (this.openTime < this.currentTime){
              this.market = false;
            }else {
              this.market = true;
            }
          },
          error => {
            // console.log(error);
            this.hasdetail = false;
          });
      }
    );
  }
  openBackDropCustomClass(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  ngOnDestroy(): void {
    clearInterval(this.timeClose);
  }

}
