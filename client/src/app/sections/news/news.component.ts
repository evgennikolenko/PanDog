import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { News } from './news.model'
import { NewsService } from '../../services/news.service'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-news',
  templateUrl: './app/sections/news/news.component.html'
})

export class NewsComponent implements OnInit {

  worldNews : News[];

  // select pages
  public page : number = 1;
  public newsOnPage : number = 10;

  public first : number = 0;
  public last : number = 10;
  isSelected;

  constructor ( private http: Http,
                private newsService : NewsService) {
                  this.worldNews = this.newsService.getNews();
                  this.first = (this.page - 1) * this.newsOnPage;
                }

  selectPage(e){
    this.isSelected = true;
    this.page = e.value;
    this.first = (this.page - 1) * this.newsOnPage;
    this.last = this.first + this.newsOnPage;
  }

  ngOnInit() {}

}
