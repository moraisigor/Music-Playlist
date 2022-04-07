import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivateIconButton from "../../../components/button/activate/activate-icon-button";
import DeleteIconButton from "../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../components/button/edit/edit-icon-button";
import { ClientsHeaderNav } from "../../../components/header/clients/clients-header";
import CircularLoader from "../../../components/loader/circular_loader";
import Pagination from "../../../components/pagination/pagination";
import MusicModel from "../../../models/music";
import { inactivateMusic, listMusics } from "../../../services/music_service";
import './explore.css'

function ClientExploreMusicPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageChanged, setPageChanged] = useState<boolean>(true);
    const [lastPage, setLastPage] = useState<number>(1);
    const [pageOptions, setPageOptions] = useState<number[]>([1]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [planFilter, setPlanFilter] = useState<string>("");
    const [musics, setMusics] = useState<MusicModel[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && pageChanged) {
            loadMusics();
        }
    }, [loading, pageChanged]);


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

    async function deleteMusic(music: MusicModel): Promise<void> {
        await inactivateMusic(music.id);
        setPageChanged(true);
    }

    async function activateMusic(plan: MusicModel): Promise<void> {
        //await updateActiveMusic(plan.id, plan.parentId);
        setPageChanged(true);
    }

    function updatePage(music: MusicModel): void {
        navigate('edit', {replace: true, state: music});
    }

    function createPage(): void {
        navigate('new', {replace: true});
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
                                                                        music.active
                                                                            ? <DeleteIconButton size={40} onClick={() => deleteMusic(music)}/>
                                                                            : <ActivateIconButton size={40} onClick={() => activateMusic(music)}/>
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