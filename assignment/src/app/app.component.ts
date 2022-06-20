import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoffeeService } from './coffee.service';
import { Coffee } from './models/coffee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment';

  subscriptions = new Subscription();
  randomCoffeeListForm!: FormGroup;
  coffeeListForm!: FormArray;
  coffeeList!: Array<Coffee>;

  constructor(private coffeeService: CoffeeService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCoffeeData();
  }

  initForm() {
    this.randomCoffeeListForm = this.fb.group({
      coffeeList: this.fb.array([])
    });
    this.coffeeListForm = this.randomCoffeeListForm.get('coffeeList') as FormArray;
  }

  loadCoffeeData() {
    this.subscriptions.add(this.coffeeService.getCoffeeDetails().subscribe(apiResponse => {
      this.coffeeList = apiResponse;
      console.log('coffeeList', this.coffeeList);
      if (this.coffeeList) {
        for (const coffee of this.coffeeList) {
          // console.log(coffee);
          const coffeeForm = this.createCoffeeForm(coffee)
          if(this.coffeeListForm){
            this.coffeeListForm.push(coffeeForm);
            console.log(this.coffeeListForm , 'this.coffeeListForm');
          }
         
          
        }

      }

    }))
  }
  createCoffeeForm(coffee: Coffee) {
    // console.log(coffee);
    const coffeeForm = this.fb.group({
      id!: [coffee.id],
      uid!: [coffee.uid],
      blend_name!: [coffee.blend_name],
      intensifier!: [coffee.intensifier],
      notes!: [coffee.notes],
      origin!: [coffee.origin],
      variety!: [coffee.variety]
      
    })
    
    return coffeeForm;
  }
}
