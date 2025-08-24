# Disclaimer
I'm writing down things I learned about TypeScript while learning Angular.

## Learnings
1. Getter functions:
   - It is treated like a property.
     ```
     get imagePath() {
         return `/assets/images/users/${this.avatar}`;
     }
     ```
   - On the html side, you'd use it like so `<img [src]="imagePath">`.

2. `!` and `?` signs:
   - `!` sign informs TypeTypeScript that we use initialize this property.
   - `?` indicates the property can be undefined.
   
3. interface vs type
   - Different syntax to initialize a structured class, if you will.
   - I create interfaces for a class or model and types to define a dictionary, tuple, etc.

4. 
