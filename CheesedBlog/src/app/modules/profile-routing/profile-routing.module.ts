import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../../components/profile/profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  {
    path: '**',
    redirectTo: 'posts',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}