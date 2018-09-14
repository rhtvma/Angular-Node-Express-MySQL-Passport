

# Useful Commands
cd public

ng g module /pages --routing

ng g component /pages


# Install Bootstrap and FontAwesome

use npm to install the dependencies:

npm install bootstrap font-awesome --save

dependencies are installed we can tell Angular CLI that it needs to load these styles

One easy way to do this is by opening the file src/styles.css and adding the following lines:

@import "~bootstrap/dist/css/bootstrap.css";

@import "~font-awesome/css/font-awesome.css";






















# Public

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
