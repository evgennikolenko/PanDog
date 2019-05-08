import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-about',
  templateUrl: './app/sections/about/about.component.html'
})

export class AboutComponent implements OnInit {

  constructor (){}
             
  ngOnInit() {}

}

