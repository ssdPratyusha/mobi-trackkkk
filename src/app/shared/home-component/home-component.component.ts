import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {
  getInTouchGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getInTouchGroup = this.formBuilder.group({
        name: ['',],
        email: [''],
        phone: ['']
    });

  }

  onSubmit() {
    alert('Its not yet ready');
  }

}
