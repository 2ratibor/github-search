import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @HostBinding('class') hostClassName = 'd-flex flex-column flex-grow-1';

    constructor(private router: Router) {
        this.redirectToTargetPage();
    }

    redirectToTargetPage() {
        const gitHubPersonalAccessToken = JSON.parse(localStorage.getItem('gitHubPersonalAccessToken'));
        if (gitHubPersonalAccessToken === null) {
            this.router.navigate(['/token-page']);
        } else {
            this.router.navigate(['/search-page']);
        }
    }
}
