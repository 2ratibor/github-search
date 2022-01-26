import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { GithubApiService, MappedRepositoryData } from '../api/github-api.service';


@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
    @HostBinding('class') hostClassName = 'd-flex flex-column flex-grow-1';

    private gitHubAccessToken: string;
    public searchForm: FormGroup;
    public repositoriesList: MappedRepositoryData[];
    private unsubscriber$ = new Subject<void>();

    constructor(
        private router: Router,
        private githubApiService: GithubApiService
    ) {}

    ngOnInit() {
        this.getGitHubAccessToken();

        this.searchForm = new FormGroup({
            githubUserName: new FormControl('')
        });

        this.searchForm.get('githubUserName').valueChanges
            .pipe(
                debounceTime(500),
                takeUntil(this.unsubscriber$)
            )
            .subscribe((userName: string) => {
                this.githubApiService.getRepositoriesDataByUsername(userName)
                    .pipe(
                        take(1),
                        takeUntil(this.unsubscriber$)
                    )
                    .subscribe((repositories: MappedRepositoryData[]) => {
                        this.repositoriesList = repositories;
                    });
            });
    }

    getGitHubAccessToken() {
        this.gitHubAccessToken = JSON.parse(localStorage.getItem('gitHubPersonalAccessToken'));
    }

    onClickBackButton() {
        this.removeTokenFromLocalStorage();
        this.navigateToPrevPage();
    }

    removeTokenFromLocalStorage() {
        localStorage.removeItem('gitHubPersonalAccessToken');
    }

    navigateToPrevPage() {
        this.router.navigate(['/token-page']);
    }

    ngOnDestroy() {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }
}
