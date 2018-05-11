import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuriosityPage } from './curiosity';

@NgModule({
  declarations: [
    CuriosityPage,
  ],
  imports: [
    IonicPageModule.forChild(CuriosityPage),
  ],
})
export class CuriosityPageModule {}
