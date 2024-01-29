import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import _debounce from 'lodash/debounce';
import Dashboard from './Dashboard';

const Comandos = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=wGxDfSWC4Ww');
  const [isPlaying, setIsPlaying] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const reactPlayerRef = useRef(null);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  const startCooldown = () => {
    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
    }, 5000); // Set the cooldown period (in milliseconds), adjust as needed
  };

  const debouncedHandleCommand = _debounce(handleCommand, 5000); // Adjust the debounce time as needed

  const commands = [
    {
      command: 'reproducir',
      callback: () => {
        if (!cooldown) {
          debouncedHandleCommand('reproducir');
          startCooldown();
        }
      },
    },
    {
      command: 'pausar',
      callback: () => {
        if (!cooldown) {
          debouncedHandleCommand('pausar');
          startCooldown();
        }
      },
    },
    {
      command: 'mutear',
      callback: () => {
        if (!cooldown) {
          debouncedHandleCommand('mutear');
          startCooldown();
        }
      },
    },
    {
      command: 'desmutear',
      callback: () => {
        if (!cooldown) {
          debouncedHandleCommand('desmutear');
          startCooldown();
        }
      },
    },
    {
      command: 'rebobinar',
      callback: () => {
        if (!cooldown) {
          debouncedHandleCommand('rebobinar');
          startCooldown();
        }
      },
    },
    {
      command: 'adelantar',
      callback: () => {
        if (!cooldown) {
          debouncedHandleCommand('adelantar');
          startCooldown();
        }
      },
    },
  ];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  console.log(transcript);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  function handleCommand(command) {
    console.log({ command });
    switch (command) {
      case 'reproducir':
        console.log('Reproduciendo...');
        setVideoUrl('https://www.youtube.com/watch?v=wGxDfSWC4Ww');
        setIsPlaying(true);
        break;
      case 'pausar':
        console.log('Pausando...');
        setVideoUrl('https://www.youtube.com/watch?v=wGxDfSWC4Ww');
        setIsPlaying(false);
        break;
      case 'mutear':
        console.log('Muteando...');
        setVideoUrl('https://www.youtube.com/watch?v=wGxDfSWC4Ww');
        muteVideo();
        break;
      case 'desmutear':
        console.log('Desmuteando...');
        setVideoUrl('https://www.youtube.com/watch?v=wGxDfSWC4Ww');
        unmuteVideo();
        break;
      case 'rebobinar':
        console.log('Rebobinando...');
        rewindVideo();
        break;
      case 'adelantar':
        console.log('Adelantando...');
        fastForwardVideo();
        break;
      default:
        break;
    }
  }

  function muteVideo() {
    if (reactPlayerRef.current) {
      reactPlayerRef.current.getInternalPlayer().mute(); // Mute the video
    }
  }
  
  function unmuteVideo() {
    if (reactPlayerRef.current) {
      reactPlayerRef.current.getInternalPlayer().unMute(); // Unmute the video
    }
  }

  function rewindVideo() {
    // Implement logic to rewind the video (e.g., seek backward)
    if (reactPlayerRef.current) {
      const currentTime = reactPlayerRef.current.getCurrentTime();
      reactPlayerRef.current.seekTo(currentTime - 10);
    }
  }

  function fastForwardVideo() {
    // Implement logic to fast forward the video (e.g., seek forward)
    if (reactPlayerRef.current) {
      const currentTime = reactPlayerRef.current.getCurrentTime();
      reactPlayerRef.current.seekTo(currentTime + 10);
    }
  }

  return (
    <div>
      <ReactPlayer ref={reactPlayerRef} url={videoUrl} playing={isPlaying} controls width="853px" height="480px" />
    </div>
  );
};

const cardStyle = {
  margin: '20px',
  width: '30%',
};

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} gutterBottom>
        Comandos de voz:
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        - Reproducir
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        - Pausar
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        - Mutear
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        - Desmutear
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        - Rebobinar
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        - Adelantar
      </Typography>
    </CardContent>
  </React.Fragment>
);

function TutorialReact() {
  return (
    <div>
      <Dashboard />
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" style={cardStyle}>
          {card}
        </Card>
      </Box>
      <Comandos />
    </div>
  );
}

export default TutorialReact;