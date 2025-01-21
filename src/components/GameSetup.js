import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { styles } from "./styles/GameStyle";
import { useDispatch } from "react-redux";
import { changeDifficulty, changeMode } from "../redux/board/action";

const GameSetup = ({ onStart }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    const [selectedMode, setSelectedMode] = useState('robot');

    const dispatch = useDispatch();

    const handleStart = () => {
        dispatch(changeDifficulty(selectedDifficulty));
        dispatch(changeMode(selectedMode));
        onStart();
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.turn}>Select Mode and Difficulty</Text>
                
                {/* Mode Selection */}
                <Picker
                    style={styles.picker}
                    mode={'dialog'}
                    selectedValue={selectedMode}
                    onValueChange={setSelectedMode}
                >
                    <Picker.Item label={'robot'} value={'robot'} />
                 
                    <Picker.Item label={'2 players'} value={'2players'} />
                </Picker>

                {/* Show Difficulty Picker only if mode is not "2 players" */}
                {selectedMode !== '2players' && (
                    <Picker
                        style={styles.picker}
                        mode={'dialog'}
                        selectedValue={selectedDifficulty}
                        onValueChange={setSelectedDifficulty}
                    >
                        <Picker.Item label={'easy'} value={'easy'} />
                        <Picker.Item label={'hard'} value={'hard'} />
                        <Picker.Item label={'impossible'} value={'impossible'} />
                    </Picker>
                )}

                <Button mode={'contained'} onPress={handleStart}>
                    Start Game
                </Button>
            </View>
        </ScrollView>
    );
};

export default GameSetup;
