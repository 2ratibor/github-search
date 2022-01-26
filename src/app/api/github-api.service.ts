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

interface ResponseSchemeEdge {
    node: RepositoryData;
}

interface ResponseScheme {
    search: {
        edges: ResponseSchemeEdge[];
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

    getRepositoriesDataByRepoName(repositoryName: string): Observable<MappedRepositoryData[]> {
        const GET_REPOSITORIES_DATA = gql`
            {
                search(query: "${repositoryName}", type: REPOSITORY, first: 100) {
                    edges {
                        node {
                            ... on Repository {
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
                        && resp.data.search
                        && Array.isArray(resp.data.search.edges)
                    ) {
                        return resp.data.search.edges.map((responseSchemeEdge: ResponseSchemeEdge) => {
                            return {
                                name: responseSchemeEdge.node.name,
                                description: responseSchemeEdge.node.description,
                                url: responseSchemeEdge.node.url,
                                updatedAt: DateParseLogic.parseToFullDate(responseSchemeEdge.node.updatedAt),
                                authorName: responseSchemeEdge.node.owner.login,
                                authorPhotoUrl: responseSchemeEdge.node.owner.avatarUrl,
                                countOfStars: responseSchemeEdge.node.stargazerCount
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
