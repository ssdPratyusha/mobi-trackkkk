import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components lists
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponentComponent } from '../app/common/header-component/header-component.component';
import { FooterComponentComponent } from '../app/common/footer-component/footer-component.component';
//angular material Module
import { MaterialModule } from './material-module';
//common 
import { HomeComponentComponent } from './shared/home-component/home-component.component';
//login forms
import { SignUpComponentComponent, DialogContentExampleDialog, MobileDialogContentExampleDialog } from './common/forms/sign-up-component/sign-up-component.component';
import { ForgotPasswordComponentComponent, ForgotOtpDialogContenteDialog } from './common/forms/forgot-password-component/forgot-password-component.component';
import { ResetPasswordComponentComponent } from './common/forms/reset-password-component/reset-password-component.component';
//user profile
import { UserDetailsComponentComponent } from './shared/userComponent/user-details-component/user-details-component.component';
import { DashboardComponentComponent } from './shared/userComponent/dashboard-component/dashboard-component.component';
import { AddMobileNumComponentComponent } from './shared/userComponent/add-mobile-num-component/add-mobile-num-component.component';
import { UpdateStatusComponentComponent } from './shared/userComponent/update-status-component/update-status-component.component';
import { UpdateDetailsComponent } from './shared/userComponent/update-details/update-details.component';

// Authguard check
import { AuthService } from './core/services/auth.service';
import { HomeService } from './core/services/home.service';
import { HttpclientService } from './core/services/httpclient.service';
import { HttpUrlService } from './core/services/httpurl.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './core/interceptors/interceptor';
import { SignInComponent } from './common/forms/sign-in/sign-in.component';
import {DatePipe} from '@angular/common';

//extenal plugins
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EditProfileComponent } from './common/edit-profile/edit-profile.component';
import { DataService } from './core/services/dataService.service';
import { ChangePasswordComponent } from './common/forms/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    HomeComponentComponent,
  
    SignUpComponentComponent,
    ForgotPasswordComponentComponent,
    ResetPasswordComponentComponent,
    UserDetailsComponentComponent,
    DashboardComponentComponent,
    AddMobileNumComponentComponent,
    UpdateStatusComponentComponent,
    SignInComponent,
    UpdateDetailsComponent,
    EditProfileComponent,

    DialogContentExampleDialog,
    MobileDialogContentExampleDialog,
    ForgotOtpDialogContenteDialog,
    ChangePasswordComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  entryComponents: [ 
    UpdateDetailsComponent, 
    DialogContentExampleDialog, 
    MobileDialogContentExampleDialog,
    ForgotOtpDialogContenteDialog
  ],
  providers: [ 
    AuthService, 
    HomeService, 
    DataService,
    HttpclientService, 
    HttpUrlService,
    DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
