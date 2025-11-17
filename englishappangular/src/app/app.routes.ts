import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { VocabularylistComponent } from './vocabularylist/vocabularylist.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'',redirectTo:'/login',pathMatch:'full'},
    { path: 'vocabulary', component: VocabularyComponent },
    { path: 'vocabularylist', component: VocabularylistComponent },
    { path: 'home', component: HomeComponent },
    {path:'quiz',component:QuizComponent}
];
