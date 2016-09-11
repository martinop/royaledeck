import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterBy implements PipeTransform {

  transform(value: any, args?: any): any {
	if (!args[0]) {
      return value;
    } 
    else if (value) {
    	args = args.split("=").map( e => {return e.trim()})
    	let property = args[0].toString();
    	let val = parseInt(args[1])
    	return value.filter( element => {
    		if(element[property] == val){
    			return true;
    		}
    	})
    }
  }

}
