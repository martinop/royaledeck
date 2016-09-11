import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API } from '../../services/API.service'
import { MetaService } from 'ng2-meta';
import { TranslatePipe } from "ng2-translate/ng2-translate";

@Component({
	templateUrl: './deck.component.html',
	selector:"deck"
})
export class DeckComponent implements OnInit{
  	deck: Array<Object>;
 	constructor(private route: ActivatedRoute, private api: API, private metaService: MetaService){
 	}

 	ngOnInit(){
  		let user = this.route.snapshot.params["username"];
   		this.deck = this.route.snapshot.data["deck"];	 			
  		this.metaService.setTag('og:description','Mazos creados por '+user);
 	}
}
