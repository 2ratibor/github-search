import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


const MATERIAL_MODULES = [
    MatInputModule,
    MatButtonModule,
    MatIconModule
];

@NgModule({
    imports: [...MATERIAL_MODULES],
    exports: [...MATERIAL_MODULES]
})
export class MaterialModule { }
