import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


interface RepositoryData {
    name: string;
    description: string;
    url: string;
    updatedAt: string;
    owner: {
        login: string;
        avatarUrl: string;
    };
}

interface ResponseScheme {
    user: {
        repositories: {
            nodes: RepositoryData[];
        }
    };
}

interface ApolloResponseData {
    data: ResponseScheme;
    loading: boolean;
    networkStatus: number;
}

@Injectable({
    providedIn: 'root'
})
export class GithubApiService {

    constructor(private apollo: Apollo) { }

    getRepositoriesDataByUsername(userName: string): Observable<any> {
        const GET_REPOSITORIES_DATA = gql`
            {
                user(login: "${userName}") {
                    repositories(first: 100) {
                        nodes {
                            name
                            description
                            url
                            owner {
                                avatarUrl
                                login
                            }
                            updatedAt
                        }
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery({
                query: GET_REPOSITORIES_DATA
            })
            .valueChanges
            .pipe(
                map((resp: ApolloResponseData) => {
                    return resp;
                }),
                catchError(() => {
                    return of([]);
                })
            );
    }
}
