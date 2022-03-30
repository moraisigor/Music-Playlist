import './loading-page.css';
import TextualLogo from '../../components/logo/textual/logo-textual';
import SoundWaveLogo from '../../components/logo/sound-wave/logo-sound-wave';

function LoadingPage() {
  return (
    <div className="loadingPage">
        <TextualLogo fontSize={60}></TextualLogo>
        <SoundWaveLogo></SoundWaveLogo>
    </div>
  );
}

export default LoadingPage;
