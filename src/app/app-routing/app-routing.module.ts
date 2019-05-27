import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from '../contacts/contacts.component';
import { DetailsComponent } from '../details/details.component';
import { EditComponent } from '../edit/edit.component';

const appRoutes: Routes=[
  { path:'', redirectTo:'/contacts', pathMatch:'full'},
  { path: 'contacts', component: ContactsComponent, children:[
    {path:'new',component:EditComponent},
    {path:':id',component:DetailsComponent},
    {path:':id/edit',component:EditComponent}
  ] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { 
  
}
