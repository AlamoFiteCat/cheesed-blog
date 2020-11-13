// [Modules]
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';

// [Custom]
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-post-write',
  templateUrl: './post-write.component.html',
  styleUrls: ['./post-write.component.scss'],
})
export class PostWriteComponent implements OnInit {
  postWriteForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    tags: new FormControl(null, [Validators.required]),
    postText: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onSubmitPost() {
    const tagsArray: string[] = this.postWriteForm.value['tags'].split(',');
    const newPost: Post = {
      title: this.postWriteForm.value['title'],
      text: this.postWriteForm.value['postText'],
      tags: tagsArray,
    };
    this.postsService.createPost(newPost);
  }
}
