import {FC, useCallback, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import type {SvgProps} from "react-native-svg";
import RemoveIcon from "./icons/remove";
import {useAutocompleteQuery} from "../store/api";
import {useAppDispatch} from "../store";
import {setFrom, setTo} from "../store/search-slice";


type TFormInputProps = {
  iconLeft?: FC<SvgProps>;
  iconRight?: FC<SvgProps>;
  divider?: boolean;
  direction?: "from" | "to";
  placeholder?: string;
};
export const FormInput: FC<TFormInputProps> = ({iconLeft: LeftIcon, direction, placeholder, divider, iconRight}) => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('');
  const { data } = useAutocompleteQuery({ part: value }, { skip: !value });
  const dispatch = useAppDispatch();

  const RightIcon = value ? RemoveIcon : iconRight;

  const onClear = useCallback(() => {
    setValue('');
    setSelected('');
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {LeftIcon && <LeftIcon/> }
        <TextInput style={[
          styles.input,
          {
            borderBottomWidth: divider ? 1 : 0,
            borderColor: divider ? '#0F193710' : undefined
          }
        ]} value={selected || value} placeholder={placeholder} onChangeText={(v) => {
          setValue(v);
          setSelected('');
        }} />
        {RightIcon && (
          <TouchableOpacity onPress={onClear}>
            <RightIcon/>
          </TouchableOpacity>
        ) }
      </View>
      <ScrollView style={[styles.popover, { opacity: (value && !selected) ? 1 : 0 }]}>
        {data?.data?.list.map((item) => (
          <TouchableOpacity style={styles.item} key={item.iata} onPress={() => {
            setSelected(`${item.name}, ${item.iata}`);
            dispatch(direction === 'from' ? setFrom(item.iata) : setTo(item.iata));
          }}>
            <Text>{item.name}, {item.iata}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  container: {
    paddingHorizontal: 12,
    padding: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 400,
    zIndex: 3,
  },
  popover: {
    left: 0,
    top: 56,
    zIndex: 4,
    width: '100%',
    maxHeight: 200,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderRadius: 12,
    boxShadow: '0px 20px 24px 0px #00000014'
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#00000014',
  }
})