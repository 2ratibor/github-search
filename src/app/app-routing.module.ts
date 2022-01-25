import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TokenPageComponent } from './token-page/token-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchPageGuard } from './guards/search-page.guard';


const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'token-page',
                component: TokenPageComponent
            },
            {
                path: 'search-page',
                component: SearchPageComponent,
                canActivate: [SearchPageGuard]
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
