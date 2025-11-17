import { Routes } from '@angular/router';
import { AddsentenceComponent } from './addsentence/addsentence.component';
import { SentenceComponent } from './sentence/sentence.component';

export const routes: Routes = [
    {path:'addsentence',component:AddsentenceComponent},
    { path: '', redirectTo: 'sentence', pathMatch: 'full' }, 
];
