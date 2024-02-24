import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { TableListComponent } from './ocr/table-list.component';
import {ModelOcrComponent} from './model-ocr/model-ocr.component';
import { EditClientFileComponent} from './edit-client-file/edit-client-file.component';
import {ClientFileCardComponent} from './client-file-card/client-file-card.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: TableListComponent },
  { path: 'mod', component: ModelOcrComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'ocr', component: TableListComponent }, // Adjust as needed
  { path: 'edit-client-file/:id', component: EditClientFileComponent },
  { path: 'client-files', component: ClientFileCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
