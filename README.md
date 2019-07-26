# Ant Derby
React Native app based on this coding challenge:
https://gist.github.com/wkoutre/247b7c6f7d6fdc92a22ba60364e438f6

#Installation

Clone this repository:

```bash
git clone https://github.com/KnowikiApps/AntDerby.git
cd AntDerby
```

Install dependencies:

```bash
npm install
```
## iOS

Build iOS Libraries for async-storage. More info here:
https://github.com/react-native-community/async-storage

```bash
cd ios/ && pod install
cd ..
```

#Running the app

## iOS:

```bash
react-native run-ios
```

## Android

Requires Android SDK Version 28.

1. Launch an Android virtual device running Android 9.0 with API 28 or newer

```bash
react-native run-ios
```

If you get an error like "Unable to load script. Make sure you're running a metro server..." Follow these instructions:

1. Launch an Android virtual device running Android 9.0 with API 28 or newer
2. Open two(2) terminal windows or tabs

In the first terminal run:

```bash
react-native start
```

In the second terminal run:

```bash
react-native run-ios
```

## Image Sources

Ant Image source:
https://commons.wikimedia.org/wiki/File:Ant_(Jacob_Eckert).svg