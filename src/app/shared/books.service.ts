import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Http, Response , Headers} from "@angular/http";
import { makeDecorator } from "@angular/core/src/util/decorators";
import { map } from 'rxjs/operators';
import { BookdetailsComponent } from '../bookdetails/bookdetails.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class bookService{
    constructor(private http: Http){}
    commentService: BookdetailsComponent;

    //gest book path for all components 
    private myPath = new BehaviorSubject<String>("");
    currentPath = this.myPath.asObservable();
    
    getTheCorrectPath(myPath: String){
        this.myPath.next(myPath)
    }

    //get book author for all components
    private authorName = new BehaviorSubject<String>("");
    currentAuthorName = this.authorName.asObservable();
    
    getTheCorrectAuthorName(authorName: String){
        this.authorName.next(authorName)
    }


    getBooks(){
        return this.http.get('https://dunnos-f9b58.firebaseio.com/Books/Book1.json')
        .map(
             (response: Response) => {
                 const data = response.json();
                 return data;
             } 
        );
    }

    updateBooks(books2: any[]){
        return this.http.put('https://dunnos-f9b58.firebaseio.com/Books/Book1.json', books2);

    }

    //send comments to database 
    storeComments(comments: String){
        const headers = new Headers({'Content-Type' : 'application/json'})
        return this.http.post('https://dunnos-f9b58.firebaseio.com/Books/Book1/0/comments.json',
         comments, {headers: headers});

     }


    
}