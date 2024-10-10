import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Dikr = {
  id: number;
  name: string;
};

const Home = () => {
  const db = useSQLiteContext();
  const [data, setData] = useState<Dikr[]>([]);
  useEffect(() => {
    (async () => {
      const result = await db.getAllAsync<Dikr>(
        "SELECT id, name_without_diacritics as name FROM categories",
      );
      setData(result);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}></View>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/dikr",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.item}>
              <Text style={styles.index}>
                {"﴾"}
                {index + 1}
                {"﴿"}
              </Text>
              <Text style={styles.title}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="light" backgroundColor="#0f4c5c" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0f4c5c",
    height: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  item: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    height: 40,
  },
  index: {
    fontSize: 16,
    fontFamily: "Uthmanic",
    width: 40,
    textAlign: "right",
  },
  title: {
    fontSize: 16,
    fontFamily: "Cairo",
  },
});

export default Home;
