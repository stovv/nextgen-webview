import React, { FC } from 'react';
import {StyleSheet, View} from "react-native";
import {FormInput} from "./form-input";
import {Button} from "./button";
import Airplane from "./icons/airplane";
import SearchIcon from "./icons/search";
import { useNavigation } from "@react-navigation/native";


export const SearchForm: FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FormInput
          placeholder="Откуда"
          iconLeft={Airplane}
          divider
          direction="from"
        />
        <FormInput
          placeholder="Куда"
          iconLeft={SearchIcon}
          direction="to"
        />
      </View>
      <Button title="Найти билеты" onClick={() => {
        // @ts-ignore
        navigation.navigate('SearchPage');
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 16,
    boxShadow: '0px 20px 24px 0px #00000014'
  },
  container: {
    width: '100%',
    borderRadius: 12,
    flexDirection: 'column',
    backgroundColor: '#F2F3F5',
    marginBottom: 14,
  }
});
