import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Food } from './food';
import { FoodService } from './food.service';
import { Item } from './item';
import { Ratings } from './ratings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public foods: Food[];
  public editFood: Food;
  public addToCartFood: Food;
  public partialAmount:number;
  public quantity:number;
  public item:Item;
  public cart = new Map();
  public ratingInterface: Ratings;
  title = "star-angular";
  stars = [1, 2, 3, 4, 5];
  public rating = 2;
  hoverState = 0;

  
 
  constructor(private foodService: FoodService) {
   
  }

  enter(i) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i) {
    this.rating = i;
    console.log(this.rating)
  }


  ngOnInit() {
    this.getAllFoods();
  }

  public getAllFoods(): void {
    this.foodService.getAllFoods().subscribe(
      (response: Food[]) => {
        this.foods = response;
        console.log(this.foods);
        console.log(this.foods[1]);
        this.editFood = this.foods[1]
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFood(key: string): void {
    console.log(key);
    const results: Food[] = [];
    for (const food of this.foods) {
      if (food.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || food.foodType.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || food.description.toLowerCase().indexOf(key.toLowerCase()) !== -1)
       {
        results.push(food);
      }
    }
    this.foods = results;
    // if (results.length === 0 || !key) {
    //   this.getEmployees();
    // }
    if (key.length=== 0) {
       this.getAllFoods();
    }
  }


  public onOpenModal(food: Food, mode: string, ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.addToCartFood = food;
      this.rating=food.rating;
       if (this.cart.has(food.id)){
         this.quantity = this.cart.get(food.id);
       }
       else{
       this.quantity = 0;
       }
       this.partialAmount=0;
      button.setAttribute('data-target', '#addToCartModal');
    }
    if (mode === 'addRatio') {
      this.addToCartFood = food;
      this.rating=food.rating;
      button.setAttribute('data-target', '#addRatingModal');
    }

    container.appendChild(button);
    button.click();
  }

  public calculatePartialAmount(key: number, price:number): void {
    console.log(key);
    const partialAmount = key*price; 
    this.partialAmount=partialAmount;
    console.log(this.partialAmount);
  }

  
  public onAddToCart(item: Item): void{  
    console.log("ITEM   "+ item);
    
    this.cart.set(item.id, item.quantity);
    

    console.log(this.cart);
    
   
  }

  public onAddRating(foodId: number): void{  
    console.log(foodId);
    console.log("rating is: " + this.rating);
    console.log("FOOD ADD  "+ this.addToCartFood.id);
    //console.log("rating  ''''"+this.ratingInterface);
    this.ratingInterface= {food: this.addToCartFood,
      rating: this.rating,
    id:null}
    this.foodService.addRating(this.ratingInterface).subscribe(
       (response: Ratings) => {
         console.log("rating added:  "+ response);
         this.getAllFoods();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );

   
   
  }




  // public onAddToCart(addToCartForm: NgForm): void{  
  //   document.getElementById('perreito').click();
  //   console.log("kk");
  //   console.log(addToCartForm.value);
  //   this.item=addToCartForm.value;
  //   this.cart.set(this.item.id, this.item.quantity);
  //   addToCartForm.reset();

  


  //   console.log(this.cart);
    
  //   // console.log(food);
  //   // console.log(pAmount)
  // }

}
