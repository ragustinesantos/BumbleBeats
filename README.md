This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions before proceeding. Make sure that you also have a Android device or Android emulator that runs Android 14.0 ("UpsideDownCake"). Also, make sure that you have Node.js in your local device.

## Step 1: How to setup BumbleBeats in my local environment?

First, you will need to clone the github project. Run the following command from your terminal:

```bash
git clone https://github.com/ragustinesantos/BumbleBeats.git
```

Alternatively, you could also clone the project using GitHub Desktop.

Now that you have the project cloned, make sure that you will execute the next set of commands from the BumbleBeats directory.
Not sure how to do that after cloning the project? I got you don't sweat it. After cloning, run the following command:

```bash
cd .\BumbleBeats\
```

Hooray! Now you're in the BumbleBeats folder, I knew you had it in you.

Next we need to install our dependencies. Type the following in your terminal: 

```bash
npm install

# OR (I know, I get lazy typing install too)
npm i
```

What are all these dependencies we're installing you ask? You can check the package.json file in our project to see the list of dependencies that our project has and their corresponding versions. Don't worry though, since npm install will take care of installing all of them for you. Pretty neat right? CAN YOU IMAGINE if you had to do it one by one? Me too buddy, me too.

### Gradle

Now our next step is running your commands for gradle. "But I already see a .gradle folder in my project" *sigh* I know, there's a chance you don't have to do this step, but we're here to make sure that our project runs for everyone, especially YOU. We recommend this practice to ensure that you won't encounter problems when running our project.

Run the following commands in order under the BumbleBeats terminal.

```bash
# This command moves you to the android folder
cd .\android\

# This command rebuilds your gradle
./gradlew

# This command returns you to the root folder of BumbleBeats
cd..
```

That it! Now we don't have to worry about gradle (I hope).

### Environment Database

In this step we have to setup our environment files for our project. From the BumbleBeats root folder, create a file named ".env". Then populate this file with the following: 

```bash
FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
```

Now, don't worry, you know I got your back, I'll teach you in Step 2 how to populate these keys. If you already have your database setup, wow you're an overachiever and you can skip the entirety of Step 2. Just make sure you put the values on of the keys for each corresponding variable!

## Step 2: How to Setup your Firestore Database?

   1.    Open your browser and go to: "https://firebase.google.com/".
   2.    Click "Go to console".
   3.    Click "Create a project".
   4.    Enter your project name (Ideally with BumbleBeats in the name) and hit continue.
   5.    Turn off "Enable Google Analytics" and click "Create project" then continue.
   6.    Beside the "Project overview" click the gear icon and choose "Project settings".
   7.    Click the icon that looks like </> and add a nickname for your app.
   8.    Click "Register app".
   9.    Click "Continue to console".
   10.   In the sidebar of the website, under "Build" dropdown, click "Authentication".
   11.   Click "Get started" and choose "Email/Password" under Native providers.
   12.   In this Configure Provider page, Enable "Email/Password" then click Save.
   13.   Go back to "Project settings" from step 6.
   14.   Scroll down and you would see a code similar to this:

```bash
  // Your web app's Firebase configuration
   const firebaseConfig = {
   apiKey: "your_key_is_here",
   authDomain: "your_key_is_here",
   projectId: "your_key_is_here",
   storageBucket: "your_key_is_here",
   messagingSenderId: "your_key_is_here",
   appId: "your_key_is_here"
   };
```
   15.   Copy the corresponding keys and paste it in your .env file in your BumbleBeats folder.

```bash
FIREBASE_API_KEY="insert_your_key_here"
FIREBASE_AUTH_DOMAIN="insert_your_key_here"
FIREBASE_PROJECT_ID="insert_your_key_here"
FIREBASE_STORAGE_BUCKET="insert_your_key_here"
FIREBASE_MESSAGING_SENDER_ID="insert_your_key_here"
FIREBASE_APP_ID="insert_your_key_here"
```

   16.   That's it! your database is properly setup!

## Step 3: How to run this app?

Now this is the final step. You have to turn on your android device or your android emulator and run the following command from the root of your BumbleBeats terminal: 

```bash
# using npm
npm start
```
Once it says that the dev server is ready, type 'a' to run the application on android.

And now for the real final step, can you say "Backpack"? I'm kidding that's Dora's line, you've already outdone yourself. I've now given you the map, now it's your turn to use the app!

## Congratulations! :tada:

You've successfully run the BumbleBeats app! Now go listen to some music you party animal. :partying_face:

### Now what?

- If you want to add this React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having trouble running the application, you can try some of the following commands:

```bash
# This command moves you to the android folder
cd .\android\

# This command will delete and build your gradle
./gradlew clean

# This command returns you to the root folder of BumbleBeats
cd..

# This will start the application with a clean cache
npm start - -reset-cache
```

If you still can't get this to work, contact the BumbleBeats development team.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## References

API - Deezer API https://developers.deezer.com/api

Images and Icons Used:

- https://www.flaticon.com/free-icon/jazz_525670
- https://www.flaticon.com/free-icon/guitar_2741297
- https://www.flaticon.com/free-icon/bar-chart_478544
- https://www.flaticon.com/free-icon/conductor_1776628
- https://www.flaticon.com/free-icon/playlist_5765567
- https://www.flaticon.com/free-icon/kpop_1999536
- https://www.flaticon.com/free-icon/blues_16085300
- https://www.flaticon.com/free-icon/kpop_4993166
- https://www.flaticon.com/free-icon/beat-box_6141157
- https://www.flaticon.com/free-icon/radio_3075906
- https://in.pinterest.com/pin/163537030204906569/
- https://iconscout.com/free-lottie-animation/bee-lounging-5009360
- https://www.45worlds.com/cdalbum/cd/pycd712
- https://www.vanityfair.com/hollywood/story/super-bowl-2025-kendrick-lamar-halftime
- https://www.biography.com/musicians/wolfgang-mozart
- https://www.newyorker.com/culture/culture-desk/the-genuine-vulnerability-of-snoop-doggs-gospel-album
- https://collider.com/good-not-great-animated-movies-21st-century-ranked/
- https://www.prestigeonline.com/hk/lifestyle/culture-plus-entertainment/jyp-entertainment-founder-park-jin-young-net-worth-and-things-he-owns/
- https://www.bostonglobe.com/arts/2018/08/29/janet-jackson-celebrates-michael-jackson-birthday-with-video-remember-time/kEI5B8UJVIvNAikpvX0xFJ/story.html
- https://collider.com/guardians-of-the-galaxy-soundtrack-download/
- Led Zeppelin - Stairway To Heaven (Live at Earls Court 1975) https://www.youtube.com/watch?v=Ly6ZhQVnVow