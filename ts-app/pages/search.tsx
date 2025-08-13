import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "../components/button";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {useAppSelector} from "../store";
import {selectDirection} from "../store/search-slice";
import {useGetSearchRecommendationsQuery} from "../store/api";
import dayjs from "dayjs";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {IconButton} from "../components/icon-button";
import IconBack from "../components/icons/icon-back";

export default function SearchPage() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { from, to } = useAppSelector(selectDirection);
  const { data } = useGetSearchRecommendationsQuery({
    segments: [[
      {
        from,
        to,
        date: dayjs().format('DD.MM.YYYY')
      }
    ]],
    adt: 1,
    class: 'e',
  });

  return (
    <View style={{ paddingTop: top, paddingHorizontal: 14 }}>
      <View style={styles.header}>
        <IconButton icon={IconBack} onClick={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }else {
            // @ts-ignore
            navigation.navigate('Home');
          }
        }}/>
        <Text>{from} | {to}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 20}}>
        {data?.data?.recommendations?.map(
          // @ts-ignore
          (recommendation) => (
            <View key={recommendation.id} style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#bebebe',
              marginBottom: 20,
              borderRadius: 24,
              padding: 20
            }}>
              {
                // @ts-ignore
                recommendation.segments.map(segment => (
                  <View key={`${segment.dep.country.id}-${segment.arr.country.id}`} style={{ flexDirection: 'row' }}>
                    <Text >{segment.dep.airport.code}</Text>
                    <Text key={segment.code}>-</Text>
                    <Text key={segment.code}>{segment.arr.airport.code}</Text>
                  </View>
                ))
              }
              <Text>{recommendation.price.RUB.amount} руб</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 100,
    position: 'static',
    paddingTop: 8,
  },
});