import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { ConatctsService } from '../conacts.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';
//import { PushNotificationsService} from 'ng-push';
// import { NodeInjectorFactory } from '@angular/core/src/render3/interfaces/injector';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
  contacts;
  filterString:string='';
  subscription: Subscription;
  
  constructor(private contactService:ConatctsService){
      
  }



  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts=>
      {
        this.contacts=contacts;
      });
    //this.contactService.getContacts();
    console.log(this.contacts);
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
