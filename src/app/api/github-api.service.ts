import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DateParseLogic } from '../utils/date-parse-logic';


interface RepositoryData {
    name: string;
    description: string;
    url: string;
    updatedAt: string;
    owner: {
        login: string;
        avatarUrl: string;
    };
    stargazerCount: number;
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

export interface MappedRepositoryData {
    name: string;
    description: string;
    url: string;
    updatedAt: string;
    authorName: string;
    authorPhotoUrl: string;
    countOfStars: number;
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
                            stargazerCount
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
                    if (resp
                        && resp.data
                        && resp.data.user
                        && resp.data.user.repositories
                        && Array.isArray(resp.data.user.repositories.nodes)
                    ) {
                        return resp.data.user.repositories.nodes.map((repository: RepositoryData) => {
                            return {
                                name: repository.name,
                                description: repository.description,
                                url: repository.url,
                                updatedAt: DateParseLogic.parseToFullDate(repository.updatedAt),
                                authorName: repository.owner.login,
                                authorPhotoUrl: repository.owner.avatarUrl,
                                countOfStars: repository.stargazerCount
                            } as MappedRepositoryData;
                        });
                    } else {
                        return [];
                    }
                }),
                catchError(() => {
                    return of([]);
                })
            );
    }
}
