import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Food } from './food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiServerUrl}/food/all`);
  }
  
  public getFood( foodId: number): Observable<Food>{
    return this.http.get<Food>(`${this.apiServerUrl}/food/find/${foodId}`);
  }


}
