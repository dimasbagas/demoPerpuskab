import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';

const ComponentPinjaman = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch('https://728b88e77d52.ngrok-free.app/api/biblio/');
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error('Error fetching loans:', error);
      setLoans([]);
    }
  };

  const renderLoan = ({ item }) => (
    <View style={style.loanItem}>
      <Text style={style.loanText}>Kode Eksemplar: {item.kodeEksemplar}</Text>
      <Text style={style.loanText}>Judul: {item.judul}</Text>
      <Text style={style.loanText}>Tanggal Peminjaman: {new Date(item.tanggalPeminjaman).toLocaleDateString()}</Text>
      <Text style={style.loanText}>Tanggal Pengembalian: {new Date(item.tanggalPengembalian).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={style.containerContent}>
      {/* bawah */}
      <View style={style.listContainer}>
        <FlatList
          data={loans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLoan}
          contentContainerStyle={style.list}
        />
      </View>
    </View>
  );
};

export default ComponentPinjaman;

const style = StyleSheet.create({
  containerContent: {
    alignItems: "center",
    width: 352,
    height: 400,
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "#5D7BF4",
    width: "100%",
    borderBottomRightRadius: 100,
    elevation: 10,
    height: 230,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 50,
    position: "relative",
  },
  title: {
    color: "#344175",
    fontSize: 30,
    fontWeight: "bold",
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 16,
    height: 131,
  },
  list: {
    paddingTop: 16,
  },
  loanItem: {
    backgroundColor: "#D9D9D9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  loanText: {
    fontSize: 16,
    marginBottom: 4,
  },
},);
