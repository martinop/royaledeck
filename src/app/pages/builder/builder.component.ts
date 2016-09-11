import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from 'ng2-meta';
import { GlobalVars } from "../../services/globals.service"
import { API } from "../../services/API.service"
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { NotificationsService, SimpleNotificationsComponent } from "angular2-notifications"

@Component({
  templateUrl: './builder.component.html',
  selector: "builder",

})
export class BuilderComponent implements OnInit{
	uploading: boolean = false;
	slot: number = 0;
	search: String = "";
	options: Object;
	arenas: Array<Object> = []
	originalCards: Array<Object> = [];
	random: Array<Object> = [];
	deck: Object = {arena: 1, type: "Random", elixir: 0, disable: false};
	types: Array<Object> = [
		{name:"Offensive"}, {name:"Defensive"}, {name:"Control"}, {name:"Random"}
	]

	constructor(private notify: NotificationsService, private globals: GlobalVars, private route: ActivatedRoute, private api: API, private metaService: MetaService){
		this.arenas = globals.arenas;
		this.random = this.globals.getRandom()
		this.options = this.globals.options;
		if(!this.globals.originalCards){
	    	this.api.getCards().subscribe(data => {
	        	if (!data.error) {
	        		this.globals.setOCards(data);
					this.originalCards = data.map( card => {
						card["active"] = true;
						return card;
					})	  
	        	} 
	      	})
		}
		else{
			this.originalCards = this.globals.getOCards();
			this.originalCards = this.originalCards.map( card => {
				card["active"] = true;
				return card;
			})			
		}

		//new FilterSmaller().transform(this.originalCards, 1, "");
	}

	setCard(card:any):void{
		if(card["active"]){
			if(this.random[this.slot]["elixir"]){
				this.random[this.slot]["active"] = true;
				this.deck["elixir"] -= this.random[this.slot]["elixir"];
			}
			this.random[this.slot] = card;
			this.deck["elixir"] += card["elixir"];
			card["active"] = false;
			if(this.slot == 7){
				this.slot = 0;
			}
			else{
				this.slot++;
			}
		}
	}

	removeCard(card:any, slot:number):void{
		this.slot = slot;
		if(card["elixir"]){ 
			this.originalCards.forEach( crd =>{
				if(crd["name"] == card["name"])
					crd["active"] = true;
			})
			this.deck["elixir"] -= card["elixir"];
			this.random[slot] = {name: "", image: "assets/img/cartas/random.png"}
		}
	}

	create():void{
		let regex = new RegExp("false","g")
		let match = JSON.stringify(this.random).match(regex)
		let actives = match ? match.length : 0;
		if(!this.deck["name"]){
			this.notify.error("Error", "Agrega un nombre a tu mazo");
		}
		else{
			if(actives == 8 && !this.uploading){
				this.uploading = true;
				this.notify.info("Agregando", "Por favor espera, procesando informacion");
				this.deck["elixir"] = this.deck["elixir"]/8;
				let newDecks = this.globals.getDecks();
				this.deck["index"] =  newDecks.length > 0 ? newDecks[newDecks.length-1]["index"]+1 : 1;
				this.deck["arena"] = this.random.sort( (a,b) => {
					return b["arena"] - a["arena"]
				})[0]["arena"];
				this.deck["cards"] = this.random.map( card => {
					return card["_id"]
				})
				this.api.createDeck(this.deck).subscribe(res => {
					if(res.data == 'save'){
						this.notify.success("Bien!", "Tu mazo ha sido subido");
						newDecks.push(this.deck)
						this.globals.setDecks(newDecks);
						this.random = this.globals.getRandom();
						this.deck = {arena: 1, type: "Random", elixir: 0, disable: false};
						this.originalCards.forEach( card =>{
							card["active"] = true;
						})
					}
					else{
						this.notify.error("Error", "Algo malo ocurrio, intenta de nuevo");
					}
					this.uploading = false;
				});
			}
			else{
				this.notify.error("Error", "Completa el mazo");
			}
		}
	}

	ngOnInit(){
		/*if(!this.globals.originalCards){
			this.globals.setOCards(this.route.snapshot.data['cards']);
		}
		this.originalCards = this.globals.getOCards();
		this.originalCards = this.originalCards.map( card => {
			card["active"] = true;
			return card;
		})*/
	}

}