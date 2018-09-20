# Angular(6)-Node-Express-MySQL-Passport
Angular(6)-Node-Express-MySQL-Passport (Under Development- Basic functionalities are working)

# Project Screenshots

https://github.com/rhtvma/Angular-Node-Express-MySQL-Passport/wiki



# Public (Front-End)

This /public folder contains Angular code 

* Angular-Routing-With-Lazy-Loading 

  https://github.com/rhtvma/Angular-Node-MySQL-Passport/tree/Angular-Routing-With-Lazy-Loading


* Angular-Sidebar 

  https://github.com/rhtvma/Angular-Node-MySQL-Passport/tree/Angular-Sidebar

* Angular-Form-Validation 

  https://github.com/rhtvma/Angular-Node-MySQL-Passport/tree/Angular-Form-Validation


# Server (Back-End)

This /server folder contains Node.Js(Server) code 


# Database

import database from /database folder

 * username: 12345@gmail.com
 * password: 12345
 
 
 
 
 # How to Run
 
   Note: make sure #node and #git is installed on your system.
     
   * Step 1 : goto /databse folder and import rhtvma.sql in your machine
   
   
   * Step 2 : goto /server 
              
              run **npm install** 
              
              run **node server.js**
              
              Server running at http://localhost:3001/
              
              goto **/server/config/default.json**
              
              Update your databse configurationshere
               "mysql": {
                  "connectionLimit": 5,
                  "host": "127.0.0.1",
                  "port": 3306,
                  "user": "root",
                  "password": "root",
                  "database": "anemp"
                },

   * Step 3 : goto /public 
   
              run **npm install**
              
              run **ng serve** for development mode/debugging use this
              
              Angular running at http://localhost:4200/
              
              
              run **ng build**  for production mode use this
                            
              then just hit **http://localhost:3001/** (this will work only after **Step 2**)
              

 
 
 
 
 
 
 
 
 
 
 
 
 
