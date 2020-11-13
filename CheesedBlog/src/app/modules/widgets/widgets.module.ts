import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WeatherCardComponent } from '../../components/widgets/weather-card/weather-card.component';
import { DateTriviaComponent } from '../../components/widgets/date-trivia/date-trivia.component';
import { TweetsComponent } from '../../components/widgets/tweets/tweets.component';

@NgModule({
  declarations: [WeatherCardComponent, DateTriviaComponent, TweetsComponent],
  imports: [CommonModule, SharedModule],
  exports: [WeatherCardComponent, DateTriviaComponent, TweetsComponent],
})
export class WidgetsModule {}
