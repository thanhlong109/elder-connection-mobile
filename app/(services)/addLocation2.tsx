import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LocationPuck,
  MapView,
  MarkerView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import pin from '~/assets/images/Icons/mapPin.png';
import { featureCollection, point } from '@turf/helpers';
import axios from 'axios';
import { Button } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { setAddAddress } from '~/slices/addressSlice';
import { router } from 'expo-router';

Mapbox.setAccessToken('');
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface Feature {
  id: string;
  place_name: string;
  center: [number, number];
}

const addLocation2 = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.addressSlice.addAdress);
  const [selectedPost, setselectedPos] = useState<[number, number] | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Feature[]>([]);
  const cameraRef = useRef<Camera>(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Cấp quyền truy cập vị trí của bạn?');

        return;
      }

      if (form.addressDetail.trim().length > 0) {
        const position: [number, number] = JSON.parse(form.addressDetail);
        setselectedPos(position);
      } else {
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setselectedPos([longitude, latitude]);
      }
    })();
  }, []);

  const fetchSuggestions = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=`
        );
        setSuggestions(response.data.features);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const onSelectLocation = (location: Feature) => {
    setselectedPos(location.center);
    setSuggestions([]);
    setQuery(location.place_name);
  };

  const handleMapClick = (event: any) => {
    const { geometry } = event;
    const { coordinates } = geometry;
    setselectedPos(coordinates);
    console.log('Coordinates:', coordinates);
  };

  const handleSelectPostion = () => {
    const position = JSON.stringify(selectedPost);
    dispatch(setAddAddress({ ...form, addressDetail: position }));
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <View className="bg-white">
          <TextInput
            style={styles.input}
            placeholder="Search for a place"
            value={query}
            onChangeText={fetchSuggestions}
          />
        </View>
        {suggestions.length > 0 && (
          <FlatList
            className="bg-white"
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectLocation(item)}>
                <View style={styles.suggestionItem}>
                  <Text>{item.place_name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <MapView onPress={handleMapClick} style={styles.map} zoomEnabled>
        <Camera
          ref={cameraRef}
          followZoomLevel={16}
          //followUserLocation
          centerCoordinate={selectedPost || undefined}
          zoomLevel={16}
        />
        {selectedPost && <MarkerView coordinate={selectedPost} />}

        {selectedPost && (
          <ShapeSource id="mark" cluster shape={featureCollection([point(selectedPost)])}>
            <CircleLayer
              id="clusters"
              style={{
                circlePitchAlignment: 'map',
                circleColor: '#0066FF',
                circleRadius: 7,
                circleOpacity: 0.5,
                circleStrokeWidth: 2,
                circleStrokeColor: 'white',
                circleTranslate: [0, -5],
              }}
            />

            <SymbolLayer
              id="mark-icon"
              style={{
                iconImage: 'pin',
                iconSize: 0.3,
                iconAllowOverlap: true,
                iconAnchor: 'bottom',
              }}
            />
            <Images images={{ pin }} />
          </ShapeSource>
        )}

        <LocationPuck puckBearingEnabled puckBearing="heading" />
      </MapView>
      <Button
        onPress={handleSelectPostion}
        backgroundColor={colors.primary}
        className="absolute bottom-8 z-10 !rounded-lg">
        <Text className="font-psemibold text-lg !text-white">Chọn vị trí này</Text>
      </Button>
    </View>
  );
};

export default addLocation2;

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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
