import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UpdateDetailsComponent } from '../update-details/update-details.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})
export class DashboardComponentComponent implements OnInit {

  headerColumns = ['IMEI1', 'IMEI2', 'Nick Name', 'Mobile Model', 'Mobile Type', 'Document', 'Status'];
  userData: any;
  registerId: number;
  userDetails : any;
  // = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<UpdateDetailsComponent>;
  mobileDetails: any;
  profileImage:boolean = true;
  status: any;
  profilePath: any;

  constructor(private homeService: HomeService, public dialog: MatDialog, private toaster: ToastrService) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.registerId = this.userData.userId;
  }

  ngOnInit() {
    this.getAllRegMobDetails();
  }

  getAllRegMobDetails() {
    const data = {
      "register_id" : this.registerId
    }
    this.homeService.getAllRegisteredMobiles(data).subscribe(res => {
      this.userDetails = res['data'];
    });
  }

  updateUser(user) {
    if(user.status === 'sold' || user.status === 'Sold') {
      this.toaster.warning('This mobile already sold, you can not edit the details.')
    } else {
        this.mobileDetails = JSON.stringify(user);
        this.dialogRef = this.dialog.open(UpdateDetailsComponent, {
        data: this.mobileDetails,
        panelClass: 'full-width-dialog'
      });
    }
  }

  pictNotLoading(event){
    this.profileImage = false
  }


}
