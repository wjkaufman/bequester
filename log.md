# Log

### 2019-03-18

Still going through bequests, now at "Black Racing Hat". The app works well!

### 2019-03-16

Now I'm getting into the actual population of the database with _real_ data. I'll rename the mock database to `keggy` and the actual database to `lonepine`.

Using [this tutorial](http://www.sqlitetutorial.net/sqlite-import-csv/) to import data into the tables.

Ok, I'm going through bequests rn (in alphabetical order), stopping at "2013 Dartmouth racing Uni". Adding holdings to bequests, updating people's info. Easy peasy!

### 2019-03-15

It's the Ides of March. It's Sean Ward's birthday. It's time to work on Bequester!

I'm gonna stop for now. When I come back:
- Make holding list component work (take functionality out of person/bequest)
- Also would be nice to rename "holding-editor" to "holding-creator" (+camelCase)
- Add delete functionality for holding
- Start putting in data

### 2019-03-14

Quick little add on the plane: bequest searchbar now works!

Apparently to add colums to tables:
`ALTER TABLE bequests ADD COLUMN isDeleted integer;`
Then did this to make everything not deleted:
`UPDATE bequests SET isDeleted = 0;`
Fair enough!

Finished up making the searchbar and soft-delete functionality. Merged and cleaned up the issues on GitHub.

Next steps: consolidate holdings editor into its own component (maybe even make separate components for all object editors?). But I'm tired so I'll do it later.

### 2019-03-08

Well, despite my best intentions of going to sleep, my body didn't want to and I've stayed up working on this. Still don't feel sleepy, but I'll give it another go once I jot down what I've done.

- Added routes between bequests and people (actually pretty simple)
- Added a searchbar for people, will be easy to do for bequests too

Next steps:

- Load bequests, people into db
- Tackle the editor issue (will be super helpful)
- When making a new holding, add the option to create a new person (for frosh)

### 2019-03-03

I think I'm going to switch gears now and start making it pretty! Hopefully that'll make it much more usable and nice and such.

Made things more pretty. Still need to figure out independent scrollbars...

Finished making things pretty for now. Now to do:

- Add bulk import functionality, start looking at getting bequests into software
- Other small features
    - Click on person to go to person view, click bequest to go to bequest view
    - More easily visualize _lineage_, show year only for dates?
- Fix editor situation, create separate components for editors so logic/templates are cleaner

All to do for another day though. I'm going to bed now.

### 2019-03-02

Finished writing update functionality (I think), now moving on to create for bequests, person, holdings, in that order.

It's late, I'm tired. For next time:

- finish create holding on bequest side (identical to what I did for person)
- start making it pretty?
- OR add bulk import functionality

### 2019-02-24

Continuing the bequest edit form...

### 2019-02-23

On 2/18 I was working on holdings too...

So I added holdings stuff to bequests, today I'll add to people as well.

Also figured out how to (I think) properly sanitize SQL queries.

**TO DO NEXT: figure out forms with angular (validation would be nice, but really just need to write update SQL queries at a minimum).**

### 2019-02-09

Figured out the navbar (installed ng-bootstrap, and that seemed to take care of it). Starting to add forms to _update_ bequests, will do same for people once I understand what's going on. Then I'll have to flesh out the backend configurations.

To do:
- Finish "update" functionality
    - Front end forms
    - Back end db stuff
- Add "create" functionality
    - Individual
    - Batch create (so I can add from spreadsheet)
- Add "delete" functionality

### 2019-02-07

Ok, going to refactor bequests now...

Did lots of stuff (see git log if you care). Current problems:

- hamburger menu doesn't work when app is too small
- I'm tired

### 2019-02-06

Picking it up, working on the database right now... Might look into formatting/angular stuff later, like views (so I can look at people too!).

Surprisingly productive! Next steps:

- Look into views, show people/bequests one at a time
- Refactor bequests into bequests and bequest (singular, plural)
- Add CSS, make it pretty
- Link people and bequests
- Import data!

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

Got electron set up in typescript (always nice to be consistent), now looking into IPC for Electron...

Ok, stopping at "Using IPC in Angular to communicate with the main process" for now, but I think this is going to work really well!

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
