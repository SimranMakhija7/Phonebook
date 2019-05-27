import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy,  } from '@angular/core';
//import { ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../contact.model';
import { ConatctsService } from '../conacts.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class EditComponent implements OnInit, OnDestroy {
  //@ViewChild('f') slForm:NgForm;
  newContact:Contact;
  public subscription: Subscription;
  // public editMode=false;
  // public editedItemIndex: number;
  // public editItem: Contact;
  

  editForm: FormGroup; 
 constructor(private contactsService:ConatctsService,
              private router: Router,
              private formBuilder: FormBuilder) { }
    
  ngOnInit() {

    
    this.editForm=new FormGroup({
      'name':new FormControl(null,[Validators.required]),
      'profession':new FormControl(null,Validators.required),
      'phone':new FormControl(null,Validators.required),
      'address':new FormControl(null,Validators.required)
    });

    // this.subscription=this.contactsService.startedEditing.subscribe(
    //   (index:number)=>{
    //     this.editMode=true;
    //     console.log(this.editMode);
    //     this.editedItemIndex=index;
    //     this.editItem=this.contactsService.getContact(this.editedItemIndex);
    //     console.log(this.editItem)
          
          this.editForm.setValue({
            address:this.contactsService.editItem.address,
            name: this.contactsService.editItem.name,
            phone:this.contactsService.editItem.phone,
            profession:this.contactsService.editItem.profession
          });      
      
    // setTimeout(()=>{
    //   console.log("out of it :" + this.editedItemIndex);
    // },3000);
  }

  // this.editForm=new FormGroup({
  //   'name':new FormControl(null,[Validators.required]),
  //   'profession':new FormControl(null,Validators.required),
  //   'phone':new FormControl(null,Validators.required),
  //   'address':new FormControl(null,Validators.required)
  // });

  ngOnDestroy(){
   //this.subscription.unsubscribe();
  }
  onSubmit(){
      const form=this.editForm;
      this.newContact={
        name:form.value.name,
        profession:form.value.profession,
        phone:form.value.phone,
        address:form.value.address
      };if(!this.contactsService.editMode){
            this.contactsService.addContact(this.newContact);    
          }else{
            if(this.newContact !== this.contactsService.editItem){
            this.contactsService.updateContact(this.contactsService.editedItemIndex,this.newContact);
            }
          }
            this.contactsService.editMode=false;
            this.router.navigate(['/contacts']);
    }
  // onSubmit(form: NgForm){
  //   this.newContact={
  //     name:form.value.name,
  //     profession:form.value.profession,
  //     phone:form.value.phone,
  //     address:form.value.address
  //   };
  //   //if(!this.editMode){
  //     this.contactsService.addContact(this.newContact);    
  //   //}else{
  //     //this.contactsService.updateContact(this.editedItemIndex,this.newContact);
  //   }
  //     this.editMode=false;
  //     this.router.navigate(['/contacts']);
  //   }
 }
