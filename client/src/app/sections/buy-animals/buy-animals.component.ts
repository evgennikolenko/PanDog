import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router , Params} from '@angular/router';
import { Animals } from "./animals.model";
import { AnimalsModel } from "./animalsRepository.model";
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { OrderBy  } from './../../pipes/orderrBy.pipe';
import { ShoppingCartService } from './../../components/cart/shopping-cart.service'

@Component({
  selector: 'app-buy-animals',
  templateUrl: './app/sections/buy-animals/buy-animals.component.html',
  pipes: [OrderBy]
})
export class BuyAnimalsComponent implements OnInit {

  order: string = '';
  ascending = true;      
  animals: Animals[];
  breeds : string[] = [] ;
  breedsSet : Set<string>;

  // show product
  public productsPerPage=50;
  public selectedPage = 1;
  public countPages : number;

  constructor(  private model : AnimalsModel, 
                private ps : ProductService,
                private router : ActivatedRoute, private route : Router,
                private shoppingCartService : ShoppingCartService ) { 

    this.router.queryParams.subscribe(
                params => {
                      // parameters from url
              let type : string = params['type'];
              let breed : string = params['breed'];
              let money : number = params['money'];
              let textSearch : string = params['search'];
                  this.getDataAnimals ( type, breed, money, textSearch);
                }
      );
    }
   
  public getDataAnimals( type?, breed?, money?, textSearch?) {

  let queryParams =  this.router.snapshot.queryParams;

  let pType  = queryParams.type || '',
     pBreed  = queryParams.breed || '',
     pMoney  = queryParams.money || '',
     pSearch = queryParams.search || '';

  this.breeds.splice(0,this.breeds.length);;
     
      // get filtered array with animals
     this.animals  = this.model.getAllAnimals(type || pType, breed || pBreed ,
                                                   money || pMoney, textSearch || pSearch);
     // breeds
     for(let i of this.animals){
      this.breeds.push(i.breed)
     }
    this.breedsSet = new Set(this.breeds); 
  
     // count pages
     this.pageCount();
      
     // pages show
     let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
     this.animals = this.animals.slice(pageIndex, pageIndex + this.productsPerPage);
}

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.getDataAnimals();
}

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.getDataAnimals();
}

  pageCount(): number {
    this.countPages =  Math.ceil( this.animals.length / this.productsPerPage);
    return this.countPages;
}

  public addProductToCart(product: Animals): void {
    this.shoppingCartService.addItem(product, 1);
  }

  ngOnInit() {
   this.ps.getAnimals().subscribe(
      res => res.map(item => this.animals.push(item)));      
    }
  }