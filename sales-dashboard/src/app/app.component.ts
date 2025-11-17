import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesdashboardComponent } from "./salesdashboard/salesdashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SalesdashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sales-dashboard';
}
