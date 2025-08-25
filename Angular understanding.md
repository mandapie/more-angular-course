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
3. NgFor is deprecated. Use `@for` instead. Need to have a `track` keyword.

## Folder structure
I can't seem to find a standard Angular folder structure. I think this makes the most sense to me.
```
|_app
  |_components
    |_shared components
  |_models
  |_services
```

## Angular concepts? topics? ecosystem?
#### Directives
- You can "enhance" elements with directives. Eg `<input ngModel/>` ngModel is directive provided by Angular that extracts changing inputs.
- Kinda like component, you can create your own directive, but it doesn't have a template. You'll need to import a directive like a component too.
- Components are directives with templates.
- 
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

#### two-way binding
- The syntax is `[(directive)]="property"`. Eg `<input [(ngModel)]="inputName"/>` offers 2 way binding for an input. It inputs/outputs value for the `inputName` property set in the component class.

#### Signals
Use `signal` to set the property values so that it Angular can act upon (via zone.js) the property when a change happens. Once you declare a signal, you call it like a function on the html side.
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

#### two way binding with signals
- Don't know if it only applies to `ngModel` directive, but changing the properties into a signal type will not affect the template (HTML) side.
- ngModel requires the name attribute. eg `<input name="attributeName" [(ngModel)]="model.attributeName">`

#### Components
NOTE: You CAN MIX standalone and module based components, but it's probably not best practice, but helpful for migration.

Module-based components:
- You import your component(s) into the module class. You declare the imports differently when you import modules/components into another module.
- Every module needs to import `BrowserModule`.
- On v19+, standalone is default. You need to explicitly set standalone to false to get a module component.

Standalone components:
- The new default. You don't need to set standalone to true.
- You import components into another component directly. No module class needed.
