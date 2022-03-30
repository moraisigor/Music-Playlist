import './logo-sound-wave.css';

function SoundWaveLogo() {
  return (
    <div className='soundWave'>
      <div className='wave smallWave' style={{marginRight: '15px'}}/>
      <div className='wave mediumWave' style={{marginRight: '15px'}}/>
      <div className='wave largeWave' style={{marginRight: '15px'}}/>
      <div className='wave mediumWave' style={{marginRight: '15px'}}/>
      <div className='wave smallWave' />
    </div>
  );
}

export default SoundWaveLogo;
