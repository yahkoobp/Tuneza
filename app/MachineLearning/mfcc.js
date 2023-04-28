import Sound from 'react-native-sound';
import { MFCC } from 'mfcc';

const numMFCCs = 20; // Number of MFCCs to extract

// Load the audio file using react-native-sound
const audioFile = new Sound('C:\Users\YAHKOOB\Desktop\Project\Tuneza\classical.00002.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the audio file:', error);
  } else {
    console.log('successfully loaded the audio file');

    // Create an MFCC object
    const mfcc = new MFCC({
      sampleRate: audioFile.getSampleRate(),
      frameSize: 2048,
      hopSize: 512,
      numCoefficients: numMFCCs,
      melFilterbank: {
        numFilters: 26,
        fMin: 20,
        fMax: audioFile.getSampleRate() / 2,
      },
    });

    // Extract the MFCCs of the audio file
    const audioData = audioFile.getDuration() > 0 ? audioFile : audioFile.clone();
    audioData.setCurrentTime(0);

    const mfccs = mfcc.process(audioData.getChannelData(0));
    console.log('MFCCs:', mfccs);

    // Do something with the MFCCs
  }
});
