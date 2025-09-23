import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getPosts } from '../api/post';
import { Image } from 'expo-image';
import ImageSwiper from '../components/ImageSwiper';
const ListScreen = () => {
  const [data, setData] = useState([])
 useEffect(() => {
  (async () => {
    const list = await getPosts();
    setData(list[20]);
  })();
 },[])
 return(
  <View style={styles.container}>
    <View style={{ flexDirection:'row', alignItems:'center', marginBottom:10, gap: 10 }}>
      <Image 
        source={data?.user?.photoURL}
        style={{ width:50, height:50, borderRadius:25 }}
      />
      <Text >{data?.user?.displayName}</Text>
    </View>
    <View>
      <ImageSwiper photos={data?.photos} />
      <Text>{data?.text}</Text>
      <Text>{data?.location}</Text>
    </View>
  </View>
 )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
  },
});

export default ListScreen;
