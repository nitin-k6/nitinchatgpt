import React, { useState, useRef } from 'react';
import './App.css';
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import homeIcon from "./assets/home.svg";
import savedIcon from "./assets/bookmark.svg";
import rocketIcon from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCEYOkQN5xmbpmZB8TFiXP07HUGZoEI7Zo",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    setQuestion(""); // Clearing input field after generating answer
  }

  // Function to handle file upload
  async function handleFileUpload(e) {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  // Function to trigger file input
  function handleUploadClick() {
    fileInputRef.current.click();
  }

  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} alt='Logo' className='logo' />
            <span className='brandname'>ChatGPT</span>
            <a href="#" onClick={handleUploadClick}>
              <img src={userIcon} alt='User' className='userIcon' />
            </a>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
          <button className='midbtn'>
            <img src={addBtn} alt='new Chat' className='addBtn' />
            New Chat
          </button>
          <div className='upperSideBottom'>
            <button className='queryBtn'>
              <img alt='Query' src={msgIcon} />What is GPU ?
            </button>
            <button className='queryBtn'>
              <img alt='Query' src={msgIcon} />What is Natural Language Processing ?
            </button>
          </div>
        </div>

        <div className='lowerSide'>
          <div className='listItem'>
            <img src={homeIcon} alt='Home' className='listItemImg' />
            Home
          </div>
          <div className='listItem'>
            <img src={savedIcon} alt='Saved' className='listItemImg' />
            Saved
          </div>
          <div className='listItem'>
            <img src={rocketIcon} alt='Upgrade' className='listItemImg' />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className='main'>
        <div className='chats'>
          <div className='chat bot'>
            <img src={gptImgLogo} alt='' className='chatImg' />
            <p className='text'>{answer}</p>
          </div>
        </div>
        <div className='chatholder'>
          <div className='inp'>
            <button>🔗</button>
            <input
              type='file'
              onChange={handleFileUpload}
            />
            <input
              type='text'
              placeholder='Send a message...'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={generatingAnswer}
            />
            <button className='sendMsg' onClick={generateAnswer}>
              <img src={sendBtn} alt='Send' />
            </button>
          </div>
        </div>
        <p className="disclaimer">ChatGPT may produce inappropriate information about people, places, or facts. ChatGPT August 20 Version</p>
      </div>
    </div>
  );
}
export default App;
