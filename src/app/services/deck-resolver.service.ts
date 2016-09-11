
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { API } from './API.service';
import { GlobalVars } from './globals.service';

@Injectable()

export class DeckResolver implements Resolve<any> {
  constructor(private api: API, private globals: GlobalVars, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot): any {
    let username = route.params['username'];
    let id = +route.params['id'];
    return new Observable(observer => {
      this.api.getDeck(username, id).subscribe(data => {
        if (!data.error) {
          observer.next(data);
          observer.complete();
        } 
        else {
          Observable.empty();
          this.router.navigate(['/']);
        }
      });
    });

  }
}
