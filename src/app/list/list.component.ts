import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConatctsService } from '../conacts.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  filterString:string='';
  subscription: Subscription;
  
  constructor(private contactService:ConatctsService){
    
  }

  ngOnInit() {
    this.contacts=this.contactService.getContacts();
    this.subscription=this.contactService.contactsChanged
    .subscribe(
      (contacts:Contact[])=>{
        this.contacts=contacts;
      }
    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe;
  }

}
