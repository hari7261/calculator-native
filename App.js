import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, useColorScheme } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 375; // Base width for scaling

const scale = size => (width / baseWidth) * size;

const Calculator = () => {
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemColorScheme === 'dark');
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const { width: newWidth } = Dimensions.get('window');
      // Re-render component to update scaled sizes
      setDisplay(display);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (currentValue == null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(result));
      setCurrentValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  const Button = ({ onPress, text, isZero, isOperator }) => (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.button, 
        isZero && styles.zeroButton,
        isOperator && styles.operatorButton,
        { backgroundColor: darkMode ? styles.darkTheme.buttonBackground : styles.lightTheme.buttonBackground }
      ]}
    >
      <Text style={[
        styles.buttonText,
        isOperator && styles.operatorButtonText,
        { color: darkMode ? styles.darkTheme.buttonText : styles.lightTheme.buttonText }
      ]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: darkMode ? styles.darkTheme.background : styles.lightTheme.background }
    ]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Text style={[styles.themeToggleText, { color: darkMode ? styles.darkTheme.text : styles.lightTheme.text }]}>
          {darkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
      <View style={styles.display}>
        <Text style={[
          styles.displayText,
          { color: darkMode ? styles.darkTheme.text : styles.lightTheme.text }
        ]}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button onPress={clearDisplay} text="AC" />
          <Button onPress={toggleSign} text="+/-" />
          <Button onPress={inputPercent} text="%" />
          <Button onPress={() => performOperation('÷')} text="÷" isOperator />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputDigit(7)} text="7" />
          <Button onPress={() => inputDigit(8)} text="8" />
          <Button onPress={() => inputDigit(9)} text="9" />
          <Button onPress={() => performOperation('×')} text="×" isOperator />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputDigit(4)} text="4" />
          <Button onPress={() => inputDigit(5)} text="5" />
          <Button onPress={() => inputDigit(6)} text="6" />
          <Button onPress={() => performOperation('-')} text="-" isOperator />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputDigit(1)} text="1" />
          <Button onPress={() => inputDigit(2)} text="2" />
          <Button onPress={() => inputDigit(3)} text="3" />
          <Button onPress={() => performOperation('+')} text="+" isOperator />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputDigit(0)} text="0" isZero />
          <Button onPress={inputDecimal} text="." />
          <Button onPress={() => performOperation('=')} text="=" isOperator />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: scale(20),
  },
  displayText: {
    fontSize: scale(70),
  },
  buttonContainer: {
    paddingBottom: scale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  button: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  zeroButton: {
    width: scale(170),
    alignItems: 'flex-start',
    paddingLeft: scale(30),
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    fontSize: scale(30),
  },
  operatorButtonText: {
    color: 'white',
  },
  themeToggle: {
    position: 'absolute',
    top: scale(40),
    right: scale(20),
    zIndex: 1,
  },
  themeToggleText: {
    fontSize: scale(24),
  },
  darkTheme: {
    background: 'black',
    text: 'white',
    buttonBackground: '#333333',
    buttonText: 'white',
  },
  lightTheme: {
    background: 'white',
    text: 'black',
    buttonBackground: '#E0E0E0',
    buttonText: 'black',
  },
});

export default Calculator;