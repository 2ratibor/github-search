import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchPageComponent } from './search-page.component';


describe('SearchFormComponent', () => {
    let component: SearchPageComponent;
    let fixture: ComponentFixture<SearchPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [SearchPageComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
