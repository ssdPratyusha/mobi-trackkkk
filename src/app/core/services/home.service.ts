import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpUrlService } from './httpurl.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  authdata=JSON.parse(sessionStorage.getItem('authdetails'));
  headers = new HttpHeaders({
    'content-type': 'application/json',
     'authorization':  this.authdata==null ? null :this.authdata['authorization'],
  });
  options = {
    headers: this.headers,
  }

  formheader=new HttpHeaders({
     'authorization':  this.authdata==null ? null :this.authdata['authorization'],
  });
  formoptions=  {
    headers: this.formheader,
  }

  constructor(private dataclient:HttpclientService,private http:HttpClient,private url:HttpUrlService) {
  }




  addMobileNumber(data) {

    return this.http.post(this.url.addMobileNumber,data,this.formoptions);
  }

  getMakeList(id) {
    return this.http.get(this.url.getMakeList+id, this.options);
  }

  updateMobileStatus(data) {
    return this.http.post(this.url.updateStatus, data, this.formoptions);
  }

  getAllRegisteredMobiles(data) {
    return this.http.post(this.url.getRegisteredMobiles, JSON.stringify(data), this.options);
  }
  searchdataByimei(data){
    return this.http.post(this.url.searchdata, JSON.stringify(data), this.options);
  }

  updateDetails(data) {
    return this.http.post(this.url.updateDetails, data, this.formoptions);
  }

  updateProfileDetails(data) {
    return this.http.post(this.url.updateProfile, JSON.stringify(data), this.options);
  }


  uploadProfileImage(data){
    return this.http.post(this.url.uploadProfileImage,data,this.formoptions);
  }



}
