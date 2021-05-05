import { FoodType } from "./foodtype";

export interface Food {
    id: number;
    name: string;
    rating: number;
    foodType:FoodType
    description: string;
    imageUrl: string;
       
}