import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-ui-lib';
import MapView, { Marker, Region } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const addAddress = () => {
  const [region, setRegion] = useState<Region>({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);

  const mapRef = useRef<MapView | null>(null);

  const [currentLocation, setcurrentLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Cấp quyền truy cập vị trí của bạn?');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setcurrentLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Tìm địa điểm"
        onPress={(data, details) => {
          console.log(data);
          const location = details?.geometry.location;
          if (location) {
            const newRegion = {
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            };
            setRegion(newRegion);
            setMarker({ latitude: location.lat, longitude: location.lng });
            mapRef.current?.animateToRegion(newRegion, 1000);
          }
        }}
        query={{
          key: process.env.GOGGLE_MAP_API_KEY,
          language: 'vi',
          components: 'country:vi',
        }}
        fetchDetails={true}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.textInput,
        }}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onPress={(e) => {
          const { coordinate } = e.nativeEvent;
          setMarker(coordinate);
        }}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    width: '90%',
    zIndex: 1,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default addAddress;
