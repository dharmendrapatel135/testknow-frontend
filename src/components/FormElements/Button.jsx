const Button = ({handleClick, name, isLoading, className}) => {
    return(
        <button  onClick={handleClick} className={className}>
          {name}
        </button>
    )
}

export default Button;