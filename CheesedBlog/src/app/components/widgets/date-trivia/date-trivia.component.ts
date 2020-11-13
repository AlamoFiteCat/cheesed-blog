import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-date-trivia',
  templateUrl: './date-trivia.component.html',
  styleUrls: ['./date-trivia.component.scss'],
})
export class DateTriviaComponent implements OnInit, OnDestroy {
  constructor(private widgetService: WidgetService) {}

  triviaText: string;
  triviaSubscription: Subscription;

  ngOnInit(): void {
    this.triviaSubscription = this.widgetService.dateTriviaSubject.subscribe(
      (trivia) => {
        this.triviaText = trivia;
      }
    );
    this.widgetService.fetchDateTrivia();
  }

  ngOnDestroy() {
    this.triviaSubscription.unsubscribe();
  }

  onGetDateTrivia() {
    this.widgetService.fetchDateTrivia();
  }
}
