import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import "firebase/firestore";

import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { useSelector } from "react-redux";

export const Chat = ({ navigation }: { navigation: any }) => {
  const userInfo = useSelector((state: any) => state.user);

  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();

  const messagesRef = db
    .collection("chatRooms")
    .doc(`room_${userInfo.relationshipId}`)
    .collection("messages");

  const user = {
    _id: userInfo.uid,
    name: userInfo.name,
    avatar: userInfo.avatarSrc,
  };

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessage) =>
        GiftedChat.append(previousMessage, messages)
      );
    },
    [messages]
  );

  const handleSend = async (messages: []) => {
    const write = messages.map((m) => messagesRef.add(m));
    await Promise.all(write);
  };

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = messagesRef.onSnapshot((querySnashot) => {
      const messagesFirestore = querySnashot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#019EF4",
          },
          left: {
            backgroundColor: "#9C14C4",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const handleMakeCall = () => {
    if (!userInfo.partnerPhoneNumber) {
      Alert.alert(
        "Missing Info",
        "Their phone number missing from their profile. Ask them to update their phone number."
      );
      return;
    } else {
      Linking.openURL(`tel:${userInfo.partnerPhoneNumber}`);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={globalStyles.androidSafeArea}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <MaterialIcons name="arrow-back" size={30} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.heading}>
            <Text style={globalStyles.pageTitleText}>CHAT</Text>
            <Image
              source={require("../assets/unicorn.png")}
              style={{ width: 30, height: 60 }}
            />
          </View>
          <TouchableOpacity onPress={handleMakeCall}>
            <MaterialIcons name="phone" size={30} color={colors.white} />
          </TouchableOpacity>
        </View>

        <GiftedChat
          messages={messages}
          user={user}
          renderBubble={renderBubble}
          renderUsernameOnMessage={true}
          onSend={handleSend}
        />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

//For custom GiftedChat styling:
//https://www.gitmemory.com/issue/FaridSafi/react-native-gifted-chat/1739/629664911

const styles = StyleSheet.create({
  //header
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  title: {
    color: colors.white,
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },
  inputBackground: {
    backgroundColor: colors.black,
  },
});
