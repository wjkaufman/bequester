import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BequestsComponent } from './bequests/bequests.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  { path: 'bequests', component: BequestsComponent },
  { path: 'people', component: PeopleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
