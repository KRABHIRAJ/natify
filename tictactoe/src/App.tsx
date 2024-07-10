/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from './components/CustomIcon';
import Snackbar from 'react-native-snackbar';

const App = (): JSX.Element => {
  const emptyArr = Array.from({length: 9}, () => 'empty');
  const [gameGrid, setGameGrid] = useState(emptyArr);
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [playerWon, setPlayerWon] = useState('');

  const checkTheWinner = (arr: string[]) => {
    if (arr[0] !== 'empty' && arr[1] === arr[0] && arr[2] === arr[0]) {
      return arr[0];
    } else if (arr[3] !== 'empty' && arr[4] === arr[3] && arr[5] === arr[3]) {
      return arr[3];
    } else if (arr[6] !== 'empty' && arr[7] === arr[6] && arr[8] === arr[6]) {
      return arr[6];
    } else if (arr[0] !== 'empty' && arr[3] === arr[0] && arr[6] === arr[0]) {
      return arr[0];
    } else if (arr[1] !== 'empty' && arr[1] === arr[4] && arr[1] === arr[7]) {
      return arr[1];
    } else if (arr[2] !== 'empty' && arr[2] === arr[5] && arr[2] === arr[8]) {
      return arr[2];
    } else if (arr[0] !== 'empty' && arr[0] === arr[4] && arr[0] === arr[8]) {
      return arr[0];
    } else if (arr[2] !== 'empty' && arr[2] === arr[4] && arr[2] === arr[6]) {
      return arr[2];
    } else if (!arr.includes('empty')) {
      return 'draw';
    }
  };
  const resetGame = () => {
    setGameGrid(emptyArr);
    setIsPlayerX(!isPlayerX);
    setPlayerWon('');
  };
  const handleClick = (index: number) => {
    if (playerWon) {
      return Snackbar.show({
        text: 'Match has Finished.',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    if (gameGrid[index] === 'empty') {
      gameGrid[index] = isPlayerX ? 'cross' : 'circle';
    } else {
      return Snackbar.show({
        text: 'Please choose other box.',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    const matchRes = checkTheWinner(gameGrid);
    if (matchRes === 'draw') {
      return Snackbar.show({
        text: 'Match is draw',
        backgroundColor: '#99F05E',
        textColor: '#000000',
      });
    } else if (matchRes === 'cross' || matchRes === 'circle') {
      setPlayerWon(isPlayerX ? 'X' : 'O');
      return Snackbar.show({
        text: `Player ${playerWon} has won.`,
        backgroundColor: '#99F05E',
        textColor: '#000000',
      });
    }
    setIsPlayerX(!isPlayerX);
  };
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.palyerChance}>
          <Text style={styles.playerText}>
            {playerWon
              ? `Player ${playerWon} Won`
              : `Player ${isPlayerX ? 'X' : 'O'} Chance`}
          </Text>
        </View>
        <View style={styles.gridContainer}>
          <FlatList
            data={gameGrid}
            numColumns={3}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => handleClick(index)}
                  key={index}
                  style={styles.gridIcon}>
                  <CustomIcon name={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TouchableOpacity onPress={resetGame} style={styles.palyerChance}>
          <Text style={styles.playerText}>
            {playerWon ? 'Start Match' : 'Reset Match'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    height: '100%',
  },
  palyerChance: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  playerText: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 20,
  },
  gridContainer: {
    marginVertical: 50,
  },
  gridIcon: {
    width: '28%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
