import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GlobalVars } from './globals.service';
import { API } from './API.service'
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private api: API, private globals: GlobalVars, private router: Router) {}

  	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  		if(this.globals.user){
  			return true;
  		}
  		else{
	    	let token = localStorage.getItem("royaldeck_token") || null;
	    	if(token){
	      		this.api.getProfile(token).subscribe(data => {
	      			console.log(data)
	      			if(data.user){
	      				this.globals.user = data.user;
	        			this.globals.setDecks(data.decks)
	        			return true; 
	      			}
	      			else{
	      				this.router.navigate(['/']);
						return false;
	      			}
	      		});
	    	}
	    	else{
	    		this.router.navigate(['/']);
				return false;
	    	}		
  		}    	
  	}
}