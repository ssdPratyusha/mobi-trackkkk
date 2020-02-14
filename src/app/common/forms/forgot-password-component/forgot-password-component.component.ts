import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DataService } from 'src/app/core/services/dataService.service';

@Component({
  selector: 'app-forgot-password-component',
  templateUrl: './forgot-password-component.component.html',
  styleUrls: ['./forgot-password-component.component.scss']
})
export class ForgotPasswordComponentComponent implements OnInit {

  forgotPasswordGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private api: AuthService, 
    private toster: ToastrService,private navigateRoute:Router,
    private dialog:MatDialog,private ds:DataService) { }

  ngOnInit() {

    this.forgotPasswordGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      // oTP: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
    
  get f() { return this.forgotPasswordGroup.controls; }
  forgotPasswordSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordGroup.invalid) {
        return;
    }
    else{
      let data={}
      this.ds.setOption('forgot',this.forgotPasswordGroup.value.email)

      if(isNaN(this.forgotPasswordGroup.value.email)){
        data['email']=this.forgotPasswordGroup.value.email
        data['flag']=false
      }
      else{
        data['mobile']=this.forgotPasswordGroup.value.email 
        data['flag']=false
      }

this.api.generateOtp(data).subscribe(res=>{
if(res['status']==200){
  this.toster.success(res['message'])
  this.
  openmobileDialog() 

}
},
err=>{
  this.toster.error(err.message)
})

    }

}

openmobileDialog() {

 

      const dialogRef = this.dialog.open(ForgotOtpDialogContenteDialog);
      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      });
    

}

}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'forgotOtp.component.html',
  
})
export class ForgotOtpDialogContenteDialog {
  data: any;

  constructor(private fb: FormBuilder,private authservice:AuthService,
    private toster:ToastrService,public dialog: MatDialog,private navigateRoute:Router,private ds:DataService
  ) { }

  registationForm: FormGroup;
  submitted = false;
  
  ngOnInit() {
    this.registationForm=this.fb.group({
      otpValue:['',[Validators.required,Validators.maxLength(4),Validators.minLength(4)]]
    })
  

  }
  get f() { return this.registationForm.controls; }

  verifyOtp(){

    let data=this.registationForm.value
    this.data=this.ds.getOption()
    data.username=this.data.forgot

    this.authservice.verifyOtp(data).subscribe(res=>{
      if(res['status']==200){
        this.toster.success(res['message']);
        this.navigateRoute.navigate(['/changePassword']);
      }

  
    },
    err=>{
    //  console.log(err)
   
   this.toster.error(err.message);
    }) 
  }

 

}
