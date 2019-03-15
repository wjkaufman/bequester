import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BequestComponent } from './bequest/bequest.component';
import { BequestsComponent } from './bequests/bequests.component';
import { PersonComponent } from './person/person.component';
import { PeopleComponent } from './people/people.component';
import { HoldingComponent } from './holding/holding.component';
import { HoldingEditorComponent } from './holding-editor/holding-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BequestComponent,
    BequestsComponent,
    PersonComponent,
    PeopleComponent,
    HoldingComponent,
    HoldingEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
