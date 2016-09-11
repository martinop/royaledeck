import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'smaller'
})
export class FilterSmaller implements PipeTransform {

  transform(value: any[], arena: number, search: string): any {
    var regexp = new RegExp(search, 'ig');
    if(search.length >= 5){
      return value.filter( element =>{
        return regexp.test(element["name"]);
      })
    }
    else{
      return value.filter( element => {
        return element["arena"] <= arena
      })      
    }
  }
}
