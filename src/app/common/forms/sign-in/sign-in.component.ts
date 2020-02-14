import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
 
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginFormGroup: FormGroup;
  submitted = false;
  pattern="/^(?:\d{10}|\w+@\w+\.\w{2,3})$/";
 
  constructor(private formBuilder: FormBuilder, private api: AuthService, private toster: ToastrService,private navigateRoute:Router ) { }
 
  ngOnInit() {
    let emailORphone = '/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/';
 
    this.loginFormGroup = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
 
  get f() { return this.loginFormGroup.controls; }
 
  loginSubmit() {
    this.submitted = true;
 
    // stop here if form is invalid
    if (this.loginFormGroup.invalid) {
      return;
    }
    else {
      let data = this.loginFormGroup.value
 
      this.api.signIn(data).subscribe(res => {
          sessionStorage.setItem("authdetails", JSON.stringify(res))
         this.getUserDetails(data['username']);
 
      },
        err => {
          this.toster.error(err.message);
        })
 
    }


 
  }
 
  getUserDetails(userName) {
    let data = {}
    if (isNaN(userName)) {
 
      data["email"] = userName
    }
 
    else {
      data["mobile"] = userName
    }
 
    this.api.getUserInfo(data).subscribe(res => {
      if (res['status'] = 200) {
        sessionStorage.setItem('userData', JSON.stringify(res['data'][0]));
        this.navigateRoute.navigate(['/profile']);
      }
 
    },err=>{
      this.toster.error(err.error)
    })
 
  }


}
