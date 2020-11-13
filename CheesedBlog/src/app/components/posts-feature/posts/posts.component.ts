import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CurrentUser } from '../../../interfaces/current-user';
import { Post } from '../../../interfaces/post';
import { AuthService } from '../../../services/auth.service';
import { PostsService } from '../../../services/posts.service';
import { SocketService } from '../../../services/socket.service';
import { SinglePostComponent } from '../single-post/single-post.component';
import { Tweet } from '../../../interfaces/tweet';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private socketService: SocketService,
    public dialog: MatDialog
  ) {}

  currentPosts: Post[];
  currentUser: CurrentUser;
  userSubscription: Subscription;
  postsSubscription: Subscription;
  tweetSubscription: Subscription;
  tweetArray: Tweet[];

  ngOnInit(): void {
    this.postsSubscription = this.postsService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.currentPosts = posts;
      }
    );

    this.userSubscription = this.authService.currentUser.subscribe(
      (user: CurrentUser) => {
        this.currentUser = user;
      }
    );

    this.tweetSubscription = this.socketService.tweetArraySubject.subscribe(
      (tweets: Tweet[]) => {
        this.tweetArray = tweets;
      }
    );

    this.authService.fetchCurrentUser();
    this.postsService.getAllPosts();
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.tweetSubscription.unsubscribe();
  }

  onPostDelete(id: string) {
    const response = confirm(
      'Are you should you would like to delete this post?'
    );
    if (response) {
      this.postsService.deletePost(id);
    }
  }

  onPostEditDialogOpen(post: Post) {
    this.dialog.open(SinglePostComponent, {
      width: '450px',
      data: post,
    });
  }
}
