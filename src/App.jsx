import React, { useState } from 'react';
import { FaBone, FaSmile, FaPizzaSlice, FaWeight } from 'react-icons/fa';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState(null);

  const calculateBMI = () => {
    // 🛑 Check for empty inputs BEFORE parsing
    if (!age || !height || !weight) {
      setBmi(null);
      setCategory('');
      setMessage('👀 Um... did you forget to type something?');
      setEmoji(null);
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (isNaN(h) || isNaN(w) || isNaN(a) || h <= 0 || w <= 0 || a <= 0) {
      setBmi(null);
      setCategory('');
      setMessage("🤖 These numbers seem... *suspicious*. Try again?");
      setEmoji(null);
      return;
    }

    if (h < 20 || h > 100 || w < 10 || w > 300 || a < 5 || a > 120) {
      setBmi(null);
      setCategory('');
      setMessage("🤖 These numbers seem... *suspicious*. Try again?");
      setEmoji(null);
      return;
    }

    const heightInMeters = h * 0.0254;
    const b = w / (heightInMeters * heightInMeters);
    const result = b.toFixed(1);
    setBmi(result);

    if (b < 18.5) {
      setCategory('🦴 Underweight');
      setMessage("*underweight*. A little more nutrition could help you glow more 🌟");
      setEmoji(<FaBone className="text-gray-500 text-3xl animate-bounce" />);
    } else if (b >= 18.5 && b <= 24.9) {
      setCategory('💪 Fit & Fabulous');
      setMessage("*perfectly healthy*! Keep it up, champ 🥗🔥");
      setEmoji(<FaSmile className="text-green-500 text-3xl animate-bounce" />);
    } else if (b >= 25 && b <= 29.9) {
      setCategory('🍕 Overweight-ish');
      setMessage("*slightly overweight*. Time to mix yoga with your pizza cravings 🍕🧘");
      setEmoji(<FaPizzaSlice className="text-orange-500 text-3xl animate-bounce" />);
    } else {
      setCategory('🎯 Obese, but still lovable');
      setMessage("*obese*. Let's work on loving yourself while eating cleaner too 💖");
      setEmoji(<FaWeight className="text-red-500 text-3xl animate-bounce" />);
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setBmi(null);
    setCategory('');
    setMessage('');
    setEmoji(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 px-4 font-[Comic Sans MS,cursive]">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 border-4 border-dashed border-purple-300">
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-4">BMI Calculator</h1>
        <p className="text-sm text-gray-600 italic text-center mb-6">A fun way to check your balance between fries and fitness 🍟🏋️</p>

        <div className="space-y-5">
          <input
            type="number"
            placeholder="Enter Age (years)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <input
            type="number"
            placeholder="Enter Height (inches) 📏"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <input
            type="number"
            placeholder="Enter Weight (kg) 🏋️"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={calculateBMI}
            className="w-1/2 bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Let’s Do Math ✨
          </button>
          <button
            onClick={resetForm}
            className="w-1/2 ml-3 bg-gray-200 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-300 transition"
          >
            Clear Chaos 🧹
          </button>
        </div>

        {(bmi || message) && (
          <div className="mt-8 text-center">
            {bmi && (
              <h2 className="text-3xl font-bold text-purple-700">🎯 BMI: {bmi}</h2>
            )}
            <p className="text-xl mt-3 text-gray-700 flex justify-center items-center gap-2">
              {category} {emoji}
            </p>
            <p className="text-md italic text-pink-600 mt-3">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
