

# Useful Commands
   cd public

    ng generate module /pages --routing

    ng ggenerate component /pages


   

# How to Run

* Steps: goto /public 
   
              - run **npm install**
              
              - run **ng serve** for development mode/debugging use this
              
              Angular running at http://localhost:4200/
              
              
              - run **ng build**  for production mode use this
                            
              then just hit **http://localhost:3001/** (this will work if node server is running on http:/localhost:3001)
              




# Install Bootstrap and FontAwesome

    use npm to install the dependencies:
    

    ##  npm install bootstrap font-awesome --save **
    

    dependencies are installed we can tell Angular CLI that it needs to load these styles
    

    One easy way to do this is by opening the file src/styles.css and adding the following lines:
    

    ##  @import "~bootstrap/dist/css/bootstrap.css";
    

       @import "~font-awesome/css/font-awesome.css"; **
       

# Install jQuery

    install jQuery using npm as follows


     ## npm install jquery --save 
     

     Second go to the ./angular-cli.json file at the root of your Angular CLI project folder, and find the scripts: [] property, and include the path to jQuery as follows

    
     ##  "scripts": [ "../node_modules/jquery/dist/jquery.min.js" ]


    Note: If you want to use bootstrap in your application or if you already have in your project, make sure to include jQuery before including the bootstrap javascript file as follows. Since bootstrap’s javascript file requires jQuery.

    
    ##  "scripts": [ "../node_modules/jquery/dist/jquery.min.js",

    ##   "../node_modules/bootstrap/dist/js/bootstrap.js"]
    


    Now to use jQuery, all you have to do is to import it as follows in whatever component you want to use jQuery.

    import * as $ from 'jquery';







# Extra

# Public

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
