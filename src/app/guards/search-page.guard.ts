import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class SearchPageGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const gitHubPersonalAccessToken = JSON.parse(localStorage.getItem('gitHubPersonalAccessToken'));
        if (gitHubPersonalAccessToken === null) {
            this.router.navigate(['/token-page']);
        }
        return gitHubPersonalAccessToken !== null;
    }
}
