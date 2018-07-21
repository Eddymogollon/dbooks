import { Component, OnInit } from '@angular/core';
import { Bookdetail } from '../bookdetails/bookdetails.model';
import { bookService } from '../shared/books.service';
import { Response } from '@angular/http';
import { BookdetailsComponent } from '../bookdetails/bookdetails.component';

@Component({
  selector: 'app-same-author',
  templateUrl: './same-author.component.html',
  styleUrls: ['./same-author.component.css']
})
export class SameAuthorComponent implements OnInit {
  selectedAuthorName: String;
  selectedBookPath: String;
  books: Bookdetail[] = [];
  books2: Bookdetail[] = [];
  books3: Bookdetail[] = [];
 


  constructor(private bookService: bookService) { 
  }

  /***************************The same author******************************************************/
OnlySelectedAuthor(books: Bookdetail[], selectedAuthorName: String){
    var temp2: Bookdetail[] = [];
    for(var i = 0; i < books.length; i++){
      
        if((books[i].Author) == selectedAuthorName){
          temp2.push(books[i]);
          }
        } 
        console.log(temp2);
        this.books = temp2;
        this.books3 = this.books;
        this.whatShows(10);
  }
  SelectedAuthorGet(){
    this.bookService.getBooks()
    .subscribe(
      (books: Bookdetail[]) =>{ 
        
        this.OnlySelectedAuthor(books, this.selectedAuthorName);
      }
    ) 
  };

  ngOnInit() {
    this.SelectedAuthorGet()
    this.bookService.currentPath.subscribe(selectedBookPath => this.selectedBookPath = selectedBookPath)
    this.bookService.currentAuthorName.subscribe(selectedAuthorName => this.selectedAuthorName = selectedAuthorName)
  }

  getBook(book: Bookdetail){
    this.bookService.getTheCorrectPath(book.path);
  }


/******************************THIS HAPPENS When the page loads*************************************************/
setBooks(books: Bookdetail[]){
  this.books = books;
  this.books2 = books;
  this.books3 = books;
  this.whatShows(10);
}

whatShows(num: number, start: number = 0){
  var temp: Bookdetail[] = []
  console.log(this.books3)
  if(this.books3.length >= num){
    if (num == 10 || num == 20){
      for(start; start < num; start++){
          temp.push(this.books3[start]);
        }
    }else if(num > 20){
      for(start; start < this.books3.length; start++){
        temp.push(this.books3[start]);
      }
  }
  this.books = temp;
}
}




}
