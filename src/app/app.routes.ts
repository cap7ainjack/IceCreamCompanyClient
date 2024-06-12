import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowsComponent } from './workflows/workflows.component';

export const routes: Routes = [
  { path: 'workflows', component: WorkflowsComponent },
  { path: '', redirectTo: '/workflows', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }