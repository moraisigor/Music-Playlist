import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayIconButton from "../../../components/button/play/play-icon-button";
import StopIconButton from "../../../components/button/stop/stop-icon-button";
import { ClientsHeaderNav } from "../../../components/header/clients/clients-header";
import CircularLoader from "../../../components/loader/circular_loader";
import MusicModel from "../../../models/music";
import './clients-home.css'

function ClientsHomePage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [musicPercentage, setMusicPercentage] = useState<number>(0);
    const [musicPlayingIndex, setMusicPlayingIndex] = useState<number>(0);
    const [musics, setMusics] = useState<MusicModel[]>([
        new MusicModel('', 'name'),
        new MusicModel('', 'name2'),
        new MusicModel('', 'name3'),
    ]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (playing) {
            if (musicPercentage >= 100) {
                if (musicPlayingIndex === (musics.length - 1)) {
                    setMusicPlayingIndex(0);
                    setPlaying(false);
                    setMusicPercentage(0);
                } else {
                    setMusicPlayingIndex(musicPlayingIndex + 1);
                    setMusicPercentage(0);
                }
            }
            else {
                setMusicPercentage(musicPercentage + 0.01);
            }
        }
    }, [playing, musicPercentage]);

    function playMusic(index: number) {
        if (musicPlayingIndex !== index) {
            setMusicPlayingIndex(index);
            setMusicPercentage(0);
            setPlaying(true);
        }

        setPlaying(true);
    }
    
    async function loadMusics(): Promise<void> {

    }

    return (
        <div className="adminPlans">
            <ClientsHeaderNav />
            <div className="adminPlansBody" style={{zIndex: '0'}}>
                <div className="adminPlansCard">
                    <div id="adminPlansHeader">
                        <h1>Your musics</h1>

                        {
                            playing
                                ? <StopIconButton size={60} onClick={() => setPlaying(false)} />
                                : <PlayIconButton size={60} onClick={() => setPlaying(true)} />
                        }
                        
                    </div>

                    {
                        loading
                            ? <CircularLoader />
                            : (
                                <div className="plansTable">
                                    <table style={{width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                musics.length === 0
                                                    ? (
                                                        <tr>
                                                            <td colSpan={2} style={{textAlign: 'start', paddingLeft: '10px'}}>
                                                                No results found
                                                            </td>
                                                        </tr>
                                                    )
                                                    : musics.map((music: MusicModel, index: number) => {
                                                        return (
                                                            <tr style={{backgroundColor: musicPlayingIndex === index ? '#7DAFFF' : 'white'}}>
                                                                <td className="musicsActionColumn">
                                                                    {
                                                                        playing
                                                                            ? musicPlayingIndex == index
                                                                                ? <FontAwesomeIcon className="tableActionIcon" icon={faPause} onClick={() => setPlaying(false)}/>
                                                                                : null
                                                                            : <FontAwesomeIcon className="tableActionIcon" icon={faPlay} onClick={() => playMusic(index)} />
                                                                    }
                                                                </td>
                                                                <td>{ music.name }</td>
                                                            </tr>
                                                        );
                                                    })
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }

                </div>
            </div>
            <div className="playFooter">
                {
                    playing
                        ? <StopIconButton size={40} onClick={() => setPlaying(false)} />
                        : <PlayIconButton size={40} onClick={() => setPlaying(true)} />
                }

                <div className="musicBar">
                    <div className="musicActiveBar" style={{width: `${musicPercentage}%`}} />
                </div>
            </div>
        </div>
    )
}

export default ClientsHomePage;