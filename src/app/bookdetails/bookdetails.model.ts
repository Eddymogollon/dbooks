export class Bookdetail {
  public Author: string;
  public Bio: string;
  public Genre: string;
  public Price: number;
  public Publisher: string;
  public SYN: string;
  public Title: string;
  public path: string;
  public comments: string[];
  public Rating: number;
  public PubDate: string;
  public TimesBought: number;

  constructor( author: string, aboutAuthor: string, genre: string, price: number, publisher: string, synopsis: string, title: string,
        coverImagePath: string, rating: number, pubDate: string  ) {

         this.Title = title;
         this.Author = author;
         this.Genre = genre;
         this.Publisher = publisher;
         this.Price = price;
         this.SYN = synopsis;
         this.Bio = aboutAuthor;
         this.path = coverImagePath;
         this.comments = [];
         this.Rating = rating;
         this.PubDate = pubDate;
         this.TimesBought = 0;
      }
 }
