


const Paper = ({children, style}) => {

    return(
        <div className="shadow-lg p-3 my-2 bg-white rounded-1 " style={style}>
            {children}
        </div>
    )
}

export default Paper;