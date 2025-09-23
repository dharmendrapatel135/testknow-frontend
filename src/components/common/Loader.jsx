import { ClipLoader } from "react-spinners"



const CircleLoader = ({size = 20}) => {
    return(
        <div className="text-center">
         <ClipLoader  size={size} />
      </div>
    )
}

export default CircleLoader;