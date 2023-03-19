import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basic_operations';

  display = false;

  onClick(){
    this.display = this.display === true ? false : true;
  }
}
