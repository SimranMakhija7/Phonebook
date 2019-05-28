import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConatctsService {
  contactsChanged= new Subject<Contact[]>();
  //public startedEditing= new Subject<number>();
  public editMode=false;
  public editedItemIndex: number;
  public editItem: Contact;
 

  private contacts: Contact[] =[
    new Contact(
      'Harry Potter',
      'Wizard',
      9658741230,
      'Cupboard Under the stairs, 4, Privet Drive'
    ),
    new Contact(
      'Ginny Weasley',
      'Wizard',
      9564821703,
      'The Burrow'
    ),
    new Contact(
      'Will Herondale',
      'ShadowHunter',
      1234567890,
      'London Shadowhunter Academy'
    ),
    new Contact(
      'Jace Herondale',
      'Shadowhunter',
      1234567890,
      'New York Shadowhunter Academy'     
    ),
    new Contact(
      'Hermione Granger',
      'Wizard',
      1234567890,
      'Hogwarts'
    )
  ];


  constructor( ){ }
  getContacts(){
    return this.contacts.slice();
  }
  getContact(index:number){
    return this.contacts[index];
  }
  addContact(newContact:Contact){
    this.contacts.push(newContact);
    this.contactsChanged.next(this.contacts.slice());
    
  }
  updateContact(index:number, newContact:Contact){
    this.contacts[index]=newContact;
    this.contactsChanged.next(this.contacts.slice());
  }
  deleteContact(index:number){
    this.contacts.splice(index,1);
    this.contactsChanged.next(this.contacts.slice());
  }
  EditingStarted(index:number){
    this.editedItemIndex=index;
    this.editItem=this.contacts[index];
    this.editMode=true;
  }

}
