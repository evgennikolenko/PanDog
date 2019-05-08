import { Injectable } from "@angular/core";
import { Animals } from "./animals.model";
import { ProductService } from '../../services/product.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class AnimalsModel {

    public data: Animals[];
    private types : string[];

    constructor( private ps : ProductService) {

        this.data = new Array<Animals>();
        this.types = new Array<string>();
        
        this.ps.getAnimals().subscribe(
            res => {
                console.log('animals', res);
                res.map(item => this.data.push(item))
            });
            console.log("DATA", this.data);  
    }

    getAllAnimals(type? : string, breed? : string, money? : number, textSearch?: string): Animals[] {

        if(  type && breed && money ) {
            return this.data.filter( (animals:Animals, index : number, array:Animals[]) => {
                return animals.cost <= money && animals.type === type && animals.breed === breed;
            }) 
        }
        
        else if ( type && breed ) {
            return this.data.filter( (animals:Animals, index : number, array:Animals[]) => {
                return animals.type === type && animals.breed === breed;
            }) 
        }

        else if ( type && money ) {
            return this.data.filter( (animals:Animals, index : number, array:Animals[]) => {
                return animals.cost <= money && animals.type === type;
            }) 
        } 

        else if ( breed && money ) {
            return this.data.filter( (animals:Animals, index : number, array:Animals[]) => {
                return animals.breed === breed && animals.cost <= money;
            }) 
        }
        
        else if (money) {
            return this.data.filter( (animals:Animals, index : number, array:Animals[]) => {
                return animals.cost <= money;
            }) 
        }   

        else  if(type){
            return this.data.filter( (animals : Animals, index : number, array : Animals[])=>{
                return animals.type === type;
            })
        } 

        else if (breed) {
            return this.data.filter( (animals:Animals, index : number, array:Animals[]) => {
                return animals.breed === breed;
            }) 
        } 
        
        else if (textSearch){
                textSearch = textSearch.toLowerCase();
            return this.data.filter( (animals:Animals, index : number, array:Animals[]) => {
                 return animals.type.toLowerCase().indexOf(textSearch) != -1 ||
                 animals.breed.toLowerCase().indexOf(textSearch) != -1;      
            }) ;
        }
        
        else {
            return this.data;
        }
    }

    public locator = (animal:Animals, id:number) => animal.id == id;

     getAnimal(id: string) {
        return this.ps.getAnimal(id);
    }

    getTypesAnimals(){
        let array = [];
        for ( let item of  this.data){
                array.push(item.type);
        }
        return  new Set(array);
      }

      getBreedAnimals(){
        let array = [];
        for ( let item of  this.data){
                array.push(item.breed);
        }
        return  new Set(array);
      }
}
