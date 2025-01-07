// DisguisePlayer.js
import React, { useRef, useState } from 'react';

const DisguisePlayer = ({ player, onDisguise }) => {
  const canvasRef = useRef(null);
  const [disguiseType, setDisguiseType] = useState('');

  const applyDisguise = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = player.src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (disguiseType === 'blur') {
        ctx.filter = 'blur(10px)';
        ctx.drawImage(img, 0, 0);
      } else if (disguiseType === 'scribble') {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
      } else if (disguiseType === 'fullColor') {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
  };

  const handleDisguiseChange = (event) => {
    setDisguiseType(event.target.value);
  };

  const handleSubmit = () => {
    onDisguise(canvasRef.current.toDataURL());
  };

  return (
    <div>
      <h2>Disguise Player</h2>
      <canvas ref={canvasRef}></canvas>
      <div>
        <label>
          <input
            type="radio"
            value="blur"
            checked={disguiseType === 'blur'}
            onChange={handleDisguiseChange}
          />
          Blur Face
        </label>
        <label>
          <input
            type="radio"
            value="scribble"
            checked={disguiseType === 'scribble'}
            onChange={handleDisguiseChange}
          />
          Scribble
        </label>
        <label>
          <input
            type="radio"
            value="fullColor"
            checked={disguiseType === 'fullColor'}
            onChange={handleDisguiseChange}
          />
          Full Color Modification
        </label>
      </div>
      <button onClick={applyDisguise}>Apply Disguise</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DisguisePlayer;
