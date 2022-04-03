import './pagination.css';

interface PaginationProps {
    onSelect: (page: number) => void;
    pageForward: () => void;
    pageBackward: () => void;
    options: number[];
    current: number;
}

export default function Pagination(props: PaginationProps) {
    return (
        <div className="pagination">
            <div className='paginationContainer' >
                <ul className="paginationMenu">
                    <li onClick={props.pageBackward}>
                        <span>{'<'}</span>
                    </li>

                    {
                        props.options.map((page: number) => {
                            if (page === props.current) {
                                return (
                                    <li className="currentPage">
                                        <span>{props.current}</span>
                                    </li>
                                );
                            }
                            
                            return (
                                <li onClick={() => props.onSelect(page)}>
                                    <span>{page}</span>
                                </li>
                            );
                        })
                    }

                    <li onClick={props.pageForward}>
                        <span>{'>'}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}