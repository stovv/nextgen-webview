import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FC} from "react";

const cardMap = {
  insurance: {
    title: 'Закажи страховку\nс кэшбэком',
    description: 'По всему миру',
    color: '#E4F0FF',
  },
  credit: {
    title: '120 000 ₽ \nна путешествие',
    description: 'одобрено',
    color: '#FFEFD9'
  }
} as const;

type TCardProps = {
  view: keyof typeof cardMap;
}
export const Card: FC<TCardProps> = ({ view }) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: cardMap[view].color }]}>
      <Text style={styles.title}>{cardMap[view].title}</Text>
      <Text style={styles.description}>{cardMap[view].description}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 165,
    height: 165,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
  }
});