import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Alert, Linking } from "react-native";
import { useSelector } from "react-redux";

import { DashboardNavProps } from "../types/navigationTypes";
import { InitialState } from "../types/reducerTypes";

import firebase from "firebase";
import "firebase/firestore";

import { GiftedChat, IMessage, User } from "react-native-gifted-chat";

import { DismissKeyboard } from "../Components/DismissKeyboard";
import { GenericHeader } from "../Components/GenericHeader";
import { RenderBubble } from "../Components/ReanderBubble";

export const Chat = ({ navigation }: DashboardNavProps) => {
  const userInfo = useSelector((state: InitialState) => state.user);
  const mountedRef = useRef<boolean>(true);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const db = firebase.firestore();

  //the collection messages is a subcollection of chatRoom, each message is a document.
  const messagesRef = db
    .collection("chatRooms")
    .doc(`room_${userInfo.relationshipId}`)
    .collection("messages");

  const user: any = {
    _id: userInfo.uid,
    name: userInfo.name,
    avatar: userInfo.avatarSrc,
  };

  //Callback is used to append the messages from firebase to giftedchat.
  const appendMessages = useCallback(
    (messages: any) => {
      if (!mountedRef.current) return;
      setMessages((previousMessage) =>
        GiftedChat.append(previousMessage, messages)
      );
    },
    [messages]
  );

  //Sends message to firebase
  const handleSend = async (messages: []) => {
    const write = messages.map((m) => messagesRef.add(m));
    await Promise.all(write);
  };

  //listens to changes on firebase, so the messages are sent in real-time,
  useEffect(() => {
    const unsubscribe = messagesRef.onSnapshot((querySnashot) => {
      const messagesFirestore = querySnashot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return {
            _id: message._id,
            text: message.text,
            user: message.user,
            createdAt: message.createdAt.toDate(),
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      appendMessages(messagesFirestore);
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, []);

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
      <GenericHeader
        goBack={() => navigation.navigate("Dashboard")}
        makeCall={handleMakeCall}
        heading="CHAT"
        iconName="phone"
      >
        <Image
          source={require("../assets/unicorn.png")}
          style={{ width: 30, height: 60, marginLeft: 20 }}
        />
      </GenericHeader>
      <GiftedChat
        messages={messages}
        user={user}
        renderBubble={RenderBubble}
        renderUsernameOnMessage={true}
        onSend={handleSend}
      />
    </DismissKeyboard>
  );
};
