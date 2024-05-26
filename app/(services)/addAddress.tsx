import React, { useState } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '~/constants/colors';

const initalRegion: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function App() {
  const [region] = useState<Region>(initalRegion);
  const [markerPos, setMarkerPos] = useState<LatLng>({
    latitude: initalRegion.latitude,
    longitude: initalRegion.longitude,
  });
  return (
    <SafeAreaView>
      <View className="h-full w-full">
        <MapView
          style={{ width: '100%', height: '100%' }}
          loadingEnabled
          loadingIndicatorColor={colors.primary}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
          region={region}>
          <Marker
            draggable
            coordinate={markerPos}
            onDragEnd={(e) => setMarkerPos(e.nativeEvent.coordinate)}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}
