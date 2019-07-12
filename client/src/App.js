import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider, MessageList , MessageGroup, Message, MessageText , FixedWrapper , TextComposer, Row, IconButton, EmojiIcon, SendButton, AddIcon, TextInput } from '@livechat/ui-kit'

const theme = {
  vars: {
      'primary-color': '#427fe1',
      'secondary-color': '#fbfbfb',
      'tertiary-color': '#fff',
      'avatar-border-color': 'blue',
  },
  AgentBar: {
      Avatar: {
          size: '42px',
      },
      css: {
          backgroundColor: 'var(--secondary-color)',
          borderColor: 'var(--avatar-border-color)',
      }
  },
  Message: {
      css: {
          fontWeight: 'bold',
          backgroundColor: 'lightblue',
          borderRadius: '10px'

      },
  
  },

  TextComposer: {
    css: {

    },
  },
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: '80%', height: '100%'}}>
      <div style={{overflow: 'auto', height: '550px'}}>
        <MessageList active>
          <MessageGroup isOwn={true}>
          <Message date="21:38" isOwn={true} authorName="Visitor" radiusType='single'>
          <MessageText>
            I love them
            soooooooooooo
            much!
          </MessageText>
        </Message>
        </MessageGroup>


          <MessageGroup>
          <Message date="21:38"  authorName="Visitor" radiusType='single'>
          <MessageText>
            I love them
            soooooooooooo
            much!
          </MessageText>
        </Message>
        </MessageGroup>
        </MessageList>
      </div>
      <div style={{marginTop: '20px'}}>
      <TextComposer>
        <Row align="center">
          <IconButton fit>
            <AddIcon />
          </IconButton>
          <IconButton fit>
            <i class="fa fa-microphone fa-lg"></i>
          </IconButton>
          <TextInput fill />
          <SendButton fit />
        </Row>
      </TextComposer>
      </div>
      </div>
    </ThemeProvider>






    
  );
}

export default App;
