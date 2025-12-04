


const Paper = ({children, style}) => {

    return(
        <div className="shadow p-3 my-2 rounded-2 " style={style}>
            {children}
        </div>
    )
}

export default Paper;