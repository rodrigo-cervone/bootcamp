# README FIRST

## Prerequisites

* [Android SDK](https://developer.android.com/studio/releases/sdk-tools.html)
  * OSX
    * XCode Command Line Tools
* [NodeJS 6.10 LTS](https://nodejs.org/en/)
* [Ionic 2](https://ionicframework.com/docs/v2/intro/installation/)

## Installing

* npm install

## Running

### Development mode

* ionic serve 
  - Will run the internal server and it will be provided with livereload

* ionic build android
  - Will make an apk file ready to be loaded in a development device or an emulator
  > You must add android to your project first by doing:
  > ``` ionic platform add android ```

* (Mac) ionic build ios
  - Will make an ipa file ready to be loaded in a development device or an emulator
  through xcode
  > You must add android to your project first by doing:
  > ``` ionic platform add ios ```

* *TODO* Windows?
  
* ionic run android
  - Runs ionic build android and installs the apk in the connected device or emulator
  and also has the livereload activated.
  > See notes on ionic build android

* ionic run ios
  - Runs ionic build android and installs the apk in the connected device or emulator
  and also has the livereload activated.
  > See notes on ionic build ios
  
* npm test
  - Builds the project and run the unit tests. 

* *TODO* e2e tests.
