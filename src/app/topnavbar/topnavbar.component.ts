import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  public choose = 1;

  constructor() { }

  ngOnInit(): void {
  }
  click(): void{

  }

}
