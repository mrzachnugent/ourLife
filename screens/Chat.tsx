import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Alert, Linking } from "react-native";
import { useSelector } from "react-redux";

import { DashboardNavProps } from "../types/navigationTypes";
import { InitialState } from "../types/reducerTypes";

import firebase from "firebase";
import "firebase/firestore";

import { GiftedChat, IMessage, User } from "react-native-gifted-chat";

import { randomId } from "../utilities";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { GenericHeader } from "../Components/GenericHeader";
import { RenderBubble } from "../Components/ReanderBubble";

export const Chat = ({ navigation }: DashboardNavProps) => {
  const userInfo = useSelector((state: InitialState) => state.user);
  const mountedRef = useRef<boolean>(true);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const db = firebase.firestore();

  const messagesRef = db
    .collection("chatRooms")
    .doc(`room_${userInfo.relationshipId}`)
    .collection("messages");

  const user: User = {
    _id: userInfo.uid ? userInfo.uid : randomId(),
    name: userInfo.name ? userInfo.name : undefined,
    avatar: userInfo.avatarSrc ? userInfo.avatarSrc : undefined,
  };

  const appendMessages = useCallback(
    (messages: IMessage[]) => {
      if (!mountedRef.current) return null;
      setMessages((previousMessage) =>
        GiftedChat.append(previousMessage, messages)
      );
    },
    [messages]
  );

  const handleSend = async (messages: IMessage[]) => {
    const write = messages.map((m) => messagesRef.add(m));
    await Promise.all(write);
  };

  useEffect(() => {
    const unsubscribe = messagesRef.onSnapshot((querySnashot) => {
      if (!mountedRef.current) return null;
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
      if (!mountedRef.current) return null;
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
