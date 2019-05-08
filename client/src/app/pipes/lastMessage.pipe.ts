import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'lastMessage'
})

export class LastMessage implements PipeTransform {
        transform(items: any[], field: string, value: number): any[] {
            console.log('PIPE', items, field, value)
          if (!items) return [];
          return items.filter(it => {
              it[field] == value});
        }
       }