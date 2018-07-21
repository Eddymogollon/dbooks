import { Component, OnInit } from '@angular/core';
import { Bookdetail } from '../bookdetails/bookdetails.model';
import {DataFetchService} from '../firebaseData/data-fetch-service';
import { bookService } from '../shared/books.service';
import { BooksComponent } from '../books/books.component';


@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  books: Bookdetail[];
  test: String;
  selectedBookPath: String;
  userComment;
  selectedAuthorName: String;



 constructor( private bookService: bookService) { }



  setComments(userComment: String[]){
    this.userComment= userComment.slice();
  }

  setAuthorTrue(){
    return true;
    }

  updateComments(event: Event){
   this.userComment= (<HTMLInputElement>event.target).value;
  }


/*
  onSaveComments(){
    this.bookService.storeComments(this.userComment);
    .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
*/
/*
  fetchComments(){
    this.getComments();
  }
*/

/**************************Showing details of selected book only*********************************/
OnlySelectedBook(books: Bookdetail[], selectedBookPath: String){
  var temp2: Bookdetail[] = [];
  for(var i = 0; i < books.length; i++){

      if((books[i].path) == selectedBookPath){
        temp2.push(books[i]);
        }
      }
      this.books = temp2;
      console.log(this.books);
}
SelectedBookGet(){
  this.bookService.getBooks()
  .subscribe(
    (books: Bookdetail[]) =>{
      this.OnlySelectedBook(books, this.selectedBookPath);
    }
  )
}

ngOnInit() {
  this.SelectedBookGet()
  this.bookService.currentPath.subscribe(selectedBookPath => this.selectedBookPath = selectedBookPath)
  this.bookService.currentAuthorName.subscribe(selectedAuthorName => this.selectedAuthorName = selectedAuthorName)
}



  /*************Book ratiny ********/



 title = 'Star Rating';
starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
rating:number;
//Create a function which receives the value counting of stars click,
//and according to that value we do change the value of that star in list.
setStar(data:any){
      this.rating=data+1;
      for(var i=0;i<=4;i++){
        if(i<=data){
          this.starList[i]=false;
        }
        else{
          this.starList[i]=true;
        }
     }
 }

 /********Get authors name*******/

 getAuthorName(book: Bookdetail){
   this.bookService.getTheCorrectAuthorName(book.Author);
 }
}


