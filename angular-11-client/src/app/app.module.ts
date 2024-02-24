import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { OcrService } from './_services/ocr-service.service';
import { TableListComponent } from './ocr/table-list.component';
import { ModelOcrService} from './_services/model-ocr.service';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ModelOcrComponent } from './model-ocr/model-ocr.component';
import { ClientFileCardComponent } from './client-file-card/client-file-card.component';
import { EditClientFileComponent } from './edit-client-file/edit-client-file.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    TableListComponent,
    ModelOcrComponent,
    ClientFileCardComponent,
    EditClientFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders, OcrService, ModelOcrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
