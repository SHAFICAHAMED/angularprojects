import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {   CodeGameComponent } from "./components/code-game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CodeGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}

