import * as React from 'react';
import Dashboard from "./Dashboard";
import YoutubeEmbed from "./YoutubeEmbed";
import "./YoutubeEmbed.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useEffect } from 'react';

const Comandos = () => {
  var micStarted = false
  var videoStarted = false

  useEffect(() => {
    if (!micStarted) {
      SpeechRecognition.startListening();
    }
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  })

  const commands = [
    {
      command: 'reproducir',
      callback: () => handlePlayVideo(),
    }
  ]

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
  console.log(transcript)
  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handlePlayVideo = () => {
    try {
      console.log('Joined Play Function')
      if (!videoStarted && window.YT && window.YT.Player) {
        console.log('YT API is ready')
        const player = new window.YT.Player('react-tutorial-video', {
          height: '480',
          width: '853',
          videoId: 'wGxDfSWC4Ww', // Replace with your video ID
          events: {
            onReady: (event) => {
              console.log('YT Player is ready');
              console.log('Cueing and playing video...');
              event.target.loadVideoById('wGxDfSWC4Ww'); // Load and play the video
              videoStarted = true;
            },
          },
        });
      } else {
        console.error('YouTube API not ready.');
      }
    } catch (error) {
      console.error('Error playing the video:', error);
    }
  };
  
  

}


const cardStyle = {
    margin: "20px", // Adjust the margin as needed
    width: "30%",
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
          - Subir volumen
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          - Bajar volumen
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          - Pantalla completa
        </Typography>
      </CardContent>
    </React.Fragment>
)

function TutorialReact() {
    return (
        <div>
            <Dashboard />
            <YoutubeEmbed embedId="wGxDfSWC4Ww"/>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" style={cardStyle}>{card}</Card>
            </Box>
            <Comandos />
        </div>
    )
}

export default TutorialReact;