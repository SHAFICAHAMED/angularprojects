import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { VocabularyComponent } from "./vocabulary/vocabulary.component";
import { QuizComponent } from "./quiz/quiz.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterComponent, DashboardComponent, LoginComponent, VocabularyComponent, QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'englishappangular';
}
