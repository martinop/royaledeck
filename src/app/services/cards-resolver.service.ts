import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { API } from './API.service';
import { GlobalVars } from './globals.service';

@Injectable()
export class CardsResolver implements Resolve<any> {
  constructor(private api: API, private globals: GlobalVars) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
  	if(!this.globals.originalCards){
    	return this.api.getCards();	
  	}
  	else{
  		return new Observable(observer => {
  			observer.next(this.globals.getOCards());
  			observer.complete();
  		});
  	}
  }
}
