import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menuPage: string = 'recipes';

  onChangeMenuPage(menuPage){
    this.menuPage = menuPage;
    console.log(this.menuPage);
  }
}
