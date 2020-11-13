// [Modules]
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// [Components]
import { PostsComponent } from '../../components/posts-feature/posts/posts.component';
import { SinglePostComponent } from '../../components/posts-feature/single-post/single-post.component';
import { PostWriteComponent } from '../../components/posts-feature/post-write/post-write.component';

// [Guards]
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'write', component: PostWriteComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SinglePostComponent },
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
export class PostsRoutingModule {}
