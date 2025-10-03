/* eslint-disable react/react-in-jsx-scope */
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAP_KEY } from "../../env";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from "../colors";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const LocationSearch = forwardRef(({ styles, onPress, isLoading, isSelected, iconVisible}, ref) => {
    return(
        <View style={[defaultStyles.container, styles?.container]}>
            <GooglePlacesAutocomplete
                ref={ref}
                placeholder="Location"
                styles={{ 
                    container: { flex: 0 }, 
                    textInput: { paddingLeft: iconVisible ? 30 : 10 } 
                }}
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
                minLength={1}
                predefinedPlaces={[]} // <— 핵심: undefined 접근 방지
                fetchDetails={true}
            />
            {iconVisible && (
                <View style={[defaultStyles.icon, styles?.icon]}>
                    <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color={isSelected ? PRIMARY.DEFAULT : GRAY.LIGHT}
                    />
                </View>
            )}
      </View>
    )
})

LocationSearch.displayName = 'LocationSearch';

LocationSearch.defaultProps = {
    isLoading: false,
    isSelected: false,
    iconVisible: true
}

LocationSearch.propTypes = {
    styles: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isSelected: PropTypes.bool,
    iconVisible: PropTypes.bool
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