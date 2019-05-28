import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactSearch'
})
export class ContactSearchPipe implements PipeTransform {

  transform(contactList:Contact[], filterString:string): any {
    if(contactList.length===0){
      return contactList;
    }else{
      const resultArray = contactList.filter(item => item.name.toLowerCase().includes(filterString.toLowerCase()));
      return resultArray;
    }
   }

}
