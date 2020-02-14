import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.scss']
})
export class UpdateDetailsComponent implements OnInit {

  updateMobileGroup: FormGroup;
  isDisabled: boolean = true;
  id: number;
  submitted: boolean = false;
  register_id: number;
  mobileMakeId: number;
  mobileNumber: number;
  mobileModalsList: any;
  typeOfMobile: any;
  userData: any;
  registerId: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private formBuilder: FormBuilder, private homeService: HomeService,
              private toster:ToastrService, private dialogRef: MatDialogRef<any>, private router: Router) {
      this.userData = JSON.parse(sessionStorage.getItem('userData'));
      this.registerId = this.userData.userId;
    }

  ngOnInit() {
    this.updateMobileGroup = this.formBuilder.group({
      mobileType: ['', [Validators.required]],
      nickName:['', [Validators.required]],
      imei1: ['', [Validators.required]],
      imei2: ['', [Validators.required]],
      mobileMakeId: ['', Validators.required],
      status:['', Validators.required]
    });
    
    this.updateMobileGroup.controls['status'].disable();

    let data = JSON.parse(this.data);
    // alert(JSON.stringify(data));
    this.id = data.id;
    this.register_id = data.register_id;
    this.mobileNumber = data.mobileNumber;
    this.typeOfMobile = data.typeOfMobile;

    this.updateMobileGroup.setValue({
      mobileType :data.mobileType,
      nickName :data.nickName,
      imei1 :data.imei1,
      imei2 :data.imei2,
      status :data.status,
      mobileMakeId: data.mobileMakeId
    });
    this.getMakeList();
  }

  getMakeList() {
    this.homeService.getMakeList(this.registerId).subscribe(res => {
      this.mobileModalsList = res['data'];
    });
  }

  get f() { 
    return this.updateMobileGroup.controls; 
  }

  updateDetails() {
    this.submitted = true;
    const updateData = this.updateMobileGroup.value;
    updateData['userId'] = this.register_id;
    updateData['mobileInfoId'] = this.id;
    updateData['mobileNumber'] = this.mobileNumber;
    updateData['typeOfMobile'] = this.typeOfMobile;

    const formData = new FormData();
    Object.keys(updateData).forEach(key => formData.append(key, updateData[key]));

    this.homeService.updateDetails(formData).subscribe(res => {
      if(res['status'] == 200) {
        this.toster.success(res['message']);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(()=>
        this.router.navigate(['/profile']));
      } else {
        this.toster.error(res['message']);
      }
    });
    this.dialogRef.close();
  }

}
