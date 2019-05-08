import { Component, OnInit, Input } from '@angular/core';
import {Router,  ActivatedRoute} from '@angular/router';
import { Animals } from './../animals.model';
import { AnimalsModel } from "./../animalsRepository.model";
import  { BuyAnimalsComponent } from './../buy-animals.component';

@Component({
  selector: 'filter-animals',
  templateUrl: './app/sections/buy-animals/filter-animals/filter-animals.component.html'
})
export class FilterAnimalsComponent implements OnInit {

  @Input() breedsSet: Set<string>;

  rangeMoney = '0';
  types : string[];
  showBreedsInTempl: boolean = false;
  breeds : string[] = [] ;

  constructor(private model : AnimalsModel, 
              private byanimal : BuyAnimalsComponent,
              private router : ActivatedRoute, 
              private route : Router) { 

                this.router.queryParams.subscribe(
                  params => {
                    this.breeds.splice(0,this.breeds.length);
                   
                let type : string = params['type'];
                let breed : string = params['breed'];
                let money : number = params['money'];
                let textSearch : string = params['search'];
                    this.byanimal.getDataAnimals ( type, breed, money, textSearch);

                      
      for(let i of this.byanimal.animals){
        this.breeds.push(i.breed)
      }
      this.breedsSet = new Set(this.breeds); 

      if ( this.router.snapshot._routerState.url === '/store/product/animals' ||
      this.router.snapshot._routerState.url === '/store/product/animals?search='){
        this.showBreedsInTempl = false;
      } else this.showBreedsInTempl = true;
      
                  })}

  getAnimals() : Animals[] {
    return this.model.getAllAnimals();
  }
  
  getTypesAnimals() {
      return this.model.getTypesAnimals();
  }
  
  getBreedAnimals() {
    return this.model.getBreedAnimals();
  }
  
  filterType(element: HTMLInputElement) {
    this.byanimal.changePage(1);
    this.route.navigate(['/store/product/animals'], { queryParams: {
       type: element.value} 
    });
}

  filterBreed(element: HTMLInputElement) {
    this.byanimal.changePage(1);
      this.route.navigate(['/store/product/animals'], { queryParams: {
      breed : element.value}
     });
  }

  filterMoney(count){
    this.byanimal.changePage(1);
    this.route.navigate(['/store/product/animals'], { queryParams: {
      money : count}
     });
  }

  filterSearch(text){
    this.byanimal.changePage(1);
    this.route.navigate(['/store/product/animals'], { queryParams: {
      search : text}
     });
     console.log(`TExt in full : ${text}`)

  }

  fullSearch(type, breed, money){
    this.byanimal.changePage(1);
    this.route.navigate(['/product/animals'], { queryParams: {
      type : type,
    breed : breed, 
  money : money
  }});}

  

  ngOnInit() {  
    if(this.router.snapshot._routerState.url.indexOf('?') !== -1){
        this.route.navigate(['/product/animals'])
    }
  }

}
