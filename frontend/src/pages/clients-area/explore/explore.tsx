import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActivateIconButton from "../../../components/button/activate/activate-icon-button";
import DeleteIconButton from "../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../components/button/edit/edit-icon-button";
import { ClientsHeaderNav } from "../../../components/header/clients/clients-header";
import CircularLoader from "../../../components/loader/circular_loader";
import Pagination from "../../../components/pagination/pagination";
import MusicModel from "../../../models/music";
import { inactivateMusic, listMusics } from "../../../services/music_service";
import { insertMusic, removeMusic } from "../../../services/playlist_service";
import './explore.css'

function ClientExploreMusicPage() {
    const location = useLocation();
    const [fetch, setFetch] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageChanged, setPageChanged] = useState<boolean>(true);
    const [lastPage, setLastPage] = useState<number>(1);
    const [pageOptions, setPageOptions] = useState<number[]>([1]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [playlist, setPlaylist] = useState<string[]>([]);
    const [musics, setMusics] = useState<MusicModel[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate("/");
        }

        if (fetch) {
            setPlaylist(location.state as string[]);
            setFetch(false);
        }

        if (!loading && pageChanged) {
            loadMusics();
        }
    }, [fetch, loading, pageChanged]);


    function pageForward(): void {
        if (currentPage < lastPage) {
            if (pageOptions[pageOptions.length - 1] < lastPage) {
                const options = pageOptions;
                options.push(pageOptions[pageOptions.length - 1] + 1);
                options.shift();
                setPageOptions(options);
            }
            
            setPageChanged(true);
            setCurrentPage(currentPage + 1);
        }
    }
    
    function pageBackward(): void {
        if (currentPage > 1) {
            if (pageOptions[0] > 1) {
                const options = pageOptions;
                options.unshift(pageOptions[0] - 1);
                options.pop();
                setPageOptions(options);
            }

            setPageChanged(true);
            setCurrentPage(currentPage - 1);
        }
    }

    function selectPage(page: number): void {
        setCurrentPage(page);
        setPageChanged(true);
    }

    async function removeFromPlaylist(music: MusicModel): Promise<void> {
        const response = await removeMusic(music.id);

        if (response.inserted) {
            setPlaylist(playlist.filter(id => id !== music.id));
        }

        setPageChanged(true);
    }

    async function addToPlaylist(music: MusicModel): Promise<void> {
        const response = await insertMusic(music.id);

        if (response.inserted) {
            playlist.push(music.id);
            setPlaylist(playlist);
        }

        setPageChanged(true);
    }

    function filterMusics(): MusicModel[] {
        if (musics.length === 0) {
            return [];
        }
        else {
            const filtered: MusicModel[] = [];
            
            musics.forEach((music: MusicModel, _index: number) => {
                if (
                    music.name.toLowerCase().includes(nameFilter.toLowerCase())
                ) {
                    filtered.push(music);
                }
            })
    
            return filtered;
        }
        
    }
    
    async function loadMusics(): Promise<void> {
        setLoading(true);
        const response = await listMusics(currentPage);
        
        setLastPage(response.maxPages);
        setMusics(response.data);
        
        const options = [];
        
        for (let index = 0; index < 5; index++) {
            if (index < lastPage) {
                options.push(index + 1);
            }
        }
        
        setPageOptions(options);
        setLoading(false);
        setPageChanged(false);
    }

    return (
        <div className="adminMusics">
            <ClientsHeaderNav />
            <div className="adminMusicsBody">
                <div className="adminMusicsCard">
                    <div id="adminMusicsHeader">
                        <h1>Explore Musics</h1>
                    </div>

                    {
                        loading
                            ? <CircularLoader />
                            : (
                                <div className="musicsTable">
                                    <table style={{width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="clientsActionColumn"></td>
                                                <td
                                                    style={{paddingLeft: '10px', paddingRight: '10px'}}
                                                >
                                                    <input
                                                        style={{width: '100%', boxSizing: 'border-box', lineHeight:'22px'}}
                                                        placeholder='Filter'
                                                        onChange={e => {
                                                            setNameFilter(e.target.value);
                                                            filterMusics();
                                                        }}
                                                    />
                                                </td>
                                            </tr>

                                            {

                                                filterMusics().length === 0
                                                    ? (
                                                        <tr>
                                                            <td colSpan={5} style={{textAlign: 'start', paddingLeft: '10px'}}>
                                                                No results found
                                                            </td>
                                                        </tr>
                                                    )
                                                    : filterMusics().map((music: MusicModel) => {
                                                        return (
                                                            <tr>
                                                                <td className="musicsActionColumn">
                                                                    {
                                                                        playlist.includes(music.id)
                                                                            ? <DeleteIconButton size={40} onClick={() => removeFromPlaylist(music)}/>
                                                                            : <ActivateIconButton size={40} onClick={() => addToPlaylist(music)}/>
                                                                    }
                                                                </td>
                                                                <td>{ music.name }</td>
                                                            </tr>
                                                        );
                                                    })
                                            }
                                            
                                        </tbody>
                                    </table>
                                    <Pagination
                                        current={currentPage}
                                        options={pageOptions}
                                        pageBackward={pageBackward}
                                        pageForward={pageForward}
                                        onSelect={selectPage}
                                    />
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default ClientExploreMusicPage;