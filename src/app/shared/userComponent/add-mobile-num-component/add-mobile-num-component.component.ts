import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { HomeService } from 'src/app/core/services/home.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-mobile-num-component',
  templateUrl: './add-mobile-num-component.component.html',
  styleUrls: ['./add-mobile-num-component.component.scss']
})
export class AddMobileNumComponentComponent implements OnInit {

  addMobileGroup: FormGroup;
  submitted = false;
  mobileModalsList: Object;
  userData: any;
  registerId: number;
  file:any;
  @ViewChild(FormGroupDirective, { static:true }) formGroupDirective: FormGroupDirective;

  mobileStatus = [
    { id: 1, name: 'New' },
    { id: 2, name: 'Old' }
  ];
  name: any;
  
  constructor(private formBuilder: FormBuilder, private homeService: HomeService, private toster:ToastrService,
              private route: Router) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.registerId = this.userData.userId;  
  }

  ngOnInit() {
    this.getMakeList();
    let allowOnlyNum = /^[6789]\d{9}$/;

    this.addMobileGroup = this.formBuilder.group({
      nickName: ['', [Validators.required]],
      mobileNumber: ['', Validators.compose([Validators.required,
                    Validators.pattern(allowOnlyNum)])],
      imei1: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      imei2: ['', [Validators.minLength(15), Validators.maxLength(15)]],
      mobileType: ['', [Validators.required]],
      mobileMakeId: ['', [Validators.required]],
      typeOfMobile: ['', Validators.required],
      sellerName: [''],
      sellerMobile: [''],
      sellerEmail: [''],
      myfile: ['']
    });

    this.addMobileGroup.get('typeOfMobile').valueChanges.subscribe(  
      value=> { 
        if(value === 'Old') {
          this.addMobileGroup.get('sellerMobile').validator = <any>Validators.compose([Validators.required, Validators.pattern(allowOnlyNum)]);
          this.addMobileGroup.controls["sellerEmail"].setValidators(Validators.required);
          this.addMobileGroup.controls["sellerName"].setValidators(Validators.required);
          this.addMobileGroup.controls["sellerName"].updateValueAndValidity();
          this.addMobileGroup.get('sellerEmail').updateValueAndValidity();
          this.addMobileGroup.get('sellerMobile').updateValueAndValidity();
        } 
        else{
          this.addMobileGroup.controls["sellerName"].clearValidators();
          this.addMobileGroup.controls["sellerMobile"].clearValidators();
          this.addMobileGroup.controls["sellerEmail"].clearValidators();
          this.addMobileGroup.controls["sellerName"].updateValueAndValidity();
          this.addMobileGroup.get('sellerEmail').updateValueAndValidity();
          this.addMobileGroup.get('sellerMobile').updateValueAndValidity();
        }
      }  
    );
  }
    
  get f() {
    return this.addMobileGroup.controls;
  }

  getMakeList() {
    this.homeService.getMakeList(this.registerId).subscribe(res => {
      this.mobileModalsList = res['data'];
    });
  }

  addMobileSubmit() {
    this.submitted = true;
    if (this.addMobileGroup.invalid) {
        return;
    }
    const data = this.addMobileGroup.value;
    data['userId'] = this.registerId;

    if(data.typeOfMobile === 'New') {
        delete data['sellerName'];
        delete data['sellerMobile'];
        delete data['sellerEmail'];
    }

    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    formData.append('files', this.addMobileGroup.get('myfile').value);

    this.homeService.addMobileNumber(formData).subscribe(res => {
      this.submitted = false;
      setTimeout(() => 
      this.formGroupDirective.resetForm(), 0)
      if(res['status'] == 200) {
        this.toster.success(res['message']);
        this.route.navigateByUrl('/', { skipLocationChange: true }).then(()=>
        this.route.navigate(['/profile']));
      }
    }, err => {   
      this.toster.error(err.message);
    });
  }

  resetForm(value: any = undefined) {
    this.addMobileGroup.reset(value);
    (this as { submitted: boolean }).submitted = false;
  }

  numberOnly1(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ClearSel() {
    this.addMobileGroup.get('sellerName').reset();
    this.addMobileGroup.get('sellerMobile').reset();
    this.addMobileGroup.get('sellerEmail').reset();
  }

  getImage(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.name = file.name;
      this.addMobileGroup.get('myfile').setValue(file);
    }
  }
}
