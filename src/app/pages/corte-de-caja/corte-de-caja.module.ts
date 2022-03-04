import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorteDeCajaPageRoutingModule } from './corte-de-caja-routing.module';

import { CorteDeCajaPage } from './corte-de-caja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorteDeCajaPageRoutingModule
  ],
  declarations: [CorteDeCajaPage]
})
export class CorteDeCajaPageModule {}
