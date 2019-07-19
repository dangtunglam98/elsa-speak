import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider, MessageList , MessageGroup, Message, MessageText , FixedWrapper , TextComposer, Row, IconButton, EmojiIcon, SendButton, AddIcon, TextInput, MessageButtons, MessageButton } from '@livechat/ui-kit'
import { textInput } from './API_query';
import {ReactMic} from 'react-mic';
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
          borderRadius: '10px',
          textCenter: true,

      },
  
  },

  TextComposer: {
    css: {

    },
  },
}
class App extends Component {
  state = { userInput: '', userSentence: [], correctSentence: [], errorIdentify: [], record: false };

  startRecording = () => {
    this.setState({record: true})
  }

  stopRecording = () => {
    this.setState({record: false})
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  
  toggleIcon = (e) => {
    e.classList.toggle('fa fa-microphone-slash fa-lg')
  }

  updateInput = event => {
    console.log('event.target.value', event.target.value);
    this.setState({ userInput: event.target.value})
  };

  submitClicked = async () => {
    var [textOutput, errorCatch] = await textInput(this.state.userInput)
    // var errorCatch = [errorCatch]
    // console.log(erroListrCatch)
    var joinedInput = this.state.userSentence.concat(this.state.userInput);
    var joinedOutput = this.state.correctSentence.concat(textOutput.data.results.afterChange)
    var joinedError = this.state.errorIdentify.concat([errorCatch])
    // console.log(joinedOutput)
    this.setState({userSentence: joinedInput})
    this.setState({correctSentence : joinedOutput})
    this.setState({errorIdentify: joinedError})
    // console.log(this.state.errorIdentify)
  }

  render(){
  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: '80%', height: '100%'}}>
      <div style={{overflow: 'auto', height: '550px'}}>
        <MessageList active>
          <div className='col-lg-12' style={{ float: 'left' }}>
            <div className='col-lg-4' style={{ float: 'left' }}></div>
            <div className='col-lg-8' style={{ float: 'right', width: 'initial' }}>
              <MessageGroup isOwn={true}>
                <Message date="21:38" isOwn={true} authorName="Visitor" radiusType='single'>
                  <MessageText>
                    I love them
                    soooooooooooo
                    much!
                  </MessageText>
              </Message>
            </MessageGroup>  
            </div>
          </div>


        {
          this.state.userSentence.map((input, output) =>
          <div className='col-lg-12'>
            <div className='col-lg-12' style={{ float: 'left' }}>
            <div className='col-lg-4' style={{ float: 'left' }}></div>
              <div className='col-lg-8' style={{ float: 'right', width: 'initial' }}>
                <MessageGroup isOwn={true}>
                    <Message date="21:38" isOwn={true} authorName="Visitor" radiusType='single' fit>
                      <MessageText>
                        {input}
                      </MessageText>
                    </Message>
                  </MessageGroup> 
              </div>
            </div>
            
            <div className='col-lg-12' style={{ float: 'left' }}>
                <div className='col-lg-8' style= {{float: 'left', width:'initial'}}>
                  <MessageGroup>
                    <Message date="21:38" authorName="Bot" radiusType='single'>
                      <MessageText>
                        {this.state.correctSentence[output]}
                      </MessageText>
                      <MessageButtons> 
                      <MessageButton label='hello' />
                      {console.log(this.state.errorIdentify[output])}
                      </MessageButtons>
                    </Message>
                  </MessageGroup> 
                </div>
                <div className='col-lg-4' style={{ float: 'left' }}></div>
            </div>
            
          </div>
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
            <i onClick={this.startRecording} className="fa fa-microphone fa-lg"></i>
          </IconButton>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
          <IconButton>
          <i onClick={this.stopRecording} className="fa fa-microphone-slash fa-lg"></i>
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
