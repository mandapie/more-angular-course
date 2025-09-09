# Disclaimer
I'm writing down my understanding of the Angular history and what I think is important to know on a high level. Could be wrong on somethings, especially the older versions (< 14). I only learned a bit of Angular 16 from another course (+ Signals from v17). Now, I'm trying to create projects in v20, while trying to understand the difference from older Angular, specifically from v15+.

## History
### Angular 2
The first version of the Angular we know today. AngularJS (or Angular 1) is completely different from Angular 2+. Basically Angular 2 is a complete rewrite.

## Angular 4
Had significant changes to improve efficiency, but don't know the details of how it changed structurally (code wise).

### Angular 8
Angular Ivy? To improve render efficiency, but don't know if there is any structural changes.

### Angular 14
Introduced standalone Components, Directives, and Pipes, but we can still opt out of it when creating new applications.
  
### Angular 17
Made standalone default. Angular 16 introduced `signal`s, but it became stable in v17.

### Angular 20
1. Filenames are shorter. Eg: `app.component.ts` -> `app.ts`.
2. When you generate a component with the cli, `standalone` attribute doesn't show in the `@Component` decorator, because it's true by default. But you can still add it, it won't be a problem.
3. NgFor is deprecated. Use `@for` instead. Need to have a `track` keyword. See more [in-depth breakdown](https://blog.angular-university.io/angular-for/)

## Folder structure
I can't seem to find a standard Angular folder structure. I think this makes the most sense to me.
```
|_app
  |_components
    |_shared components
  |_models
  |_services
```

## Angular concepts? ecosystem?
#### Directives
- You can "enhance" elements with directives. Eg `<input ngModel/>` ngModel is directive provided by Angular that extracts changing inputs.
- Kinda like component, you can create your own directive, but it doesn't have a template. You'll need to import a directive like a component too.
- Components are directives with templates.
- There is Attribute directive, eg `ngModel`, and structural directive, eg `*ngIf`. Structural directives need the asterisk.
- Host directives... You can add an array of directives to the `hostDirectives` property inside of a decorator to use its functionality. See the LogDirective in Directives-DeepDive folder for example.
  
#### Services
- Even though components can handle logics, but they should be in Services.
- Be sure to use dependency injections for services, that way we're not instantiating different instances, but use the same service instance.
  - You can inject services with constructors or the inject() function.

#### Content projection with ng-content
- use ng-content to display child component content to the parent component?
- Simple eg if you want to have a uniform card style, instead of using a global css class, you can do the following:
  shared component (HTML side), not showing css side, but assume it has a style set.
  ```
  <app-card>
      <ng-content/>
  </app-card>
  ```
  child component(s) (HTML side)
  ```
  <app-card>
    <app-child>...content...</app-child>
  </app-card>
  ```
  
#### Pipes
- transforms values to a specific format. Eg a date Pipe. You'll need to import the module to use it.
- 

#### Two-way binding
- The syntax is `[(directive)]="property"`. Eg `<input [(ngModel)]="inputName"/>` offers 2 way binding for an input. It inputs/outputs value for the `inputName` property set in the component class.

#### Signals
 - Use `signal` to set the property values so that it Angular can act upon (via zone.js) the property when a change happens. Once you declare a signal, you call it like a function on the html side.
  Eg:
  HTML
  ```
  <span>{{name()}}</span>
  ```
  input signal example
  ```
  name = input.required<string>();
  ```
  or regular signal
  ```
  name = signal('your value');
  ```
- Use `effect()` to set up a subscription to listen to a change of a signal. Set up an `effect()` in the constructor() of a component.
  - to cleanup, use onCleanup hook which you can execute as part of your effect function to define what should happen before the effect code runs the next time:
  ```
  effect((onCleanup) => {
    const tasks = getTasks();
    const timer = setTimeout(() => {
      console.log(`Current number of tasks: ${tasks().length}`);
    }, 1000);
    onCleanup(() => {
      clearTimeout(timer);
    });
  });
  ```

#### Two-way binding with signals
- Don't know if it only applies to `ngModel` directive, but changing the properties into a signal type will not affect the template (HTML) side.
- ngModel requires the name attribute. eg `<input name="attributeName" [(ngModel)]="model.attributeName">`

#### Custom two-way binding
- We can create our own by using @Input() and @Output().
- Eg:
  Component side
  ```
  @Input({required:true}) size!: {width: string; height:string};
  @Output() sizeChange = new EventEmitter<{width: string; height: string}>(); // the `Change` suffix is how ANgular uses to detect custom binding

  // reset size function
  onReset() {
    this.sizeChange.emit({width:'200';height:'100'});
  }
  ```

  HTML side
  ```
  <div id="rect" [style.width]="size.width + 'px'" [style.height]="size.height + 'px'" (click)=onReset></div>
  ```

  Component that uses rect Component
  ```
  <app-rect [(size)]="rectSize" />
  ```

- Angular17.2+ has an easier way to set up 2way binding by importing `model` from @angular/core. This is part of signals.
  Component side
  ```
  size = model.required<{width: string; height: string}>();

  onReset() {
    this.size.set(...)
  }
  ```

#### Components
NOTE: You CAN MIX standalone and module based components, but it's probably not best practice, but helpful for migration.

Module-based components:
- You import your component(s) into the module class. You declare the imports differently when you import modules/components into another module.
- Every module needs to import `BrowserModule`.
- On v19+, standalone is default. You need to explicitly set standalone to false to get a module component.

Standalone components:
- The new default. You don't need to set standalone to true.
- You import components into another component directly. No module class needed.

#### Custom selectors
- You can extend built-in elements with custom components by changing the selector. You can even change the selector to be a attribute or class.
- Eg to use custom attribute:
  Component side
  ```
    @Component({selector: 'button[app-button]'})
  ```
  html side
  ```
  <button app-button></button>
  ```
- Reference: https://angular.dev/guide/components/selectors

#### style
- `encapsulation` eg:
  Component side, decorator
  ```
  @Component({
    selector: 'app-selector'
    ...
    encapsulation: ViewEncapsulation.None // <-- disable encapsulation so that css will render child component style that is projected through ng-content
  })
  ```
- `:host` css and host element. See https://angular.dev/guide/components/host-elements
- Dynamic inline styling eg:
  ```
  <div [class]="{
   classname: bool,
   'class-name': bool 
  }"></div>
  ```

#### component life cycles
See https://angular.dev/guide/components/lifecycle

#### template variables
- Add `#` to an element attribute, then you can pass in the element as an argument.
- Eg `<input #title/>`, then you have a button or form to trigger a function `onClick(title)`. The input will be passed into the onClick function as a type of, in this case, an HTMLInputElement, because our template is on an input element. On the component side, you can console.log or console.dir to view the element.
- console.log will output the HTML form, console.dir will output it as an object.
- See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement for HTML properties
- If you put the template variable on a component element, it will grab the component instance instead.
- Use `@ViewChild` to grab the element. This way you don't have to pass the template through a function.
- Eg:
  HTML side
  ```
  <form #form>....</form>
  ```
  Component side
  ```
  @ViewChild('form') formVariable?: ElementRef<HTMLFormElement>; // need to import ElementRef

  yourFunction() {
    this.form?.nativeElement.reset(); // do work here. Resetting form values as an example
  }
  ```
- `@ViewChildren` is to grab multiple ViewChild items.
- `viewChild()` is the function version of the decorator. Kinda like `input()`, it is introduced in v17. It's a signal feature. Eg `private formVariable = viewChild<ElementRef<HTMLFormElement>>('form')`
- `@ContentChild` is used for elements that will be projected into an <ng-content> element
