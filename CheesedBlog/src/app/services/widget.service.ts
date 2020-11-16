import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { WeatherData } from '../interfaces/weather-data';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  constructor(private http: HttpClient) {}

  weatherDataSubject = new Subject<WeatherData>();
  dateTriviaSubject = new Subject<string>();

  fetchWeatherData() {
    this.http
      .get(`${environment.apiUrl}/widgets/weather/`, { withCredentials: true })
      .subscribe(
        (response: WeatherData) => {
          this.weatherDataSubject.next(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
