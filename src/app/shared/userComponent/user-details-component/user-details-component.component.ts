import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { AddMobileNumComponentComponent } from '../add-mobile-num-component/add-mobile-num-component.component';
import { UpdateStatusComponentComponent } from '../update-status-component/update-status-component.component';

@Component({
  selector: 'app-user-details-component',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.scss']
})
export class UserDetailsComponentComponent implements OnInit {

  @ViewChild(AddMobileNumComponentComponent, { static: false }) private addMobileNum: AddMobileNumComponentComponent;
  @ViewChild(UpdateStatusComponentComponent, { static: false }) private updateStatus: UpdateStatusComponentComponent;


  constructor() { }

  ngOnInit() {
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(tabChangeEvent) {
        this.addMobileNum.resetForm();
        this.addMobileNum.name = '';
        this.updateStatus.name = '';
    }
  }
                                                                                  
}
