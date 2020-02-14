import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  profileImage = new Subject();

  constructor() { }

  private data = {};  
  
 setOption(option, value) {      
    this.data[option] = value;  
  }  
  
  getOption() {  
    return this.data;  
  }

  selectedImage(image){
    this.profileImage.next(image);
  }

}
