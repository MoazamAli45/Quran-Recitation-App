import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playListData} from '../constants';
import ControlCenter from '../components/ControlCentre';
import AudioInfo from '../components/audioInfo';
import AudioSlider from '../components/audioSlider';

const width = Dimensions.get('window').width;
const AudioPlayer = () => {
  //   track represent one object
  const [track, setTrack] = useState<Track | null>();

  //   <----------------------- TO RUN NEXT Audio -------------------->
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        //  WHEN TRACK CHANGES THIS CODE WILL RUN NEW AUDIO WILL RUN
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        //  TRACK WILL BE SET
        setTrack(playingTrack);
        break;
    }
  });

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />
      <AudioInfo track={track} />
      <AudioSlider />
      <ControlCenter />
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
