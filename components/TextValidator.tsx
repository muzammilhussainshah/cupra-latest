import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../constants/Colors';

export const TextInputValidator = styled(TextInput) <{
  background?: string;
  fontColor?: string;
  radius?: number;
}>`
  margin-vertical: 9px;
  padding-horizontal: 19px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0px;
  height: 50px;
  color: ${props => (props.fontColor ? props.fontColor : Colors.white)};
  border: 1px solid #ffff;
  border-radius: ${props => (props.radius ? props.radius : 50)}px;
  background-color: ${props =>
    props.background ? Colors.white : 'transparent'};
  /* width: 330px; */
`;

type Props = React.ComponentProps<typeof TextInput> & {
  label?: string;
  errorText?: string | null;
  background?: string;
  color?: string;
  fontColor?: string;
  radius?: number;
};

const TextValidator: React.FC<Props> = props => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    background,
    fontColor,
    radius,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? '#fff' : '#fff';
  if (errorText) {
    color = '#B00020';
  }

  return (
    <View style={style}>
      <TextInputValidator
        fontColor={fontColor}
        background={background}
        radius={radius}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />

      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}>
          {errorText ?
            <Text
              style={[
                styles.label,
                {
                  color,
                },
              ]}>

              {/* {label}
              {errorText ? '*' : ''} */}
            </Text> :
            <Text
              style={[
                styles.label,
                {
                  color,
                },
              ]}>

              {label}
              {errorText ? '*' : ''}
            </Text>
          }
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 9,
    paddingHorizontal: 19,
    borderWidth: 1,
    borderRadius: 50,
    fontFamily: 'Avenir-Medium',
    fontSize: 16,
    color: '#fff',
    width: 350,
    height: 50,
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 20,
    marginBottom: 30,
    // height: 100
    // backgroundColor: 'rgba(221,221,221,0.1)',
  },
  label: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 18,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
});

export default TextValidator;
