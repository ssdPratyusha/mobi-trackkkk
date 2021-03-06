import { Component, AfterViewInit } from '@angular/core';
import { 
    Router, NavigationStart, NavigationCancel, NavigationEnd 
} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mobitrak2';

  loading;
  constructor(
    private router: Router
) {
    this.loading = true;
}

  //each routing window will be scroll to top
  onActivate(event) {
    window.scroll(0, 0);
  }
  ngAfterViewInit() {
    this.router.events
        .subscribe((event) => {
            if(event instanceof NavigationStart) {
                this.loading = true;
            }
            else if (
                event instanceof NavigationEnd || 
                event instanceof NavigationCancel
                ) {
                this.loading = false;
            }
        });
}
}
