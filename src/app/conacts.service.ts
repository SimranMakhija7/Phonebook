import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { PushNotificationsService } from 'ng-push';
import {Http, Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConatctsService {
  contactsChanged= new Subject<Contact[]>();
  //public startedEditing= new Subject<number>();
  public editMode=false;
  public editedItemIndex: number;
  public editItem: Contact;
 

  private contacts
  //: Contact[]
  //  =[
  //   new Contact(
  //     'Harry Potter',
  //     'Wizard',
  //     9658741230,
  //     'Cupboard Under the stairs, 4, Privet Drive'
  //   ),
  //   new Contact(
  //     'Ginny Weasley',
  //     'Wizard',
  //     9564821703,
  //     'The Burrow'
  //   ),
  //   new Contact(
  //     'Will Herondale',
  //     'ShadowHunter',
  //     1234567890,
  //     'London Shadowhunter Academy'
  //   ),
  //   new Contact(
  //     'Jace Herondale',
  //     'Shadowhunter',
  //     1234567890,
  //     'New York Shadowhunter Academy'     
  //   ),
  //   new Contact(
  //     'Hermione Granger',
  //     'Wizard',
  //     1234567890,
  //     'Hogwarts'
  //   )
  // ]
  ;


  constructor(private db:AngularFireDatabase,
    private _pushNotifications: PushNotificationsService,
    private http:Http ){
      this._pushNotifications.requestPermission();
    db.list('contacts').valueChanges().subscribe(contacts=>{
      this.contacts=contacts;
      this.notify();
    });
   }

   notify(){ //our function to be called on click
    let options = { //set options
      body: "Your contacts were modified",
      //icon: "assets/images/ironman.png" //adding an icon
    }
     this._pushNotifications.create('Contacts changed!', options).subscribe( //creates a notification
        res => console.log(res),
        err => console.log(err)
    );
  }

  getContacts(){
    return this.db.list('contacts').valueChanges();
    //this.contactsChanged.next(this.contacts);
  //  return this.contacts;

  }
  getContact(index:number){
    return this.contacts[index];
  }
  addContact(newContact:Contact){
    //this.contacts.push(newContact);
     this.db.list('contacts').push(newContact);
    //this.contactsChanged.next(this.contacts);
    
  }
  updateContact(index:number, newContact:Contact){
    this.contacts[index]=newContact;
    this.http.put('https://phone-book-a839d.firebaseio.com/contacts.json',this.contacts).subscribe(
   (response:Response)=>{
     console.log(response);
   },
   (err)=>{
     console.log(err);
   });
    this.contactsChanged.next(this.contacts);

  }
  deleteContact(index:number){
    this.contacts.splice(index,1);
    this.contactsChanged.next(this.contacts.slice());
    this.http.put('https://phone-book-a839d.firebaseio.com/contacts.json',this.contacts).subscribe(
   (response:Response)=>{
     console.log(response);
   },
   (err)=>{
     console.log(err);
   });
  }
  EditingStarted(index:number){
    this.editedItemIndex=index;
    this.editItem=this.contacts[index];
    this.editMode=true;
  }

}
