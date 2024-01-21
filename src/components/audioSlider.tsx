import Slider from '@react-native-community/slider';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {useProgress} from 'react-native-track-player';
const AudioSlider = () => {
  const {position, duration} = useProgress();
  const [isSliding, setIsSliding] = useState(false);

  const onSlidingStart = () => {
    setIsSliding(true);
  };

  const onSlidingComplete = async (value: any) => {
    await TrackPlayer.seekTo(value);
    setIsSliding(false);
  };

  const onValueChange = (value: any) => {
    if (!isSliding) {
      // Update UI only if not actively sliding
      // You can implement your own logic here if needed
      // For example, format the time and display it while sliding
      // This is optional and can be customized based on your UI requirements
      console.log('Current sliding position:', value);
    }
  };

  return (
    <View>
      <Slider
        style={styles.sliderContainer}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#fff"
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        onValueChange={onValueChange}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.time}>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
});

export default AudioSlider;
