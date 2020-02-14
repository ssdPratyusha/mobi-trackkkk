import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/dataService.service';
import { MustMatch } from '../../forms/mustMatchPassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  resetPasswordGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private api: AuthService, 
    private toster: ToastrService,private navigateRoute:Router,private ds:DataService) { }

  ngOnInit() {

    this.resetPasswordGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
});
  }
    
  get f() { return this.resetPasswordGroup.controls; }
  
  resetPasswordSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordGroup.invalid) {
        return;
    }
let emailOrMobile:any=this.ds.getOption()
let  data=this.resetPasswordGroup.value
if(isNaN(emailOrMobile.forgot)){
  data['email']=emailOrMobile.forgot

}
else{
  data['mobile']=emailOrMobile.forgot 
 
}

    this.api.changePassword(data).subscribe(res=>{
      if(res['status']==200){
        this.toster.success(res['message'])
    this.navigateRoute.navigate(['/signIn'])
      }
      },
      err=>{
        this.toster.error(err.message)
      })
  
}

}
