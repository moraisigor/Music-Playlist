import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CircularLoader from '../../../components/loader/circular_loader';
import SoundWaveLogo from '../../../components/logo/sound-wave/logo-sound-wave';
import TextualLogo from '../../../components/logo/textual/logo-textual';
import { adminSignIn, clientSignIn } from '../../../services/authentication_service';
import './clients-sign-in-page.css';

function ClientsSignInPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/home', {replace: true});
    }
  }, [])

  async function signIn(): Promise<void> {
    setLoading(true);
    console.log(remember);

    clientSignIn(email, password)
      .then((response) => {
        sessionStorage.setItem('token', response!.token);
        sessionStorage.setItem('userId', response!.claims.sub);
        navigate('/home', {replace: true});
      })
      .catch(error => {
        setLoading(false);
      })
  }

  return (
    <div className='adminSignIn'>
        <header className='appHeader'>
            <TextualLogo fontSize={40}></TextualLogo>
        </header>
        <div className='adminSignInBody'>
            <div className='signInCard'>
                <SoundWaveLogo dark={true}/>
                <div className='formSignIn'>
                  <div className='formInput'>
                    <label htmlFor='emailAdminForm'>Email</label>
                    <input
                      id="emailAdminForm"
                      disabled={loading}
                      autoComplete="username"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className='formInput'>
                      <label htmlFor='passwordAdminForm'>Password</label>
                      <input
                        id="passwordAdminForm"
                        type="password"
                        disabled={loading}
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                      />
                  </div>
                  
                  {
                    loading
                      ? <CircularLoader />
                      : <button id='sendButton' type="button" onClick={signIn}>
                          ENVIAR
                        </button>
                  }

                  <a
                    href='https://github.com/ugiete/Music-Playlist'
                    target='_blank'
                    rel="noreferrer"
                  >
                    <h4>by Leonardo Ugiete</h4>
                  </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ClientsSignInPage;
