interface Props {
    searches?: string[];
    onLabelClick: (term: string) => void;
}

export const PreviousSearches = ({ searches = [], onLabelClick }: Props) => {
    return (
        <div className="previous-searches">
            <h2>Búsquedas previas</h2>
            <ul className="previous-searches-list">
                {searches.map((element) => (
                    <li onClick={() => onLabelClick(element)} key={element}>
                        {element}
                    </li>
                ))}
            </ul>
        </div>
    );
};
