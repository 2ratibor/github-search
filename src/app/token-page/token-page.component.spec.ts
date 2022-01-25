import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenPageComponent } from './token-page.component';


describe('TokenPageComponent', () => {
    let component: TokenPageComponent;
    let fixture: ComponentFixture<TokenPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TokenPageComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
