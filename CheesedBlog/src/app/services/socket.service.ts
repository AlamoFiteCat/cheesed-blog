import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Tweet } from '../interfaces/tweet';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket;
  tweetArray: Tweet[];
  tweetArraySubject = new Subject<Tweet[]>();
  constructor() {}

  setupSocketConnection() {
    // [Twitter]
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('tweet', (tweet: any) => {
      const tweetbody: Tweet = {
        text: tweet.tweet.text,
        userScreenName: '@' + tweet.tweet.user.screen_name,
        userImage: tweet.tweet.user.profile_image_url_https,
        userDescription: tweet.tweet.user.description,
      };
      try {
        if (tweet.tweet.entities.media[0].media_url_https) {
          tweetbody['image'] = tweet.tweet.entities.media[0].media_url_https;
        }
      } catch (err) {}
      this.tweetArray.unshift(tweetbody);
      if (this.tweetArray.length > 5) {
        this.tweetArray.pop();
      }
      this.tweetArraySubject.next(this.tweetArray);
    });

    this.socket.on('allTweet', (tweet: any) => {
      this.tweetArray = tweet;
      this.tweetArraySubject.next(this.tweetArray);
    });
  }
}
