import './styles.css';

export const TextInput = ({searchValue, handleChange }) => {
    return(
        <input className="text-input" placeholder='Type your saerch' type="search" onChange={handleChange} value={searchValue} />
    )
}