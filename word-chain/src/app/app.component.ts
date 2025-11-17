import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordChainComponent } from "./word-chain/word-chain.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WordChainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'word-chain';
}
