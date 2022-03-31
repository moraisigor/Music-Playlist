import './logo-sound-wave.css';

interface LogoStyle {
  dark: boolean;
}

function SoundWaveLogo(props: LogoStyle) {
  return (
    <div className='soundWave'>
      <div className='wave smallWave' style={{marginRight: '15px'}}/>
      <div className='wave mediumWave' style={{marginRight: '15px'}}/>
      <div className='wave largeWave' style={{marginRight: '15px'}}/>
      <div className='wave mediumWave' style={{marginRight: '15px', backgroundColor: props.dark ? '#25344D' : '#E5E5E5'}}/>
      <div className='wave smallWave' style={{backgroundColor: props.dark ? '#25344D' : '#E5E5E5'}}/>
    </div>
  );
}

export default SoundWaveLogo;
