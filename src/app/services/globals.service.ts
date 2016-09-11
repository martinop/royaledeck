import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
	user: any;
	decks: Array<Object>;
	random: Array<Object> = [		
		{name: "", image: "assets/img/cartas/random.png"},
		{name: "", image: "assets/img/cartas/random.png"},
		{name: "", image: "assets/img/cartas/random.png"},
		{name: "", image: "assets/img/cartas/random.png"},
		{name: "", image: "assets/img/cartas/random.png"},
		{name: "", image: "assets/img/cartas/random.png"},
		{name: "", image: "assets/img/cartas/random.png"},
		{name: "", image: "assets/img/cartas/random.png"}
	]
	arenas: Array<Object> = [
		{arena: 1, image: "assets/img/arenas/arena1.png", active: true},
		{arena: 2, image: "assets/img/arenas/arena2.png", active: false},
		{arena: 3, image: "assets/img/arenas/arena3.png", active: false},
		{arena: 4, image: "assets/img/arenas/arena4.png", active: false},
		{arena: 5, image: "assets/img/arenas/arena5.png", active: false},
		{arena: 6, image: "assets/img/arenas/arena6.png", active: false},
		{arena: 7, image: "assets/img/arenas/arena7.png", active: false},
		{arena: 8, image: "assets/img/arenas/arena8.png", active: false},
		{arena: 9, image: "assets/img/arenas/arena9.png", active: false}
	]
	originalCards: Array<Object>;
	options: Object = {
        timeOut: 3500,
        showProgressBar: false,
        pauseOnHover: true,
        preventDuplicates: true,
        preventLastDuplicates: "visible",
        position: ["right", "top"]
    };

	getRandom():Array<Object>{
		return JSON.parse(JSON.stringify(this.random));
	}
	getOCards():Array<Object>{
		return JSON.parse(JSON.stringify(this.originalCards));
	}
	setOCards(data:Array<Object>):void{
		this.originalCards = data;
	}
	setDecks(data:Array<Object>):void{
		this.decks = data;
	}
	getDecks():Array<Object>{
		return this.decks;
	}
}