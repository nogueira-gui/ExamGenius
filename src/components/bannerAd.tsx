import { View, Text, StyleSheet } from "react-native";


const BannerAd = () => {

    return (<View style={styles.bannerAd}>
        <Text>BANNER AD</Text>
    </View>);
}
const styles = StyleSheet.create({
    bannerAd: {
      height: 50,
      backgroundColor: '#455',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default BannerAd;