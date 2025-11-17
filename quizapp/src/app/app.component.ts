import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { QuestionListComponent } from "./question-list/question-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddQuestionComponent, QuestionListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quizapp';
}
