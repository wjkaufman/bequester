# Bequester

## Installation

When running `npm install`, don't forget to also run `./node_modules/.bin/electron-rebuild` so that electron can use native Node modules. Especially a problem for sqlite3.

Also, if you run into `electron-rebuild` errors, make sure you are using a proper Python version. I installed Anaconda recently, and was trying to rebuild using Python 3.5 when Python 2 was necessary. Something ot keep in mind...

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
