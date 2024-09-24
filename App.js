import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, useColorScheme, Modal, ScrollView } from 'react-native';

const App = () => {
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemColorScheme === 'dark');
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

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

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (currentValue == null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(result));
      setHistory([...history, `${currentValue} ${operator} ${inputValue} = ${result}`]); // Update history
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

  const Button = ({ onPress, text, isOperator, isZero }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isOperator && styles.operatorButton, isZero && styles.zeroButton]}
    >
      <Text style={[styles.buttonText, isOperator && styles.operatorButtonText]}>{text}</Text>
    </TouchableOpacity>
  );

  const clearHistory = () => {
    setHistory([]);
    setIsHistoryVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF' }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Text style={{ color: darkMode ? '#FFFFFF' : '#000000', fontSize: 24 }}>
          {darkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
      <View style={styles.display}>
        <Text style={[styles.displayText, { color: darkMode ? '#FFFFFF' : '#000000' }]}>
          {display}
        </Text>
        <Text style={[styles.operatorText, { color: darkMode ? '#FF9500' : '#FF9500' }]}>
          {operator ? operator : ''}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button onPress={clearDisplay} text="AC" />
          <Button onPress={() => inputDigit(7)} text="7" />
          <Button onPress={() => inputDigit(8)} text="8" />
          <Button onPress={() => inputDigit(9)} text="9" />
          <Button onPress={() => performOperation('÷')} text="÷" isOperator />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputDigit(4)} text="4" />
          <Button onPress={() => inputDigit(5)} text="5" />
          <Button onPress={() => inputDigit(6)} text="6" />
          <Button onPress={() => performOperation('×')} text="×" isOperator />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputDigit(1)} text="1" />
          <Button onPress={() => inputDigit(2)} text="2" />
          <Button onPress={() => inputDigit(3)} text="3" />
          <Button onPress={() => performOperation('-')} text="-" isOperator />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputDigit(0)} text="0" isZero />
          <Button onPress={inputDecimal} text="." />
          <Button onPress={() => performOperation('+')} text="+" isOperator />
        </View>
      </View>
      <TouchableOpacity onPress={() => setIsHistoryVisible(true)} style={styles.historyButton}>
        <Text style={{ color: darkMode ? '#FFFFFF' : '#000000', fontSize: 18 }}>History</Text>
      </TouchableOpacity>
      <Modal
        visible={isHistoryVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={[styles.modalContainer, { backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF' }]}>
          <ScrollView style={styles.historyContainer}>
            {history.length === 0 ? (
              <Text style={[styles.historyText, { color: darkMode ? '#FFFFFF' : '#000000' }]}>
                No history available.
              </Text>
            ) : (
              history.map((item, index) => (
                <Text key={index} style={[styles.historyText, { color: darkMode ? '#FFFFFF' : '#000000' }]}>
                  {item}
                </Text>
              ))
            )}
          </ScrollView>
          <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
            <Text style={{ color: 'red', fontSize: 18 }}>Clear History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsHistoryVisible(false)} style={styles.closeButton}>
            <Text style={{ color: 'blue', fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  displayText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  operatorText: {
    fontSize: 40,
    color: '#FF9500',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginHorizontal: 5,
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  zeroButton: {
    flex: 2,
  },
  buttonText: {
    fontSize: 24,
    color: '#000000',
  },
  operatorButtonText: {
    color: '#FFFFFF',
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  historyContainer: {
    maxHeight: '80%',
    width: '100%',
  },
  historyText: {
    fontSize: 16,
    paddingVertical: 5,
  },
  clearButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  historyButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});

export default App;
