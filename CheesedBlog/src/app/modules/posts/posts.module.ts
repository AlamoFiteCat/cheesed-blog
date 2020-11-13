import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from '../posts-routing/posts-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { QuillModule } from 'ngx-quill';

import { PostsComponent } from '../../components/posts-feature/posts/posts.component';
import { SinglePostComponent } from '../../components/posts-feature/single-post/single-post.component';
import { PostWriteComponent } from '../../components/posts-feature/post-write/post-write.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostsComponent, SinglePostComponent, PostWriteComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    WidgetsModule,
    QuillModule.forRoot(),
  ],
})
export class PostsModule {}
