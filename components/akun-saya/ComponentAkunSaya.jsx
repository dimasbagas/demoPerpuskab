import { Text, View } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ComponentAkunSaya = () => {
  const [membership, setMembership] = useState({});

  useEffect(() => {
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://975a28b17724.ngrok-free.app/user/members/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      const text = await response.text();
      console.log('Response status:', response.status);
      console.log('Response text:', text);
      if (response.ok) {
        const data = JSON.parse(text);
        if (Array.isArray(data) && data.length > 0) {
          const member = data[0]; // Assuming the first member is the current user
          setMembership({
            namaAnggota: member.member_name,
            surel: member.member_email,
            tanggalRegistrasi: member.register_date,
            institusi: member.inst_name,
            idAnggota: member.member_id,
            tipeKeanggotaan: member.member_type_id,
            berlakuHingga: member.expire_date,
          });
        } else {
          setMembership({});
        }
      } else {
        console.error('Server error:', text);
        setMembership({});
      }
    } catch (error) {
      console.error('Error fetching membership details:', error);
      setMembership({});
    }
  };

  return (
    <View
      style={{
        alignItems: "flex-start",
        flex: 1,
        width: "100%",
        padding: 20,
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Detail Keanggotaan
      </Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontWeight: "bold"}}>Nama Anggota : </Text>
        <Text>{membership.namaAnggota || 'Loading...'}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontWeight: "bold"}}>Surel : </Text>
        <Text>{membership.surel || 'Loading...'}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontWeight: "bold"}}>Tanggal Registrasi : </Text>
        <Text>{membership.tanggalRegistrasi ? new Date(membership.tanggalRegistrasi).toLocaleDateString() : 'Loading...'}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontWeight: "bold"}}>Institusi : </Text>
        <Text>{membership.institusi || 'Loading...'}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontWeight: "bold"}}>ID Anggota : </Text>
        <Text>{membership.idAnggota || 'Loading...'}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontWeight: "bold"}}>Tipe Keanggotaan : </Text>
        <Text>{membership.tipeKeanggotaan || 'Loading...'}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontWeight: "bold"}}>Berlaku Hingga : </Text>
        <Text>{membership.berlakuHingga ? new Date(membership.berlakuHingga).toLocaleDateString() : 'Loading...'}</Text>
      </View>
    </View>
  );
};

export default ComponentAkunSaya;
