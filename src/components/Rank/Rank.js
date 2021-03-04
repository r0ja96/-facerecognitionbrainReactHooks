import './Rank.css';

const Rank = ({name,entries}) => {
    return(
        <div>
            <p>{name}, Your cuurent rank is ...</p>
            <p>{entries}</p>
        </div>
    );
}

export default Rank;