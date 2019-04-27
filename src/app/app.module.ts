import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { ColdObservablesComponent } from './cold-observables/cold-observables.component';
import { HotObservableIntroComponent } from './hot-observable-intro/hot-observable-intro.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectChildComponent } from './subjects/subject-child/subject-child.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ColdObservablesComponent,
    HotObservableIntroComponent,
    SubjectsComponent,
    SubjectChildComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
