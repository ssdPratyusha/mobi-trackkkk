import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/dataService.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editProfileDetails: FormGroup;
  userData: any;
  url: any;
  submitted: boolean = false;
  maxDate = new Date();
  usreImage:boolean = false;
  @Output() toImage = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private homeService: HomeService, private toster: ToastrService,
              private route: Router, private dataSer: DataService) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    this.editProfileDetails = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName:['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', Validators.required],
      dob:['', Validators.required]
    });

    this.editProfileDetails.controls['email'].disable();
    this.editProfileDetails.controls['mobile'].disable();

    this.editProfileDetails.setValue({
      firstName : this.userData.firstName,
      middleName : this.userData.middleName,
      lastName : this.userData.lastName,
      email : this.userData.email,
      mobile : this.userData.mobile,
      dob : this.userData.dob
    });

    if(this.userData.profileImgPath){
      this.url=this.userData.profileImgPath;
      this.usreImage=true;
    }

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.usreImage=true;
        this.url = (event.target as FileReader).result;

      }

      
      const formData = new FormData();
       formData.append('image', event.target.files[0])
       formData.append('userId', this.userData.userId);

       this.homeService.uploadProfileImage(formData).subscribe(res => {

        if(res['status'] == 200) {
          this.userData.profileImgPath = res['data'][0].profileImgPath;
          sessionStorage.setItem('userData', JSON.stringify(this.userData));
          this.dataSer.selectedImage(res['data'][0].profileImgPath);
          this.toster.success(res['message']);
        }
      }, err => {   
        this.toster.error(err.message);
      });


    }
  }

  get f() { 
    return this.editProfileDetails.controls; 
  }

  update(value){
    let prevData = JSON.parse(sessionStorage.getItem('userData'));
    Object.keys(value).forEach(function(val, key){
         prevData[val] = value[val];
    })
    sessionStorage.setItem('userData', JSON.stringify(prevData));
  }

  ProfileDetails() {
    this.submitted = true;
    const updateData = this.editProfileDetails.value;
    updateData['userId'] = this.userData.userId;
    this.homeService.updateProfileDetails(updateData).subscribe(res => {
      if (res['status'] == 200) {
        this.toster.success(res['message']);
        this.route.navigate(['/profile']);
        this.update({ firstName: this.editProfileDetails.controls['firstName'].value,
                      lastName: this.editProfileDetails.controls['lastName'].value, 
                      middleName: this.editProfileDetails.controls['middleName'].value,
                      dob: this.editProfileDetails.controls['dob'].value });
      } else {
        this.toster.error(res['message']);
      }
    });
  }

}
