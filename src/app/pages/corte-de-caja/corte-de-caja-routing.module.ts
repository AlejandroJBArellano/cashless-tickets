import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorteDeCajaPage } from './corte-de-caja.page';

const routes: Routes = [
  {
    path: '',
    component: CorteDeCajaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorteDeCajaPageRoutingModule {}
