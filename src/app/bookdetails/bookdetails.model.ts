export class Bookdetail{
  public title: string;
  public author: string;
  public gerne: string;
  public publisher: string;
  public price: string;
  public synopsis: string;
  public aboutAuthor: string;
  public coverImagePath: string;

  constructor(title: string, author: string, gerne: string, publisher: string, price: string,
      synopsis: string, aboutAuthor: string, coverImagePath: string ){

         this.title = title;
         this.author = author;
         this.gerne = gerne;
         this.publisher = publisher;
         this.price = price;
         this.synopsis = synopsis;
         this.aboutAuthor = aboutAuthor;
         this.coverImagePath = coverImagePath;
      }
 }
