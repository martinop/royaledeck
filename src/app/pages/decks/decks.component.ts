import { Component } from '@angular/core';
import { API } from '../../services/API.service'
import { MetaService } from 'ng2-meta';
import { TranslatePipe } from "ng2-translate/ng2-translate";

@Component({
	templateUrl: './decks.component.html',
	selector: "decks-list"
})
export class DecksComponent{
	search: string = "";
	arena: string = "null"
	type: string = "null"
	elixir: string = "null"
	totalItems:number = 100;
  currentPage:number = 1;
  decks: Array<Object>;

 	constructor(private api: API, private metaService: MetaService){
 		api.getDecks({start: 0}).subscribe(res => {
 			this.decks = res;
 		});
 	}

  setPage(pageNo:number):void {
  	this.currentPage = pageNo;
  };

	pageChanged(event:any):void {
    	let start = event.page == 1 ? 0 : (event.page*10)-10
     	this.goSearch(start)
    };

	goSearch(start: number):void{
		let params: Object = {start: 0};
		if(start){
			params["start"] = start;
		}
		else{
  		this.setPage(1);
  		if(this.search.trim() != ""){
  			params["search"] = this.search
  		}

  		if(this.arena != "null"){
  			params["arena"] = parseInt(this.arena);
  		}

  		if(this.type != "null"){
  			params["type"] = this.type;
  		}
		}

		/*
		if(this.elixir != "null"){
			params["elixir"] = this.elixir;
		}
*/
   	this.api.getDecks(params).subscribe(res => {
			this.decks = res;
		});

	}

}
