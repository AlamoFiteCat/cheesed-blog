import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/interfaces/tweet';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
})
export class TweetsComponent implements OnInit {
  constructor() {}

  @Input() tweets: Tweet[];

  ngOnInit(): void {}
}
