import React from 'react';
import { useSelector } from 'react-redux';
import DisplayText from '../Components/DisplayText';

const LoadingScreen = () => {
  const isLoading = useSelector(state => state.loadingReducer);

  if (isLoading) {
    return <div className='loadingScr'>
    <div className='ll'> </div>
    <div className='lr'> </div>
    <DisplayText text="O.AV Examination Portal..."/>
    </div>; // Replace with your desired loading screen content
  }

  return null;
};

export default LoadingScreen;
