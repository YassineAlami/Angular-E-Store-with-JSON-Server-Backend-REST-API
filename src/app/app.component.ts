import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentAction : any;
  actions : Array<any> = [
    {title:"Home", "route":"/home",icon:"house"},
    {title:"Products", "route":"/products",icon:"bag"},
    {title:"New Product", "route":"/newProduct",icon:"plus"}
  ];

  setCurrentAction(action: any) {
    this.currentAction=action;
  }
}
