# About this project
The Pan Dog is a medium animals store. There are a lot of species of animals starting with dogs and finishing with horses.
![Image alt](https://git.aimprosoft.com/learning/learning-nodejs-e-nikolenko.git/client/src/favicon.ico)
 The store collaborates with several shelters for animals  and farms, witch grow pets. The store has a long-standing customer base and is
 increased interest to the area.

... more information.

## For Development

- Run in console : 
    ```
    git clone https://git.aimprosoft.com/learning/learning-nodejs-e-nikolenko.git
    ```

-  Run `npm -v`. Must be **6.0.0**;
    Else false invoke `sudo npm i -g npm@lastest`.

-  Further you have to install packages from package.json and open a server for development

   ```
   npm install
   npm start
   ``` 
   But there is a problem and you must second time run:
   
   ```
   npm start
   ``` 
   It uses in the project local MongoDb --->>> in server/config/app/ -- mongodb://{your localhost}/{create db - dogdb or another name}

