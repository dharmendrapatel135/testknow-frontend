import { getReq } from "../../utils/apiHandlers";

const CategoryList = () => {

    const handleGetExamList = async() => {
        const response = await getReq('/exam/');
    }
    return(
        <div>

        </div>
    )
}

export default CategoryList;