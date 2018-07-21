import { Component, OnInit } from '@angular/core';
import { Bookdetail } from '../bookdetails/bookdetails.model';
import { bookService } from '../shared/books.service';
import { Response } from '@angular/http';
import { BookdetailsComponent } from '../bookdetails/bookdetails.component';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: []
})
export class BooksComponent implements OnInit {
  selectedBookPath: String;
  books: Bookdetail[] = [];
  books2: Bookdetail[] = [];
  books3: Bookdetail[] = [];



  // tslint:disable-next-line:no-shadowed-variable
  constructor(private bookService: bookService, private bookdetailsComponent: BookdetailsComponent) {

  }


  /**************************These Functions are for browsing based of genre*************************************************************/
  /*****************The Sci-Fi*********************************/
  OnlySci(books: Bookdetail[]) {
    const temp2: Bookdetail[] = [];
    for (let i = 0; i < books.length; i++) {

      if ((books[i].Genre) === 'SciFi') {
        temp2.push(books[i]);
      }
    }
    this.books = temp2;
    this.books3 = this.books;
    this.whatShows(10);
  }
  SciGet() {
    this.bookService.getBooks()
      .subscribe(
      (books: Bookdetail[]) => {

        this.OnlySci(books);
      }
      )
  };
  /**********************The Fiction*****************************************/
  OnlyFi(books: Bookdetail[]) {
    const temp2: Bookdetail[] = [];
    for (let i = 0; i < books.length; i++) {

      if ((books[i].Genre) === 'Fantasy') {
        temp2.push(books[i]);
      }
    }
    this.books = temp2;
    this.books3 = this.books;
    this.whatShows(10);

  }
  FiGet() {
    this.bookService.getBooks()
      .subscribe(
      (books: Bookdetail[]) => {

        this.OnlyFi(books);
      }
      );
  }
  /******************************The Programming************************************************/
  OnlyPro(books: Bookdetail[]) {
    const temp2: Bookdetail[] = [];
    for (let i = 0; i < books.length; i++) {

      if ((books[i].Genre) === 'Programming') {
        temp2.push(books[i]);
      }
    }
    this.books = temp2;
    this.books3 = this.books;
    this.whatShows(10);
  }
  ProGet() {
    this.bookService.getBooks()
      .subscribe((books: Bookdetail[]) => {
      this.OnlyPro(books);
    });
  }

  /***************************The Science*******************************************************/
  OnlyScience(books: Bookdetail[]) {
    const temp2: Bookdetail[] = [];
    for (let i = 0; i < books.length; i++) {

      if ((books[i].Genre) === 'NonFiction') {
        temp2.push(books[i]);
      }
    }
    console.log(temp2);
    this.books = temp2;
    this.books3 = this.books;
    this.whatShows(10);
  }
  Science() {
    this.bookService.getBooks()
      .subscribe(
      (books: Bookdetail[]) => {

        this.OnlyScience(books);
      }
      )
  };


  /********************************This is The TOP SELLERS***************************************************/
  OnlyTop() {
    let temp: Bookdetail[];
    temp = this.books2.sort((n1, n2) => n2.TimesBought - n1.TimesBought);
    this.books = temp;
    this.books3 = this.books;
    this.whatShows(10);
  }

  /*********************************THIS is the RATING **********************************************/
  Rated() {
    const temp2: Bookdetail[] = [];
    for (let i = 0; i < this.books.length; i++) {

      if ((this.books[i].Rating) === 5) {
        temp2.push(this.books[i]);
      }
    }
    this.books = temp2;
    this.books3 = this.books;
    this.whatShows(10);
  }

  /***********************************UPDATING THE TIMES BOUGHT*****************************************/
  buyBook(book: Bookdetail) {
    for (let i = 0; i < this.books2.length; i++) {
      if (book.Title === this.books2[i].Title) {
        this.books[i].TimesBought++;
        this.books2[i].TimesBought = this.books[i].TimesBought;
      }
    }
    this.putBooks();
  }

  putBooks() {
    this.bookService.updateBooks(this.books2).subscribe(
      (response) => console.log(response)
    );
  }


  /******************************THIS HAPPENS When the page loads*************************************************/
  setBooks(books: Bookdetail[]) {
    this.books = books;
    this.books2 = books;
    this.books3 = books;
    this.whatShows(10);
  }

  whatShows(num: number, start: number = 0) {
    const temp: Bookdetail[] = [];
    console.log(this.books3);
    if (this.books3.length >= num) {
      if (num === 10 || num === 20) {
        for (start; start < num; start++) {
          temp.push(this.books3[start]);
        }
      } else if (num > 20) {
        for (start; start < this.books3.length; start++) {
          temp.push(this.books3[start]);
        }
      }
      this.books = temp;
    }
  }



  onGet() {

    this.bookService.getBooks()
      .subscribe(
      (books: Bookdetail[]) => {
        this.setBooks(books);
      },
      (error) => console.log(error)
      );


  }

  ngOnInit() {
    this.onGet();
    this.bookService.currentPath.subscribe(selectedBookPath => this.selectedBookPath = selectedBookPath)
  }


  /****************************** HERE starts the sorting methods *************************/
  sortByTitle() {
    let temp: Bookdetail[];
    temp = this.books.sort((n1, n2) => {
      if (n1.Title > n2.Title) {
        return 1;
      }
      if (n1.Title < n2.Title) {
        return -1;
      }
      return 0;
    });
    this.books = temp;

  }

  sortByAuthor() {
    let temp: Bookdetail[];
    temp = this.books.sort((n1, n2) => {
      if (n1.Author > n2.Author) {
        return 1;
      }
      if (n1.Author < n2.Author) {
        return -1;
      }
      return 0;
    });
    this.books = temp;

  }

  sortByPriceHL() {
    let temp: Bookdetail[];
    temp = this.books.sort((n1, n2) => n2.Price - n1.Price);
    this.books = temp;

  }

  sortByPriceLH() {
    let temp: Bookdetail[];
    temp = this.books.sort((n1, n2) => n1.Price - n2.Price);
    this.books = temp;

  }

  sortByRating() {
    let temp: Bookdetail[];
    temp = this.books.sort((n1, n2) => n2.Rating - n1.Rating);
    this.books = temp;

  }

  sortByRelease() {
    let temp: Bookdetail[];

    temp = this.books.sort((n1, n2) => {
      if (n1.PubDate.split(' ')[0] > n2.PubDate.split(' ')[0]) {
        return -1;
      } else if (n1.PubDate.split(' ')[0] < n2.PubDate.split(' ')[0]) {
        return 1;
      } else if (n1.PubDate.split(' ')[1] > n2.PubDate.split(' ')[1]) {
        return -1;
      } else if (n1.PubDate.split(' ')[1] < n2.PubDate.split(' ')[1]) {
        return 1;
      } else if (n1.PubDate.split(' ')[2] > n2.PubDate.split(' ')[2]) {
        return -1;
      } else if (n1.PubDate.split(' ')[2] < n2.PubDate.split(' ')[2]) {
        return 1;
      }
      return 0;
    });
    this.books = temp;


  }

  /****************Get Book Path *****************/
  getBook(book: Bookdetail) {
    this.bookService.getTheCorrectPath(book.path);
  }



}
