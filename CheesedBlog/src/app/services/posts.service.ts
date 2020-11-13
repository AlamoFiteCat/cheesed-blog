import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

// [Custom]
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/post';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  postsChanged = new Subject<Post[]>();

  getAllPosts() {
    this.http
      .get(`${environment.apiUrl}/posts`, { withCredentials: true })
      .subscribe(
        (posts: Post[]) => {
          this.postsChanged.next(posts);
        },
        (error) => {
          this.toastr.error(
            error.error.message ||
              `Couldn't fetch any posts! Please try again a bit later!`,
            'Error!'
          );
        }
      );
  }

  createPost(postData: Post) {
    this.http
      .post(`${environment.apiUrl}/posts`, postData, { withCredentials: true })
      .subscribe(
        (response: ApiResponse) => {
          this.router.navigate(['posts']);
          this.getAllPosts();
          this.toastr.success(response.message, 'Success!');
        },
        (error) => {
          this.toastr.error(
            error.error.message || 'Could not create post. Try again later!',
            'Error!'
          );
        }
      );
  }

  updatePost(postData: Post) {
    this.http
      .put(
        `${environment.apiUrl}/posts/${postData.id}`,
        { data: postData },
        { withCredentials: true }
      )
      .subscribe(
        (response: ApiResponse) => {
          this.getAllPosts();
          this.toastr.success(response.message, 'Success!');
        },
        (error) => {
          this.toastr.error(
            error.error.message || 'Could not update post. Try again later!',
            'Error!'
          );
        }
      );
  }

  deletePost(postId: string) {
    this.http
      .delete(`${environment.apiUrl}/posts/${postId}`, {
        withCredentials: true,
      })
      .subscribe(
        (response: ApiResponse) => {
          this.getAllPosts();
          this.toastr.success(response.message, 'Success!');
        },
        (error) => {
          this.toastr.error(
            error.error.message || 'Could not delete post. Try again later!',
            'Error!'
          );
        }
      );
  }
}
