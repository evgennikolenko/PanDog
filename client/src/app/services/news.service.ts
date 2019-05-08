import { Inject,  Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { News } from '../sections/news/news.model';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NewsService {

    worldNewsArray : News[];

     constructor (private http: Http) {

        this.worldNewsArray = new Array<News>();
        this.worldNews().subscribe(
            news => news.map(item => {
                this.worldNewsArray.push(item);
                        } ),
            error => Observable.throw(error))
            console.log('sdwq',  this.worldNewsArray);
     }
    
 private newsUrl = 'https://newsapi.org/v2/everything?pageSize=50&sources=national-geographic&apiKey=5f87115c45194e94af3a96bbff7a0a7f'; 
worldNews ():Observable<News[]> {

   return this.http.get(this.newsUrl) 
                    .map((res:Response) => {
                       return res.json().articles.map(item => {
                                            return new News(
                                                item.source,
                                                item.author,
                                                item.title,
                                                item.description,
                                                item.url,
                                                item.urlToImage,
                                                item.publishedAt)})
                    })
                    .catch((error:any) => Observable.throw(error || 'Server error')); 
            }

    getNews() {
        return this.worldNewsArray;
    }

}