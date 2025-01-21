import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { styles } from "./styles/GameStyle";
import { useDispatch, useSelector } from "react-redux";
import { changeDifficulty } from "../redux";
import { changeMode, restartGame } from "../redux/board/action";
import Board from "./Board";
import { OIcon, XIcon } from "./icons"; // Assuming these are the SVG icons used for O and X
import * as Linking from "expo-linking";
import { CrossIcon,CircleIcon } from "./icons";
const Game = () => {
    const { player1, player2, difficulty, turn, mode } = useSelector((state) => state);

    const dispatch = useDispatch();

    const renderTurnIndicator = () => {
        return turn === 1 ? (
            <View style={styles.turnContainer}>
                {/* <XIcon style={styles.turnIcon} /> */}
                <Text style={styles.turnText}>Turn for:</Text>
                <CrossIcon size={30} />
            </View>
        ) : (
            <View style={styles.turnContainer}>
                {/* <OIcon style={styles.turnIcon} /> */}
                <Text style={styles.turnText}>Turn for:</Text>
                <CircleIcon size={30} />
            </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {renderTurnIndicator()}
                <View style={styles.pickerContainer}>
                    {/* Difficulty picker only visible in "robot" mode */}
                    {mode === "robot" && (
                        <Picker
                            style={styles.picker}
                            mode={"dialog"}
                            selectedValue={difficulty}
                            onValueChange={(itemValue) => dispatch(changeDifficulty(itemValue))}
                        >
                            <Picker.Item label={"easy"} value={"easy"} />
                            <Picker.Item label={"hard"} value={"hard"} />
                            <Picker.Item label={"impossible"} value={"impossible"} />
                        </Picker>
                    )}
                    <Picker
                        style={styles.picker}
                        mode={"dialog"}
                        selectedValue={mode}
                        onValueChange={(itemValue) => dispatch(changeMode(itemValue))}
                    >
                        <Picker.Item label={"robot"} value={"robot"} />
                        <Picker.Item label={"friendly"} value={"friendly"} />
                    </Picker>
                </View>
                <Board />
                {player1.winner && player2.winner ? (
                    <Text style={styles.info}>Draw</Text>
                ) : player1.winner ? (
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}>
                    <Text style={styles.info}>{mode=='robot'?'You':'Player'}</Text>
                    <Text style={styles.info}>Won:</Text>
                   { mode=='friendly' && <CrossIcon size={30} />}
                   </View>
                    // <Text style={styles.info}>{`${player1.name} wins`}</Text>
                    // <CircleIcon size={30} />
                ) : (
                    player2.winner &&
                   ( <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}>
                     <Text style={styles.info}>{mode==='robot'?'Robot':"Player"}</Text>
                     <Text style={styles.info}>Won</Text>
                     <CircleIcon size={30} />
                    </View>)
                )}
                <Button mode={"contained"} onPress={() => dispatch(restartGame())}>
                    Restart
                </Button>
            </View>
        </ScrollView>
    );
};

export default Game;
