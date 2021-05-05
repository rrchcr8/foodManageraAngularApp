import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Food } from './food';
import { FoodService } from './food.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public foods: Food[];
 
  constructor(private foodService: FoodService) {
   
  }

  ngOnInit() {
    this.getAllFoods();
  }

  public getAllFoods(): void {
    this.foodService.getAllFoods().subscribe(
      (response: Food[]) => {
        this.foods = response;
        console.log(this.foods);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
