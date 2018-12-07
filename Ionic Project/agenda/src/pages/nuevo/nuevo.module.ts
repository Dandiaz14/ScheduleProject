import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoPage } from './nuevo';

@NgModule({
  declarations: [
    NuevoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoPage),
  ],
})
export class NuevoPageModule {}
