// import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';

const Profile = () => {
  // const [imageUri, setImageUri] = useState(null);

  // useEffect(() => {
  //   const fetchProfileImage = async () => {
  //     try {
  //       const response = await fetch('https://your-backend.com/api/profile-picture');
  //       const data = await response.json();
  //       setImageUri(data.imageUrl);
  //     } catch (error) {
  //       console.error('Error fetching profile image:', error);
  //     }
  //   };

  //   fetchProfileImage();
  // }, []);

  return (
    <View style={styles.container}>
      {/* {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholder} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 40,
    bottom: 30,
  },
  profileImage: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
  },
  placeholder: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: '#ccc', // Placeholder color
  },
});

export default Profile;