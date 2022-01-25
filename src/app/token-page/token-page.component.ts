import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-token-page',
    templateUrl: './token-page.component.html',
    styleUrls: ['./token-page.component.scss']
})
export class TokenPageComponent implements OnInit {
    @HostBinding('class') hostClassName = 'd-flex flex-column flex-grow-1';

    public tokenForm: FormGroup;

    constructor(private router: Router) {}

    ngOnInit() {
        this.tokenForm = new FormGroup({
            gitHubAccessToken: new FormControl('', [Validators.required])
        });
    }

    onClickNextButton() {
        this.tokenForm.get('gitHubAccessToken').markAsTouched();
        if (this.tokenForm.valid) {
            this.saveTokenToLocalStorage();
            this.navigateToNextPage();
        }
    }

    saveTokenToLocalStorage() {
        localStorage.setItem('gitHubPersonalAccessToken', JSON.stringify(this.tokenForm.get('gitHubAccessToken').value));
    }

    navigateToNextPage() {
        this.router.navigate(['/search-page']);
    }
}
