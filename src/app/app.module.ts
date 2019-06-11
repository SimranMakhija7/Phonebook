import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PushNotificationsModule } from 'ng-push';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactSearchPipe } from './contact-search.pipe';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    ListItemComponent,
    ContactsComponent,
    EditComponent,
    ContactSearchPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PushNotificationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
