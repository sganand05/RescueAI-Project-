import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Stats from '../components/Stats';

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
    </div>
  );
}

export default Home;