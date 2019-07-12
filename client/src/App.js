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
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: '80%', height: '100%' }}>
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
      <TextComposer >
        <Row align="center">
          <IconButton fit>
            <AddIcon />
          </IconButton>
          <TextInput fill />
          <SendButton fit />
        </Row>

        <Row verticalAlign="center" justify="right">
          <IconButton fit>
            <EmojiIcon />
          </IconButton>
        </Row>
      </TextComposer>
      </div>
    </ThemeProvider>






    
  );
}

export default App;
