import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.scss']
})
export class FooterComponentComponent implements OnInit {

  constructor(private navigateRoute:Router) { }

  ngOnInit() {
  }
  gotoPage(url){
    sessionStorage.clear();
    this.navigateRoute.navigate([url]);

  }

}
