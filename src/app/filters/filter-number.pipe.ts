import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberElixir'
})
export class FilterNumber implements PipeTransform {

  	transform(value: any, args?: any): any {
    	return value.toFixed(1);
	}
}