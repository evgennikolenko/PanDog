import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AnimalsModel } from "./../../sections/buy-animals/animalsRepository.model";
import { Animals, Animal } from '../buy-animals/animals.model';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from './../../components/cart/shopping-cart.service'

@Component({
  selector: 'app-animals-detail',
  templateUrl: './app/sections/animals-detail/animalsDetail.component.html'
})
export class AnimalsDetailComponent implements OnInit {

    animal : Animal;
    public availableAnimal : string;
    public count = '1';

  constructor(    private renderer: Renderer2, 
                  private el: ElementRef,   
                  private model : AnimalsModel, 
                  private ps : ProductService,
                  private router : ActivatedRoute, 
                  private route : Router,
                  private shoppingCartService: ShoppingCartService ) { 

    this.router.params.subscribe(
        param => {
            let id: string = param['id'];
            this.model.getAnimal(id).subscribe( animal => {
                this.animal = animal;

                if ( this.animal === undefined) {
                    this.route.navigate(['/store/product/animals'])
                }

                if(this.animal.available === true){
                    this.availableAnimal = 'In stoke'
                } else this.availableAnimal = 'not available';
            });
        })
  }
  
  public addProductToCart(product: Animal, count): void {
    this.shoppingCartService.addItem(product, +count);
    this.count = '1';
    this.route.navigate(['/store/product/animals'])
  }

  public increase(){
    let num = +this.count;
      num++;
      this.count = num.toString();
  };

  public subtraction() {
    let num = +this.count;
      num--;
      this.count = num.toString();
  }

  showContent: string = 'desc';

  public contentShow(str : string) {
     this.showContent = str;
  }

  ngOnInit() {}
}
