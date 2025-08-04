// src/App.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import * as THREE from 'three';
import './App.css';
import 'tailwindcss/tailwind.css';

ChartJS.register(LineElement, PointElement, LinearScale, Title);

// کامپوننت شبکه کوانتومی سه‌بعدی
const QuantumNetwork = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('quantum-canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const nodes = [];

    // ایجاد نقاط شبکه کوانتومی
    for (let i = 0; i < 50; i++) {
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      scene.add(node);
      nodes.push(node);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      nodes.forEach(node => {
        node.position.x += (Math.random() - 0.5) * 0.01;
        node.position.y += (Math.random() - 0.5) * 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <canvas id="quantum-canvas" className="absolute top-0 left-0 w-full h-full" />;
};

// کامپوننت اعلان‌های زنده
const LiveNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const addNotification = () => {
      const users = ['CryptoKing', 'MoonTrader', 'QuantumWhale'];
      const amounts = [1.5, 3.2, 0.8];
      const newNotification = `${users[Math.floor(Math.random() * users.length)]} just earned ${
        amounts[Math.floor(Math.random() * amounts.length)]
      } ETH!`;
      setNotifications(prev => [...prev.slice(-4), newNotification]);
    };

    const interval = setInterval(addNotification, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 right-10 space-y-2">
      {notifications.map((note, index) => (
        <motion.div
          key={index}
          className="bg-green-500 text-white p-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {note}
        </motion.div>
      ))}
    </div>
  );
};

// کامپوننت نمودار سود
const ProfitChart = () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Profit (ETH)',
        data: [0.5, 1.2, 2.8, 5.0, 10.0], // داده‌های جعلی
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <Line data={data} />
    </div>
  );
};

// صفحه اصلی
const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <QuantumNetwork />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          className="text-6xl font-bold text-green-400 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Quantum Yield
        </motion.h1>
        <p className="text-xl mb-8 text-center max-w-md">
          Unlock the Future of Wealth with Quantum-Powered Crypto Trading
        </p>
        <motion.button
          className="bg-green-500 text-black px-6 py-3 rounded-full font-bold hover:bg-green-400 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Start Earning Now
        </motion.button>
      </div>
      <LiveNotification />
    </div>
  );
};

// داشبورد کاربر
const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [level, setLevel] = useState('Quantum Starter');

  useEffect(() => {
    // شبیه‌سازی رشد جعلی موجودی
    const interval = setInterval(() => {
      setBalance(prev => prev + Math.random() * 0.1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-400 mb-6">Your Quantum Dashboard</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-2">Balance</h3>
            <p className="text-3xl text-green-400">{balance.toFixed(2)} ETH</p>
            <p className="text-sm text-gray-400">+{Math.random().toFixed(2)}% Today</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-2">Level</h3>
            <p className="text-2xl text-purple-400">{level}</p>
            <p className="text-sm text-gray-400">Invite 5 friends to unlock Quantum Elite!</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl mb-4">Profit Growth</h3>
          <ProfitChart />
        </div>
        <motion.button
          className="mt-6 bg-green-500 text-black px-6 py-3 rounded-full font-bold hover:bg-green-400 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Deposit More ETH
        </motion.button>
      </div>
    </div>
  );
};

// کامپوننت اصلی
const App = () => {
  return (
    <div>
      <HomePage />
      {/* داشبورد بعد از لاگین نمایش داده می‌شه */}
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
