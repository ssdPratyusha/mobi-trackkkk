import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/dataService.service';
import { MustMatch } from '../mustMatchPassword';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.scss']
})
export class SignUpComponentComponent implements OnInit {


  registationForm: FormGroup;
  submitted = false;
  showEModal:boolean=false;
  formdata:any;

  constructor(private fb: FormBuilder,private authservice:AuthService,
    private toster:ToastrService,private navigateRoute:Router,public dialog: MatDialog,private ds:DataService
  ) { }

  ngOnInit() {

    let notallowSpecialChar = /^[a-zA-Z0-9_]*$/;
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   

    this.registationForm = this.fb.group({
      firstName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(notallowSpecialChar)
      ])],
      middleName: [null, Validators.compose([ Validators.pattern(notallowSpecialChar)])],
      lastName: [null, Validators.compose([Validators.required,Validators.pattern(notallowSpecialChar) ])],
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailregex)])],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(25)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.registationForm.controls; }


  signUpSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registationForm.invalid) {
      return;
    }
    else{
      if(this.registationForm.value.password!=this.registationForm.value.confirmPassword){
   this.toster.warning('Password and confirm password must be same')
      }
      else{
        this.openDialog()
      }
     
    }


  }



  

  openDialog() {
    this.ds.setOption('register', this.registationForm.value);  
  

    let data={
      'email':this.registationForm.value.email,
      'flag':true
    }

    this.authservice.generateOtp(data).subscribe(res=>{
      if(res['status']==200){
        this.toster.success(res['message']);
        const dialogRef = this.dialog.open(DialogContentExampleDialog);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
  
    },
    err=>{
    //  console.log(err)
   
   this.toster.error(err.message);
    })



 
  }

  

 

  numberOnly(event):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }



}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'emaildialog.component.html',
  providers: [SignUpComponentComponent]
})
export class DialogContentExampleDialog {
  data: any;
  constructor(private fb: FormBuilder,private authservice:AuthService,
    private toster:ToastrService,public dialog: MatDialog,private signup:SignUpComponentComponent,private ds:DataService
  ) { }

  registationForm: FormGroup;
  submitted = false;
  
  ngOnInit() {
    this.registationForm=this.fb.group({
      otpValue:['',[Validators.required,Validators.maxLength(4),Validators.minLength(4)]]
    })
    this.data = this.ds.getOption();  

  }
  get f() { return this.registationForm.controls; }

  verifyEmail(){

    let data=this.registationForm.value
    data.username=this.data.register.email

    this.authservice.verifyOtp(data).subscribe(res=>{
      if(res['status']==200){
        this.toster.success(res['message']);
      this.openmobileDialog()
      }

  
    },
    err=>{
    //  console.log(err)
   
   this.toster.error(err.message);
    }) 
  }

  openmobileDialog() {

    let data={
      'mobile':parseInt(this.data.register.mobile),
      'flag':true
    }

    this.authservice.generateOtp(data).subscribe(res=>{
      if(res['status']==200){
        this.toster.success(res['message']);

        const dialogRef = this.dialog.open(MobileDialogContentExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
      }
  
    },
    err=>{
    //  console.log(err)
   
   this.toster.error(err.message);
    })

 
  }

}



@Component({
  selector: 'dialog-content-example-mobile',
  templateUrl: 'mobiledialog.component.html',
  providers: [SignUpComponentComponent]
})
export class MobileDialogContentExampleDialog {
  data: any;


  constructor(private fb: FormBuilder,private authservice:AuthService,
    private toster:ToastrService,public dialog: MatDialog,private signup:SignUpComponentComponent,private ds:DataService,private navigateRoute:Router,
  ) { }
  
  registationForm: FormGroup;
  submitted = false;

  get f() { return this.registationForm.controls; }
  ngOnInit() {
    this.registationForm=this.fb.group({
      otpValue:['',[Validators.required,Validators.maxLength(4),Validators.minLength(4)]]
    })

  }


  verifyMobile(){

    let data=this.registationForm.value
    this.data=this.ds.getOption()
    data.username=this.data.register.mobile
  

    this.authservice.verifyOtp(data).subscribe(res=>{
      if(res['status']==200){
        this.toster.success(res['message']);
      this.register()
      }

   
  
    },
    err=>{
    //  console.log(err)
   
   this.toster.error(err.message);
    }) 
  }

  register(){

    let data=this.data.register
    this.authservice.signup(data).subscribe(res=>{
      if(res['status']==200){
        this.toster.success(res['message']);
      }
      this.navigateRoute.navigate(['/signIn'])
   
  
    },
    err=>{
    //  console.log(err)
   
   this.toster.error(err.message);
    })

  }

}

