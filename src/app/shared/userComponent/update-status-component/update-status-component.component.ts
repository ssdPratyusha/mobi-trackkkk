import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { ToastrService } from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-update-status-component',
  templateUrl: './update-status-component.component.html',
  styleUrls: ['./update-status-component.component.scss']
})
export class UpdateStatusComponentComponent implements OnInit {

  addMobileGroup: FormGroup;
  submitted = false;
  mobileModalsList: Object;
  userMobiles: any;

  mobileStatus = [
    { id:1, name:'Lost' },
    { id:2, name:'Found' },
    { id:3, name:'Sold' }
  ];
  selectedId: any;
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
  };
  userData: any;
  registerId: any;
  userDetails: any;
  name: any;

  constructor(private formBuilder: FormBuilder, private homeService: HomeService, private toster: ToastrService,
              private datepipe:DatePipe, private route: Router) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.registerId = this.userData.userId;
  }

  ngOnInit() {
    this.addMobileGroup = this.formBuilder.group({
      status: ['', [Validators.required]],
      dateAndTime: ['', [Validators.required]],
      mobileMakeId: ['', [Validators.required]],
      buyerName: [''],
      buyerEmail: ['' ],
      buyerMobile: [''],
      uploadFile: [''],
      myfile: ['']
    });

    const toSelect = this.mobileStatus.find(c => c.id == 1);
    this.addMobileGroup.get('status').setValue(toSelect);

    this.getMakeList();
    this.getAllRegMobDetails();
    this.addMobileGroup.get('status').valueChanges.subscribe(  
      value=> { 
        if(value.name=='Sold'){
          this.addMobileGroup.controls["buyerName"].setValidators(Validators.required);
          this.addMobileGroup.controls["buyerEmail"].setValidators(Validators.required);
          this.addMobileGroup.controls["buyerMobile"].setValidators(Validators.required);
          this.addMobileGroup.controls["buyerName"].updateValueAndValidity();
          this.addMobileGroup.get('buyerEmail').updateValueAndValidity();
          this.addMobileGroup.get('buyerMobile').updateValueAndValidity();
          this.addMobileGroup.controls["dateAndTime"].clearValidators();
          this.addMobileGroup.get('dateAndTime').updateValueAndValidity();
        } else {
          this.addMobileGroup.controls["buyerName"].clearValidators();
          this.addMobileGroup.controls["buyerEmail"].clearValidators();
          this.addMobileGroup.controls["buyerMobile"].clearValidators();
          this.addMobileGroup.controls["buyerName"].updateValueAndValidity();
          this.addMobileGroup.get('buyerEmail').updateValueAndValidity();
          this.addMobileGroup.get('buyerMobile').updateValueAndValidity();
        }
      }  
   );
  }

  getImage(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.name = file.name;
      this.addMobileGroup.get('myfile').setValue(file);
    }
  }

  resetForm(value: any = undefined) {
    this.addMobileGroup.reset(value);
    (this as { submitted: boolean }).submitted = false;
  }

  getAllRegMobDetails() {
    const data = {
      "register_id" : this.registerId
    }
    this.homeService.getAllRegisteredMobiles(data).subscribe(res => {
      this.userDetails = res['data'];
      this.userDetails = this.userDetails.filter(c => c.status="ACTIVE");
    });
  }

  getMakeList() {
    this.homeService.getMakeList(this.registerId).subscribe(res => {
      this.mobileModalsList = res['data'];
    });
  }
    
  get f() { 
    return this.addMobileGroup.controls; 
  }

  addMobileSubmit() {
    this.submitted = true;
    if (this.addMobileGroup.invalid) {
        return;
    } else {
      let data:any = {};
     data['userInfo'] = {
      'userId':this.userData.userId
     }
     data['mobileInfo'] = {
      "mobileInfoId" : this.addMobileGroup.value.mobileMakeId.id,
      "nickName": this.addMobileGroup.value.mobileMakeId.nickName,
      "status": this.addMobileGroup.value.status.name
     }
     if(this.addMobileGroup.value.status.name == 'Found') {
      data['foundInfo'] = {
        "foundDate" : this.addMobileGroup.value.dateAndTime
      }
     }
     if(this.addMobileGroup.value.status.name == 'Lost') {
      data['lostInfo'] = {
        "lostDate" : this.addMobileGroup.value.dateAndTime
      }
     }
     if(this.addMobileGroup.value.status.name == 'Sold') {
      data['soldInfo'] = {
        "buyerName" : this.addMobileGroup.value.buyerName,
        "buyerEmail" :this.addMobileGroup.value.buyerEmail,
        "buyerMobile" : this.addMobileGroup.value.buyerMobile
      }
    }

    const formData = new FormData();
    Object.keys(data).forEach(key =>{
      if(typeof(data[key])==='object') {
        for(let val in data[key]){
          formData.append(val, data[key][val]);
        }
      }
      else{
        formData.append(key, data[key]);
      }
    })

    formData.append('files', this.addMobileGroup.get('myfile').value);
    this.homeService.updateMobileStatus(formData).subscribe(res => {
      if(res['status'] == 200) { 
        this.toster.success(res['message']);
        this.addMobileGroup.reset();
        //this.route.navigateByUrl('/', { skipLocationChange: true }).then(()=>
        this.route.navigate(['/profile']);
        this.name = '';
        this.addMobileGroup.get('dateAndTime').reset();
      }
    }, err => {
      this.toster.error(err['message']);
      this.name = '';
      this.addMobileGroup.get('dateAndTime').reset();
    });
  }
}

}
