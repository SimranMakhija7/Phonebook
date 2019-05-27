import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConatctsService } from '../conacts.service';
import { Contact } from '../contact.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  contact:Contact;
  id:number;
  constructor(private route:ActivatedRoute,
              private contactsService: ConatctsService,
              private router:Router) { }

  ngOnInit() {
    //const id=+this.route.snapshot.params['id'];
    //this.contact=this.contactsService.getContact(id);
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= params['id'];
        this.contact=this.contactsService.getContact(this.id);
      }
    );

    
  }
  onEdit(){
    //this.contactsService.startedEditing.next(this.id);

    this.contactsService.EditingStarted(this.id);
  }
  onDelete(){
    this.contactsService.deleteContact(this.id);
    this.router.navigate(['/contacts']);

  }

}
