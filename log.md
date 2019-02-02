# Log

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
