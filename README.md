# LIRI-node-app

### Briefing:

Language
Interpretation
&
Recognition
Interface
---------
`LIRI`
WILL be a commandLine NODEjs app that takes in parameters and will give back data for movies, music, concerts, etc.

### Semantics:
1. LIRI will search SPOTIFY/ BANDS->CONCERTS/ OMDB->MOVIES

2. GET proper packages && API keys
> `axios` package (https://www.npmjs.com/package/axios)

> NODE `spotify` API << (https://www.npmjs.com/package/node-spotify-api) 

> `OMBD` << (http://www.omdbapi.com) :: "a067ba83"
queryURL: "http://www.omdbapi.com/?i=tt3896198&apikey=a067ba83"

> `Bands In Town` (API) << http://www.artists.bandsintown.com/bandsintown-api)

> `moment` package << (https://www.npmjs.com/package/moment)

> `dotenv` package << (https://www.npmjs.com/package/dotenv)

## Sub.RULES
* Include screenshots of the typical userFlow of your APP(LIRI) {SPOTIFY -> BANDS IN TOWN -> OMDB}
* any other screenshots deemed necessary to help as a benchmark to show anyone else who never was introduced to the app so they can understand the purpose and fucntionality/semantics


### Instructions

1. Navigate to the root of your project and run `npm init -y` &mdash; this will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

2. Make a `.gitignore` file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

```
node_modules
.DS_Store
.env
```

3. Make a JavaScript file named `keys.js`.

* Inside keys.js your file will look like this:

```js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```

4. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

* If someone wanted to clone your app from github and run it themselves, they would need to supply their own `.env` file for it to work.

5. Make a file called `random.txt`.

   * Inside of `random.txt` put the following in with no extra characters or white space:

     * spotify-this-song,"I Want it That Way"

6. Make a JavaScript file named `liri.js`.

7. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

```js
require("dotenv").config();
```

8. Add the code required to import the `keys.js` file and store it in a variable.

```js
  var keys = require("./keys.js");
```
  
* You should then be able to access your keys information like so

  ```js
  var spotify = new Spotify(keys.spotify);
  ```

9. Make it so liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`