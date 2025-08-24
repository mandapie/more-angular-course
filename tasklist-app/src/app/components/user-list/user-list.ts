import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { Card } from '../shared/card/card';

@Component({
  selector: 'app-user',
  imports: [Card],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  // @Input() decorator to allow this property to be treated like an html attribute
  // eg: <app-user [name]='users[0].name'></app-user>
  // notice the ! sign to inform TypeTypeScript that we use initialize this property later
  // we use 'required' in the @Input() declaration to help enforce the property to have a value
  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean;

  // @Output() decorators allows us to emit custom values to any parent component interested
  // On the HTML side, you treat it like an action attribute.
  // Eg: `(select)="yourFunction()"`
  @Output() select = new EventEmitter<string>();

  // Getter function, but it is treated like a property.
  // On the html side, you'd use it like so <img [src]="imagePath">
  // Left this commented to showcase getter function. If signal is not used.
  get imagePath() {
    return `/assets/images/users/${this.user.avatar}`;
  }

  // regular function
  onSelectUser() {
    this.select.emit(this.user.id);
  }
}

// //// Using Signals
// import { Component, input, computed, output } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   imports: [],
//   templateUrl: './user.html',
//   styleUrl: './user.css'
// })
// export class User {
//   // input signal type
//   // these are readonly signals. The values are set from the html
//   id = input.required<string>();
//   avatar = input.required<string>();
//   name = input.required<string>();

//   // output is not a signal. It's an EventEmiiter type
//   select = output<string>();

//   imagePath = computed(() => {
//     return `/assets/images/users/${this.avatar()}`;
//   });

//   // regular function
//   onSelectUser() {
//     this.select.emit(this.id());
//   }
// }
