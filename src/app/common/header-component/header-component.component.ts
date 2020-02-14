import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/services/home.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core/services/dataService.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  submitted: boolean;
  searchDrop: boolean;
  imeiNo: any;
  imeiList: any[] = [];
  showError: any;
  userData: any;
  profileImage: boolean=true;

  constructor(private navigateRoute: Router, private homeService: HomeService, private toster: ToastrService, private dataSer: DataService) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
  }

  displayLandinginfo: boolean = true;
  userInfo = sessionStorage.getItem('userData');

  ngOnInit() {
    if (this.userInfo) {
      this.displayLandinginfo = false
    }
      this.dataSer.profileImage.subscribe(res => {
      this.userData.profileImgPath = res;
    });
  }

  logout() {
    sessionStorage.clear();
    this.navigateRoute.navigate(['/signIn']);
  }

  showDetails(e) {
    if (e.length >= 15) {
      this.showError = '';
      let data = {
        "mobileInfo": {
          "imei1": e
        }
      }
      window.scroll(0, 0);
      this.submitted = true;
      this.homeService.searchdataByimei(data).subscribe(res => {
      this.submitted = false;
        if (res['status'] == 200) {
          this.toster.success(res['message']);
          this.searchDrop = true;
          this.imeiList = res['data']
        }
      }, err => {
        this.toster.error(err.message);
      });
    } else {
      this.showError = "Enter minimum length of IMEI is 15";
      this.imeiList = [];
      this.searchDrop = false;
    }
  }

  clearSearchInfo() {
    this.searchDrop = false;
    this.searchInput.nativeElement.value = '';
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  pictNotLoading(event){
    this.profileImage=false
  }

}
