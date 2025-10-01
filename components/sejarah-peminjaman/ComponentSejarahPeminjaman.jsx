import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';

const ComponentSejarahPeminjaman = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('https://bd5f0b37f8a6.ngrok-free.app/api/loan-history/');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching loan history:', error);
      setHistory([]);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>Kode Eksemplar: {item.kodeEksemplar}</Text>
      <Text style={styles.historyText}>Judul: {item.judul}</Text>
      <Text style={styles.historyText}>Tanggal Pinjam: {new Date(item.tanggalPeminjaman).toLocaleDateString()}</Text>
      <Text style={styles.historyText}>Tanggal Kembali: {new Date(item.tanggalPengembalian).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sejarah Peminjaman Milik Saya</Text>
      </View>
      <View style={styles.countContainer}>
        <Text>{history.length} sejarah peminjaman eksemplar</Text>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default ComponentSejarahPeminjaman;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#344175",
  },
  countContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
