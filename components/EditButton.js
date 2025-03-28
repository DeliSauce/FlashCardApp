import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo

/**
 * EditButton - A reusable edit button component for React Native
 * 
 * @param {object} props
 * @param {function} props.onPress - Function to call when button is pressed
 * @param {string} props.label - Optional text label (default: "Edit")
 * @param {object} props.style - Additional styles for the button container
 * @param {object} props.textStyle - Additional styles for the text label
 * @param {object} props.iconStyle - Additional styles for the icon
 * @param {boolean} props.iconOnly - Whether to show only the icon (default: false)
 * @param {string} props.size - Icon size (default: 16)
 * @param {string} props.color - Icon and text color (default: "#007AFF")
 */
const EditButton = ({
  onPress,
  label = "Edit",
  style,
  textStyle,
  iconStyle,
  iconOnly = false,
  size = 16,
  color = "#007AFF",
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Feather
          name="edit-2"
          size={size}
          color={color}
          style={[styles.icon, iconStyle]}
        />
        
        {!iconOnly && (
          <Text style={[styles.text, { color }, textStyle]}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
  },
});

export default EditButton;