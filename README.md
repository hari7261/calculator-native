# Calculator App - README

## Overview

This is a basic calculator application built with React Native, designed to provide users with a simple yet effective way to perform basic arithmetic operations. The app features a responsive design that scales based on the device's width, supports dark and light themes, and includes essential functionalities like addition, subtraction, multiplication, and division.

## Screenshots
Here are two screenshots of the output of the Calculator App:

![Calculator App - Light Theme](https://github.com/hari7261/calculator-native/blob/main/image1.jpg)
![Calculator App - Dark Theme](https://github.com/hari7261/calculator-native/blob/main/image2.jpg)


## Features

- **Basic Arithmetic Operations**: Perform addition, subtraction, multiplication, and division.
- **Responsive Design**: The calculator layout adjusts dynamically to different screen sizes.
- **Theme Toggle**: Switch between dark and light themes for better user experience.
- **Decimal and Percentage Functions**: Support for decimal inputs and percentage calculations.
- **Clear Functionality**: Reset the calculator display and clear stored values.

## Prerequisites

- Node.js installed on your machine.
- React Native CLI or Expo CLI.
- A physical or virtual device (Android/iOS) for testing.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/hari7261/calculator-native.git
   cd calculator-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Application**:

   For Expo:
   ```bash
   npx expo start
   ```

   For React Native CLI:
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

## Code Structure

- **Calculator.js**: The main component that contains the calculator logic and UI.
- **styles**: Contains styles using React Native's `StyleSheet` to manage the app's appearance, including dark and light theme styles.
- **Button Component**: A reusable button component for handling user input.

## Usage

- **Input Digits**: Tap on the number buttons (0-9) to enter digits.
- **Perform Operations**: Tap the operators (`+`, `-`, `×`, `÷`) to perform calculations.
- **Toggle Theme**: Click on the sun/moon icon in the top right corner to switch between dark and light themes.
- **Clear**: Tap on the `AC` button to clear the display and reset the calculator.

## Key Functions

- **inputDigit**: Updates the display with the pressed digit.
- **inputDecimal**: Adds a decimal point to the current display.
- **clearDisplay**: Resets the calculator state.
- **performOperation**: Handles arithmetic operations based on user input.
- **calculate**: Performs the specified operation between two numbers.

## Customization

You can customize the app by:

- Modifying button styles in the `styles` object.
- Adding more complex operations or features (like square root, memory functions, etc.).
- Enhancing the UI with animations or different layouts.

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- React Native for providing a robust framework for building mobile applications.
- The community for resources and documentation that made this project possible.

---
