import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularLoader from '../../../components/loader/circular_loader';
import TextualLogo from '../../../components/logo/textual/logo-textual';
import { adminSignIn } from '../../../services/authentication_service';
import './admin-sign-in-page.css';

function AdminSignInPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('clients', {replace: true});
    }
  }, [])

  async function signIn(): Promise<void> {
    setLoading(true);
    console.log(remember);

    adminSignIn(email, password)
      .then((response) => {
        sessionStorage.setItem('token', response!.token);
        navigate('clients', {replace: true});
      })
      .catch(error => {
        setLoading(false);
      })
  }

  function goToClientSignIn() {
    navigate("/");
  }

  return (
    <div className='adminSignIn'>
        <header className='appHeader'>
            <TextualLogo fontSize={40}></TextualLogo>
        </header>
        <div className='adminSignInBody'>
            <div className='signInCard'>
                <h1>Admin Dashboard</h1>
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
                          SEND
                        </button>
                  }

                  <h4 onClick={goToClientSignIn} style={{cursor: 'pointer'}}>As client</h4>

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

export default AdminSignInPage;
