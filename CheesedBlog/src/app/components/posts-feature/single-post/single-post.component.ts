import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../../interfaces/post';
import { QuillEditorComponent } from 'ngx-quill';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit, AfterViewInit {
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;

  postEditForm = new FormGroup({
    title: new FormControl(this.data.title, [
      Validators.required,
      Validators.minLength(8),
    ]),
    tags: new FormControl(this.data.tags.join(','), [Validators.required]),
    postText: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private postsService: PostsService,
    public dialogRef: MatDialogRef<SinglePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.editor.content = this.data.text;
  }

  onUpdatePost() {
    this.postsService.updatePost({
      id: this.data.id,
      author: this.data.author,
      title: this.postEditForm.value['title'],
      tags: this.postEditForm.value['tags'],
      text: this.postEditForm.value['postText'],
    });

    this.dialogRef.close();
  }
}
