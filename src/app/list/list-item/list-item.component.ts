import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/contact.model';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() contact:Contact;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
