// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST: 'http://localhost',
  PORT: 5000,
  firebaseConfig: {
    apiKey: "AIzaSyCcsAj_doAQx1ODZz3ujdQsFHB-4CUN3wo",
    authDomain: "embin-interview.firebaseapp.com",
    projectId: "embin-interview",
    storageBucket: "embin-interview.appspot.com",
    messagingSenderId: "1005528839866",
    appId: "1:1005528839866:web:ee1b476313c22da00b3483"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
