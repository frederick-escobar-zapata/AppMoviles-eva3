import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface TitleProps {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

export default function Title({ style, children }: TitleProps) {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#1F2933", // gris azulado elegante
    marginBottom: 16,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.06)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});