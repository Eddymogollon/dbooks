import { Component, OnInit } from '@angular/core';
import { Bookdetail } from './bookdetails.model';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  books = [new Bookdetail('Game of Thrones','Pedro Ramos', 'Fantacy', 'Miami books', '$9.99',
  'here goes the synopis of the book', 'about the author','http://shakespeareandcompany.com/files/isbn/9780007448036.jpg' )
];

  test = 'pedro';

  constructor() { }

  ngOnInit() {
  }

}
