import { Injectable } from '@angular/core';
import { EventData } from "data/observable";
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class mailgrabberService {

     // Observable string sources
  private _mail :string='';

  
  setMail(mail:string){
      this._mail=mail
  }

  getMail(){
      return this._mail;
  }
}