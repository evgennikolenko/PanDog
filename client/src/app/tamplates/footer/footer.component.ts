import { Component } from '@angular/core';

@Component({
  selector: 'pd-footer',
  templateUrl: './app/tamplates/footer/footer.component.html',
})


export class FooterComponent {

  footerPhrase : string = '"Это простая фраза для тестировки! Lorem Lorem ascfg hallo tre des loytre."';
  phrasesArray : string[]  = ['this is Phrase 1', 
  'this is Phrase 2',' this is Phrase 3']; 

  index: number;
  genericIndex: number;

  setPhrase() : string {
       this.genericIndex =  Math.floor(Math.random() * this.phrasesArray.length);

      if(this.genericIndex === this.index) {
        this.genericIndex =  Math.floor(Math.random() *  this.phrasesArray.length);
      }
      
      this.index = this.genericIndex;
        return this.footerPhrase = this.phrasesArray[this.index];
  }
  
  setIntervalToken :NodeJS.Timer = setInterval(() => this.setPhrase(), 3000);

      
 }