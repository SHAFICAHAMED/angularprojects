import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

export const routes: Routes = [{ path: '', component: HomeComponent },
  { path: 'add', component: AddTransactionComponent },
  { path: 'list', component: TransactionListComponent }
];