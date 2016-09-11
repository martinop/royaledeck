import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API } from '../../services/API.service'
import { MetaService } from 'ng2-meta';
import { TranslatePipe } from "ng2-translate/ng2-translate";

@Component({
	templateUrl: './decksuser.component.html',
	selector:"decks-user"
})
export class UserDecksComponent implements OnInit{
  	decks: Array<Object>;
  	user: string;
 	constructor(private route: ActivatedRoute, private api: API, private metaService: MetaService){
 	}

 	ngOnInit(){
  		this.user = this.route.snapshot.params["username"];
   		this.decks = this.route.snapshot.data["decks"];	 			
  		this.metaService.setTag('og:description','Mazos creados por '+this.user);
    	this.metaService.setTag('og:url',window.location.origin+"/#/"+this.user);
 	}
}
