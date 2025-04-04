when installing use `npx expo install <package>`
[https://docs.expo.dev/workflow/using-libraries/]

### To deploy to localhost:
- nvm use 20 && npx expo start --web
- w (to lauch web on localhost)

### EAS development build
- eas build --profile development --platform [ios|android|all]

##### other useful CLI commands
- npx expo-doctor



firebase FireStore for db
cloud functions for Gemini API calls
Google for oauth

### Expo Development
- can run on android using Expo Go
- Development Build: run either in an emulator or use EAS to run the dev build on device (https://www.youtube.com/watch?v=FdjczjkwQKE&t=597s)


### To do list
- need to figure out how to hide Google credentials from users and how to deploy them (look into Expo EAS, expo-secure-store)
-- https://reactnative.dev/docs/security#storing-sensitive-info
-- https://docs.expo.dev/versions/latest/sdk/securestore/
- swipe tracking: track left vs right swipes, record data (should probably be maintained at the 'user' level instead of the 'card'/'collection' level if we want collection sharing in the future), and dynamically set card display order based on optimal frequency (i.e. show known info less often)
- figure out best RN component for buttons (pressable, touchableopacity, button, etc)
- make sure that UI is reachable at bottom of screen
- API services
-- figure out if API methods should return an object with info, data, or boolean
-- 


### Learnings
- when a component that is part of a mapped group of components is not interacting properly, make sure that the key param is set properly (eg. will not work if all components have the same key)


TO DO!!!!!!
- need to figure out when to save user data to /users


### AI
- Gemini


### App Uses:
- expo router for navigation
- react-native-reanimated for gesture handling
- 

### Markdown Component Styling
- https://github.com/iamacup/react-native-markdown-display

### Resources for Animations
- https://docs.swmansion.com/react-native-reanimated/docs/utilities/interpolate/
- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY
- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
