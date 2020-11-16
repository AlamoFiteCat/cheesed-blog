import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WeatherCardComponent } from '../../components/widgets/weather-card/weather-card.component';
import { TweetsComponent } from '../../components/widgets/tweets/tweets.component';

@NgModule({
  declarations: [WeatherCardComponent, TweetsComponent],
  imports: [CommonModule, SharedModule],
  exports: [WeatherCardComponent, TweetsComponent],
})
export class WidgetsModule {}
