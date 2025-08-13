import {FC} from "react";
import type {SvgProps} from "react-native-svg";
import {StyleSheet, TouchableOpacity} from "react-native";

type TIconButtonProps = {
  icon: FC<SvgProps>;
  onClick?: () => void;
};
export const IconButton: FC<TIconButtonProps> = ({ onClick, icon: Icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Icon width={32} height={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#26375850',
  },
});