// DisguisePlayer.js
import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import PlayerSelector from './PlayerSelector';
const DisguisePlayer = ({ player, onDisguise, onEncryptionDecision}) => {
  const canvasRef = useRef(null);
  const disguisedImageCanvasRef = useRef(null);

  useEffect(() => {
    if (player) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = player.src;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [player]);
  



  // const [disguiseType, setDisguiseType] = useState('');
  const [disguiseType, setDisguiseType] = useState([]);

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [savedPassword, setSavedPassword] = useState('');
  const [showMainContainer, setShowMainContainer] = useState(true);

  
  const [showEncryptionPrompt, setShowEncryptionPrompt] = useState(true);



  const players = [ 
    { name: 'Player 1', src: 'images/personel/1.jpg'},
    { name: 'Player 2', src: 'images/personel/1 (2).jpg' },
    { name: 'Player 3', src: 'images/personel/2 (2).jpg' },
    { name: 'Player 4', src: 'images/personel/3.jpg' }, 
    { name: 'Player 5', src: 'images/personel/4.jpg' }, 
    { name: 'Player 6', src: 'images/personel/4 (2).jpg' } 
  ];

  const applyDisguise = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = player.src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      disguiseType.forEach((effect) => {
        if (effect === 'blur') {
          ctx.filter = 'blur(10px)';
          ctx.drawImage(canvas, 0, 0);
          ctx.filter = 'none'; // reset filter
        } else if (effect === 'scribble') {
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(canvas.width, canvas.height);
          ctx.moveTo(canvas.width, 0);
          ctx.lineTo(0, canvas.height);
          ctx.stroke();
        } else if (effect === 'fullColor') {
          ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (effect === 'gaussianblur') {
          const width = canvas.width;
          const height = canvas.height;
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;
          const kernel = [
            [1, 4, 7, 4, 1],
            [4, 16, 26, 16, 4],
            [7, 26, 41, 26, 7],
            [4, 16, 26, 16, 4],
            [1, 4, 7, 4, 1],
          ];
          const kernelSize = 5;
          const kernelSum = 273;
  
          const applyKernel = (x, y) => {
            let r = 0, g = 0, b = 0;
            for (let ky = 0; ky < kernelSize; ky++) {
              for (let kx = 0; kx < kernelSize; kx++) {
                const px = (x + kx - 2) * 4;
                const py = (y + ky - 2) * width * 4;
                const weight = kernel[ky][kx];
                r += data[px + py] * weight;
                g += data[px + py + 1] * weight;
                b += data[px + py + 2] * weight;
              }
            }
            return [r / kernelSum, g / kernelSum, b / kernelSum];
          };
  
          for (let y = 2; y < height - 2; y++) {
            for (let x = 2; x < width - 2; x++) {
              const [r, g, b] = applyKernel(x, y);
              const index = (x + y * width) * 4;
              data[index] = r;
              data[index + 1] = g;
              data[index + 2] = b;
            }
          }
          ctx.putImageData(imageData, 0, 0);
        }
      });
    };
  };
  

  const handleDisguiseChange = (event) => {
    const value = event.target.value;
    if (disguiseType.includes(value)) {
      setDisguiseType(disguiseType.filter((effect) => effect !== value));
    } else if (disguiseType.length < 2) {
      setDisguiseType([...disguiseType, value]);
    } else {
      alert("You can only select up to 2 effects.");
    }
  };
  

  const handleMoreInfoToggle = () => { setShowMoreInfo(!showMoreInfo); };


  // const handleCrackPassword = () => {
  //   const userInput = prompt('Enter something to crack the password:');
  //   if (userInput) {
  //     setSavedPassword(userInput);
  //     alert('Password saved for later.');
  //   }
  // };


  const handleSubmit = () => { 
    const disguisedImageCanvas = disguisedImageCanvasRef.current;
    const disguisedImageContext = disguisedImageCanvas.getContext('2d');
    const img = new Image();
    img.src = player.src;
    disguisedImageCanvas.width = img.width;
    disguisedImageCanvas.height = img.height;
    disguisedImageContext.drawImage(canvasRef.current, 0, 0);
    setShowMainContainer(false);
    // const disguisedImage = canvasRef.current.toDataURL();
    // onDisguise(disguisedImage); 
    
    // window.open(disguisedImage, '_blank'); 
  };

  // handleSelection = () => {

  // }

  return (
    <div className="container">
      <div style={{ display: showMainContainer ? 'block' : 'none' }}>
        <h2>Disguise Player</h2>
        <canvas ref={canvasRef} className="image"></canvas>
        <div className="input-container">
          <label>
            <input
              type="checkbox"
              value="blur"
              checked={disguiseType.includes('blur') }
              onChange={handleDisguiseChange}
            />
            Blur Face
          </label>
          <label>
            <input
              type="checkbox"
              value="gaussianblur"
              checked={disguiseType.includes('gaussianblur')  }
              onChange={handleDisguiseChange}
            />
            Gaussian Blur Face
          </label>
          <label>
            <input
              type="checkbox"
              value="scribble"
              checked={disguiseType.includes('scribble') }
              onChange={handleDisguiseChange}
            />
            Scribble
          </label>
          <label>
            <input
              type="checkbox"
              value="fullColor"
              checked={disguiseType.includes('fullColor') }
              onChange={handleDisguiseChange}
            />
            Full Color Modification
          </label>
        </div>
        <button onClick={applyDisguise}>Apply Disguise</button>
        <button onClick={handleSubmit}>Submit</button>

        {/* we do not need this here  */}
       {/* <button className="crack" onClick={handleCrackPassword}>Crack Password</button> */}
      
          <button onClick={handleMoreInfoToggle}>More Info</button>
          {showMoreInfo && (
            <div>
              {disguiseType === 'blur' && <p>Gaussian Blur: This filter applies a blur effect to the entire image, making it less recognizable.</p>}
              {disguiseType === 'scribble' && <p>Scribble: This option adds random scribbles over the image to obscure the details.</p>}
              {disguiseType === 'fullColor' && <p>Full Color Modification: This option changes the color of the entire image, making it look completely different.</p>}
            </div>
          )}
      </div>
      <div style={{ display: showMainContainer ? 'none' : 'block' }}>
        {/* <div>Choose wisely! You can only try to undo 1 effect</div> */}
        <div>
          <canvas ref={disguisedImageCanvasRef} className="image" id="disguisedImageCanvas" ></canvas>


          {/* <div style={{display: "flex", justifyContent: "center"}}>
            {players.map((player, idx) => {
              return (<div index={idx} style={{ display: "flex", }}>
                  <img src={player.src} width="100px" height="100px" style={{cursor: "pointer"}} />
                </div>
              )})}
          </div> */}
          {showEncryptionPrompt && (
        <div>
                <p className='password_header' >🔐 Do you want to encrypt your disguise with a password?</p>
                <button  className="encrypt_btn" onClick={() => onEncryptionDecision(true)}>Yes</button>
                  <button  className="encrypt_btn" onClick={() => onEncryptionDecision(false)}>No</button>
                </div>
                                )}  
        </div>
      </div>
    </div>
  );
};

export default DisguisePlayer;