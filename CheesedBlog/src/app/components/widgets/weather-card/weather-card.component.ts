import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';

import { WeatherData } from '../../../interfaces/weather-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  constructor(private widgetService: WidgetService) {}

  data: WeatherData = {
    icon: 'http://openweathermap.org/img/wn/10d@2x.png',
    name: 'City',
    obtainedOn: new Date(),
    description: 'description',
    temperature: 0,
    pressure: 0,
    humidity: 0,
  };

  weatherSubscription: Subscription;

  ngOnInit(): void {
    this.weatherSubscription = this.widgetService.weatherDataSubject.subscribe(
      (weatherData) => {
        this.data = weatherData;
      }
    );
  }

  getWeatherData() {
    this.widgetService.fetchWeatherData();
  }
}
