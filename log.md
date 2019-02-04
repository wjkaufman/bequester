# Log

### 2019-02-03

Against my better judgement, I'm going to try to get sqlite3 to work now. Wish me luck... (it's 21:19 and I'm in bed with the lights off, but I can't stop thinking about the app working...)

Ok, I've satisfied myself for tonight. I tried installing sqlite3, rebuilding for electron, then importing in the `main.js` file. That seemed to work like a charm. Now I'm trying to see if I can do the same in the bequest component ts file (I shouldn't be able to, but want to make sure). To do:

- Figure out error:
  ```
  ERROR in src/app/bequest/bequest.component.ts(4,15): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i @types/node` and then add `node` to the types field in your tsconfig.
  ```
    - possibly install the type definitions for node or something
    - maybe also for sqlite3
- If angular successfully imports sqlite3, then great
- If not, figure out how to get angular to talk to the main process so I can access the database
- Continue...

That didn't work, but [found this tutorial](https://malcoded.com/posts/angular-desktop-electron) which might be gold!

### 2019-02-02

Things to think about:

- Make a bequests component for all bequests? Or just one?
- Also go back and check out messageServices at some point...

Ok, I'm confused about how I'm going to do the whole database thing. `sqlite3` really didn't like being loaded in the angular environment, so I'm going to try doing it in the electron environment instead now. But not sure if it'll work. We'll see...

### 2019-02-01

Looking at the [Angular tutorial for heroes](https://angular.io/tutorial/toh-pt1), seems pretty helpful. I'll start remembering at some point I'm sure...

Got through "1. the hero editor", and also am using `ng serve` to run the web app while I develop the code. Eventually I'll roll it into a desktop app, but for now this is fine.

Next step, figure out how to get the database up and running. Should be fun!

- Look at database modules for Node, what's easy to implement
- Learn how to make service, incorporate in angular app
- Keep on going! Add people, make bequests and people link up, etc.

### 2019-01-26

Hello! Sitting on the couch in my apartment in Arlington. I've been thinking about making a little app to better view/edit the Bequests spreadsheet that I'm in charge of. Some things I want to do:

- Have a list view for both bequests and people
- Clicking on a person shows bequests, clicking on bequest shows lineage
- Have it be responsive, so suggest autofill names, type of bequest, etc.
- Reach:
  - Include pictures of people/bequests
  - Make a web app with login so people can view it from anywhere

I've been looking at the following
- Electron quick start guide
- [a scotch tutorial](https://scotch.io/tutorials/creating-desktop-applications-with-angularjs-and-github-electron)
- [and this angular/electron tutorial (newer)](https://alligator.io/angular/electron/)

Started with `ng new bequester`, then installed electron. Changed some of the settings according to the last tutorial listed above.

Things I'm thinking about:

- Using sqlite as db framework
