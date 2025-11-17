import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TestTypingComponent } from "./test-typing/test-typing.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TestTypingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
title = 'routingtzsk';
}
