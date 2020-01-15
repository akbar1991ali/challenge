import { LoaderService } from './_services/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { JwtHttpInterceptor } from './jwt-http-interceptor';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule,ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { CreatFunctionComponent } from './creat-function/creat-function.component';
import { LoginService } from './_services/login.service';
import { StudentsListComponent } from './students-list/students-list.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';
import { ClasssetupComponent } from './classsetup/classsetup.component';
import { ChapterComponent } from './chapter/chapter.component';
import { VideouploadComponent } from './videoupload/videoupload.component';
import { ExamTitleSetupComponent } from './exam-title-setup/exam-title-setup.component';
import { ExamsetupComponent } from './examsetup/examsetup.component';
import { QuestionsetupweeklyComponent } from './questionsetupweekly/questionsetupweekly.component';
import { TopictestComponent } from './topictest/topictest.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ExamtopperlistComponent } from './examtopperlist/examtopperlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    CreatFunctionComponent,
    LoaderComponent,
    StudentsListComponent,
    AlertComponent,
    ClasssetupComponent,
    ChapterComponent,
    VideouploadComponent,
    ExamTitleSetupComponent,
    ExamsetupComponent,
    QuestionsetupweeklyComponent,
    TopictestComponent,
    AddClassComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ExamtopperlistComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    AuthGuard,
    LoginService,
    LoaderService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtHttpInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '', }
, { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
