# &nbsp;![alt tag](http://dotnetify.net/content/images/greendot.png) dotNetify-React-Native Demo
DotNetify makes it super easy to connect your React Native mobile app to a cross-platform .NET back-end and get real-time two-way communication with WebSockets for free!

### Demo Features

- Reactive push model allows for a very light-weight client. No need to set up REST or GraphQL calls; state change can cause new data to be pushed directly into the component's state.
- Token-based authentication over websocket communications with expiration handling.
- Infinite list scrolling.
- Live data display for IoT use cases.
- Connection error handling.
- Using react-navigation with custom logic to track active screen.

### How To Run
Install [Node.js](https://nodejs.org) and [.NET Core SDK](https://www.microsoft.com/net/core#windowscmd).

Install [create-react-native-app](https://facebook.github.io/react-native/blog/2017/03/13/introducing-create-react-native-app.html):
```
npm i -g create-react-native-app
```

Follow the [instructions on Expo website](https://docs.expo.io/versions/latest/introduction/installation.html) to install Genymotion Android emulator and/or download the Expo app for iOS or Android.

Run the client on a terminal:
```
npm install
npm start
```
Open another terminal and run the server (ASP.NET Core 2.0):
```
cd server
dotnet build
dotnet run
```

### Android Demo
<img src="http://dotnetify.net/content/images/react_native_android_demo.gif" height="500">
