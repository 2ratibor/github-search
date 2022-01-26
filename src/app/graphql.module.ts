import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://api.github.com/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink) {
    const basic = setContext((operation, context) => ({
        headers: {
            Accept: 'charset=utf-8'
        }
    }));

    const auth = setContext((operation, context) => {
        const gitHubPersonalAccessToken = JSON.parse(localStorage.getItem('gitHubPersonalAccessToken'));

        if (gitHubPersonalAccessToken === null) {
            return {};
        } else {
            return {
                headers: {
                    Authorization: `Bearer ${gitHubPersonalAccessToken}`
                }
            };
        }
    });

    return {
        link: ApolloLink.from([basic, auth, httpLink.create({ uri })]),
        cache: new InMemoryCache()
    };
}

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule { }
