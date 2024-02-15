import { Component } from '@angular/core';
import { LoadingService } from './services/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'supermaintenance-ui';

  constructor(public loadingService: LoadingService) { }
}
