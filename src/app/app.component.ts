import { Component, ViewEncapsulation } from '@angular/core';
import './vuejs-component/vuejscomp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ng-vue-poc';
  msg: string = '';

  openUrl($event: any) {
    const [url] = $event.detail;
    window.open(url, '_blank');
  }
}
