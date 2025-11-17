import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainsceneComponent } from "./mainscene/mainscene.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainsceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RPS-game';
}
