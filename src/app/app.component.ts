import { Component } from '@angular/core';
import { Event,Router,NavigationStart,NavigationEnd, NavigationError,NavigationCancel} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoadingIndictor = true;
  constructor(private _router : Router) {
    this._router.events.subscribe((routerEvent :  Event) =>{
      
      if (routerEvent instanceof NavigationStart){
        this.showLoadingIndictor = true;
      }

      if (routerEvent instanceof NavigationEnd|| routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
        this.showLoadingIndictor = false;
      }
    });
}
}
