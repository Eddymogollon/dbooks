import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BookdetailsComponent} from '../bookdetails/bookdetails.component';
@Injectable()
export class DataFetchService {
    constructor(private http: Http, private bookcomments: BookdetailsComponent){}
/*
storeComments(){
    return this.http.put('https://dbook-e7dba.firebaseio.com/comments.json', this.bookcomments.getComments);
}
*/
}
