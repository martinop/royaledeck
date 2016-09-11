import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RandomComponent } from './pages/random/random.component';
import { BuilderComponent } from './pages/builder/builder.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DecksComponent } from './pages/decks/decks.component';
import { UserDecksComponent } from './pages/user/decksuser.component';
import { DeckComponent } from './pages/deck/deck.component';
import { CardsResolver } from './services/cards-resolver.service';
import { DecksResolver } from './services/decks-resolver.service';
import { DeckResolver } from './services/deck-resolver.service';
import { AuthResolver } from './services/auth-resolver.service'
import { MetaService } from 'ng2-meta';

export const ROUTES: Routes = [
	{ path: '', component: HomeComponent,
  		data: {
  			meta: {
  				title: "Royale Deck | Inicio",
  				description: "Pagina principal",
          'og:url': window.location.origin
  			}
 		} 
	},
  	{ path: 'random', component: RandomComponent, 
  		resolve: { cards: CardsResolver},
  		data: {
  			meta: {
  				title: "Royale Deck | Random",
  				description: "Genera mazos random seleccionando diferentes opciones",
          'og:url': window.location.origin+"/random"
  			}
 		  } 
  	},
  	{ path: 'builder', component: BuilderComponent, 
  		data: {
  			meta: {
  				title: "Royale Deck | Creador",
  				description: "Crea tus propios mazos y comparterlos con el resto de la comunidad",
          'og:url': window.location.origin+"/builder"
  			}
 		  },
      resolve: { data: AuthResolver}
  	},
  	{ path: 'decks',
      component: DecksComponent,
      data: {
        meta: {
          title: "Royale Deck | Mazos",
          description: "Todos los mazos publicos creados, puedes buscar de manera personalizada dependiendo de lo que quieres",
        }
      }
    },
    { path: 'profile', component: ProfileComponent,
      data: {
        meta: {
          title: "Royale Deck | Perfil",
          description: "Perfil personal",
          'og:url': window.location.origin+"profile"
        }
       },
      resolve: { data: AuthResolver}
    },
    { path: 'decks/:username',
      component: UserDecksComponent,
      resolve: {
        decks: DecksResolver
      },
      data: {
        meta: {
          title: "Royale Deck | Mazos",
          description: "Todos los mazos publicos creados, puedes buscar de manera personalizada dependiendo de lo que quieres",
        }
      }
    },
    { path: 'decks/:username/:id',
      component: DeckComponent,
      resolve: { deck: DeckResolver}, 
      data: {
        meta: {
          title: "Royale Deck | Mazo",
          description: "Mazo personalizado",
        }
      }
    },
];

export const routingProviders = [
	AuthResolver,
	CardsResolver,
	MetaService,
  DecksResolver,
  DeckResolver
]

export const routingComponents = [
	HomeComponent,
	RandomComponent,
	BuilderComponent,
	ProfileComponent,
	DecksComponent,
  UserDecksComponent,
  DeckComponent
]
