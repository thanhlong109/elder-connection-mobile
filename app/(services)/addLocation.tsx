import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, MarkerPressEvent, Region } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Button, Text } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { Postion } from '~/types/address.type';
import { setAddAddress } from '~/slices/addressSlice';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const AddLocation = () => {
  const form = useSelector((state: RootState) => state.addressSlice.addAdress);
  const dispatch = useDispatch();
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      if (form.addressDetail.trim().length == 0) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Cấp quyền truy cập vị trí của bạn?');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const initialRegion = {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        setRegion(initialRegion);
        setMarker({ latitude, longitude });
        mapRef.current?.animateToRegion(initialRegion, 1000);
      } else {
        const position: Postion = JSON.parse(form.addressDetail);
        const newRegion = {
          ...position,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(newRegion);
        setMarker(position);
        mapRef.current?.animateToRegion(newRegion, 1000);
      }
    })();
  }, []);

  const handleSelectPostion = () => {
    const position = JSON.stringify(marker);
    dispatch(setAddAddress({ ...form, addressDetail: position }));
    router.back();
  };

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
          key: process.env.EXPO_PUBLIC_GOGGLE_MAP_API_KEY,
          language: 'vi',
          components: 'country:vi',
        }}
        fetchDetails={true}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.textInput,
        }}
        onFail={(error) => console.log('error google autocomplete:', error)}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        zoomTapEnabled
        zoomEnabled
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={(e) => {
          const { coordinate } = e.nativeEvent;
          setMarker(coordinate);
        }}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <Button
        onPress={handleSelectPostion}
        backgroundColor={colors.primary}
        className="absolute bottom-8 z-10 !rounded-lg">
        <Text className="font-psemibold text-lg !text-white">Chọn vị trí này</Text>
      </Button>
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

export default AddLocation;
