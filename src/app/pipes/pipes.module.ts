import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesTypePipe } from './services-type.pipe';



@NgModule({
  declarations: [ServicesTypePipe],
  imports: [CommonModule],
  exports: [ServicesTypePipe]
})
export class PipesModule { }
