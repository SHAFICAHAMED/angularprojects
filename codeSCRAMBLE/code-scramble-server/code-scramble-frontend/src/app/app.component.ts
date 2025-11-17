import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeHomeComponent } from "./code-home/code-home.component";

@Component({
  selector: 'app-root',
  imports: [ CodeHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'code-scramble-frontend';
}
