import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type Adkar = {
  id: number;
  category_id: number;
  text_with_diacritics: string;
  text_without_diacritics: string;
  sanad: string;
  counter_text: string;
  counter_number: number;
};

const Dikr = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const db = useSQLiteContext();
  const [data, setData] = useState<Adkar[]>([]);
  // TODO: check/remove brakets for hadith
  // TODO: show counter
  // TODO: countdown logic

  useEffect(() => {
    (async () => {
      const result = await db.getAllAsync<Adkar>(
        "SELECT * FROM azkar WHERE category_id = ?;",
        id,
      );
      setData(result);
    })();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.reverse()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={[StyleSheet.absoluteFill, styles.counter]}>
                {item.counter_number}
              </Text>
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardContent}
              >
                <Text style={styles.textPrimary}>
                  {item.text_with_diacritics}
                </Text>
              </ScrollView>
              {
                // FIX: long sanad overflow
                // mosque entering dikr
              }
              <Text style={styles.textSecondary}>{item.sanad}</Text>
              <Text></Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const cardHeight = height * 0.9;
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: (height - cardHeight) / 2,
  },
  cardContainer: {
    width,
    alignItems: "center",
    height: "100%",
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#0f4c5c",
    borderRadius: 20,
  },
  cardContent: {
    paddingTop: 20,
  },
  textPrimary: {
    fontSize: 24,
    fontFamily: "Uthmanic",
    marginBottom: 20,
  },
  textSecondary: {
    fontSize: 14,
    fontFamily: "Cairo",
    paddingTop: 10,
  },
  counter: {
    fontSize: 128,
    top: cardHeight / 3,
    textAlign: "center",
    fontFamily: "Cairo",
    opacity: 0.3,
  },
});
export default Dikr;
