import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {currencyByRupee} from './constant';
import Country from './components/Country';
import Snackbar from 'react-native-snackbar';

const App = (): JSX.Element => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const convertCurrency = (item: Currency) => {
    if (amount.length === 0) {
      setConvertedAmount('');
      setTargetCurrency('');

      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    const amt = parseFloat(amount);
    if (!isNaN(amt)) {
      setTargetCurrency(item.name);
      const res = amt * item.value;
      setConvertedAmount(`${item?.symbol} ${res.toFixed(2)}`);
    } else {
      setConvertedAmount('');
      setTargetCurrency('');

      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.amountInputContainer}>
        <TextInput
          value={amount}
          onChangeText={amt => setAmount(amt)}
          style={styles.amountInput}
          keyboardType="number-pad"
          placeholder="Enter amount in Rupees(INR)"
        />
        {convertedAmount && (
          <View style={styles.convertedTextContainer}>
            <Text style={styles.convertedText}>{convertedAmount}</Text>
          </View>
        )}
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={currencyByRupee}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.currency,
                item.name === targetCurrency && styles.selectedCurrency,
              ]}
              onPress={() => convertCurrency(item)}>
              <Country {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.name}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  amountInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    padding: 8,
  },
  amountInputContainer: {
    margin: 10,
  },
  convertedText: {
    fontSize: 20,
    padding: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  flatlistContainer: {},
  selectedCurrency: {
    backgroundColor: 'yellow',
  },
  currency: {
    borderWidth: 1,
    margin: 10,
    padding: 8,
    borderRadius: 8,
    borderColor: 'white',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  convertedTextContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 20,
  },
});
