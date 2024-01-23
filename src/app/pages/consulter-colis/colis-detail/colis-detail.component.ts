import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-colis-detail',
  templateUrl: './colis-detail.component.html',
  styleUrls: ['./colis-detail.component.css']
})
export class ColisDetailComponent implements OnInit {
  @Input() colis : any = null;
  constructor() { }

  ngOnInit(): void {
    console.log("je suis la " +this.colis)
  }

}
