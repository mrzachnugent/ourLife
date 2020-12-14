import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ListItemProps } from "../types/screenTypes";

export const ListItem = ({
  item,
  onLongPress,
  onCompleted,
  onPress,

  colorOne,
  colorTwo,
}: ListItemProps) => {
  if (!item) {
    return <Text>OUPSIE!</Text>;
  }
  return (
    <View style={styles.itemContainer}>
      <LinearGradient
        start={{ x: 0.0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 1]}
        colors={["#22262B", "#282C31"]}
        style={
          !item.completed
            ? {
                ...styles.checkButton,
                borderWidth: 0,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              }
            : {
                ...styles.checkButton,
                borderWidth: 0,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                opacity: 0.5,
              }
        }
      >
        <View style={globalStyles.mainBtns}>
          {Boolean(item.assigned) ? (
            <View>
              {item.assigned !== "no one" ? (
                <Image
                  source={{ uri: item.assigned }}
                  style={{
                    width: 60,
                    height: 60,
                    opacity: 1,
                    borderTopLeftRadius: 7,
                    borderBottomLeftRadius: 7,
                  }}
                />
              ) : (
                <MaterialIcons
                  name="person"
                  size={25}
                  color={colors.white}
                  style={{ padding: 10 }}
                />
              )}
            </View>
          ) : (
            <View style={globalStyles.mainBtns}>
              <Text style={styles.smallText}>{item.quantity} ✕</Text>
            </View>
          )}
        </View>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1, y: 0.0 }}
        locations={[0, 1]}
        colors={[colorOne, colorTwo]}
        style={
          !item.completed ? styles.itemBtn : { ...styles.itemBtn, opacity: 0.3 }
        }
      >
        <TouchableOpacity
          style={styles.itemTouchable}
          onPress={() => onPress(item)}
          onLongPress={() => onLongPress(item)}
        >
          <Text
            style={
              item.name.length < 16
                ? styles.itemText
                : { ...styles.itemText, fontSize: 17 }
            }
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0.0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.9]}
        colors={["#282C31", "#22262B"]}
        style={
          !item.completed
            ? styles.checkButton
            : { ...styles.checkButton, borderColor: "#01A355" }
        }
      >
        <TouchableOpacity
          style={globalStyles.mainBtns}
          onPress={() => onCompleted(item)}
        >
          <Feather
            name="check"
            size={30}
            color={!item.completed ? "#ffffff50" : "#01A355"}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginVertical: 10,
  },
  checkButton: {
    ...globalStyles.btnContainer,
    width: 60,
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,

    borderStyle: "solid",
  },
  itemBtn: {
    flex: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 5,
    height: 60,
  },
  itemTouchable: {
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 11,
  },
  itemText: {
    color: colors.white,
    fontSize: 25,
    textShadowColor: "#00000060",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 15,
  },

  smallText: {
    color: colors.white,
    fontSize: 18,
  },
});
