
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform,StatusBar } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';
// TODO:use TYPES HERE 
export const VideoPlayScreenHome: React.FC = ({ route, navigation }: any) => {
  const { videoURL } = route.params;
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [
    playerState, setPlayerState
  ] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState<string>('content');

  const onSeek = (seek: any) => {
    //Handler for change in seekbar
    videoPlayer?.current?.seek(seek);
  };

  const onPaused = (playerState: any) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current?.seek(0);
  };

  const onProgress = (data: any) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  // const onFullScreen = () => {
  //   setIsFullScreen(isFullScreen);
  //   if (screenType == 'content') setScreenType('cover');
  //   else setScreenType('content');
  // };

  const onFullScreen = () => {
    if (!isFullScreen) {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true)

    } else {
      StatusBar.setHidden(false)
      if (Platform.OS === 'ios') {
        Orientation.lockToPortrait();
      }
      Orientation.lockToPortrait();
    }
    setIsFullScreen(!isFullScreen);
  };
  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
      setIsFullScreen(false);
      StatusBar.setHidden(false)
    }
  }, [])
  const renderToolbar = () => (
    <View >
      <Text style={{ color: 'white' }}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  return (
    <View style={{ flex: 1,justifyContent:"center",alignItems:"center",backgroundColor:"black" }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 99999, paddingTop: 20, position: 'absolute', right: 20, top: 20 }}>
        <Text style={{ color: 'white', fontSize: 30 }}>X</Text>
      </TouchableOpacity>
      <View style={{ width: "95%", height: 160, borderRadius: 14 }}>

      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        // resizeMode={screenType}
        resizeMode={"cover"}
        // onFullScreen={isFullScreen}
        source={{
          uri:
            videoURL,
        }}
        style={styles.mediaPlayer}
        volume={10}
      />
        </View >
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View >
  )
}
// TODO: move this to styled
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
