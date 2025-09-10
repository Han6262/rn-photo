/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAP_KEY } from "../../env";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from "../colors";
import PropTypes from "prop-types";


function LocationSearch({ styles, onPress, isLoading, isSelected}) {
    return(
        <View style={[defaultSyles.container, styles?.container]}>
            <GooglePlacesAutocomplete
                placeholder="Location"
                styles={{ container: { flex: 0 }, textInput: { paddingLeft: 30 } }}
                onPress={onPress}
                onFail={(e) => {
                    console.log('GooglePlacesAutocomplete onFail:', e);
                }}
                query={{ key: MAP_KEY, language: 'ko' }}
                debounce={400}
                enablePoweredByContainer={false}
                textInputProps={{
                    editable: !isLoading,
                    onFocus: () => {}, // <-- 핵심: undefined 접근 방지
                    /* onBlur: () => {},
                    autoCorrect: false,
                    returnKeyType: 'search', */
                }}
                fetchDetails
                minLength={1}
                predefinedPlaces={[]} // <— 핵심: undefined 접근 방지
            />
            <View style={[defaultStyles.icon, styles?.icon]}>
                <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color={isSelected ? PRIMARY.DEFAULT : GRAY.LIGHT}
                />
            </View>
      </View>
    )
}

LocationSearch.defaultProps = {
    isLoading: false,
    isSelected: false
}

LocationSearch.propTypes = {
    styles: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isSelected: PropTypes.bool
}

const defaultStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBotttomWidth: 0.5,
        borderBottomColor: GRAY.LiGHT,
    },
    icon: {
        position: 'absolute',
        left: 20,
        top: 16
    }
})
export default LocationSearch;