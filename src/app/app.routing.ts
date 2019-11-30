import { CreatFunctionComponent } from './creat-function/creat-function.component';
import { HomeComponent } from './home/home.component';


import { AuthGuard } from './_guards/auth.guard';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentsListComponent } from './students-list/students-list.component';
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


const appRoutes: Routes = [
  
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'class', component: CreatFunctionComponent},
    { path: 'students-list', component: StudentsListComponent},
    { path: 'subject', component: ClasssetupComponent},
    { path: 'chapter', component: ChapterComponent},
    { path: 'fIle-upload', component:VideouploadComponent},
    { path: 'exam-title-setup', component:ExamTitleSetupComponent},
    { path: 'exam-setup', component:ExamsetupComponent},
    { path: 'question-setup', component:QuestionsetupweeklyComponent},
    { path: 'topic-test', component:TopictestComponent},
    { path: 'add-class', component:AddClassComponent},
    { path: 'recoverpassword', component:ForgetpasswordComponent, outlet: "sidebar"},
    { path: 'resetpassword', component:ResetpasswordComponent, outlet: "sidebar"},
    // 
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);