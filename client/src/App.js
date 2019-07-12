import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider, MessageList , MessageGroup, Message, MessageText , FixedWrapper , TextComposer, Row, IconButton, EmojiIcon, SendButton, AddIcon, TextInput } from '@livechat/ui-kit'
import { textInput } from './API_query';
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
class App extends Component {
  state = { userInput: '', userSentence: [], botSentence: []};
  
  updateInput = event => {
    console.log('event.target.value', event.target.value);
    this.setState({ userInput: event.target.value})
  };

  submitClicked = () => {
    textInput(this.state.userInput)
    var joinedInput = this.state.userSentence.concat(this.state.userInput);
    this.setState({userSentence: joinedInput})
  }


  render(){
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

        {
          this.state.userSentence.map((input) =>
            <MessageGroup isOwn={true}>
            <Message date="21:38" isOwn={true} authorName="Visitor" radiusType='single'>
            <MessageText>
              {input}
            </MessageText>
            </Message>
            </MessageGroup> 
          )
        }
        </MessageList>

      </div>
      
      <div style={{marginTop: '20px'}}>
      <TextComposer onChange={this.updateInput} onSend={this.submitClicked}>
        <Row align="center">
          <IconButton fit>
            <AddIcon />
          </IconButton>
          <IconButton fit>
            <i className="fa fa-microphone fa-lg"></i>
          </IconButton>
          <TextInput />
          <SendButton fit  />
        </Row>
      </TextComposer>
      </div>
      </div>
    </ThemeProvider>






    
  );
}
}
export default App;
