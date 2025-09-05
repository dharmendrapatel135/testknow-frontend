import { useEffect, useState } from "react";
import { getReq } from "@utils/apiHandlers";
import { useParams } from "react-router-dom";

 
const SectionInfo = ({sectionList}) => {

    return(
        <div>
            <table>
             <thead>
                <th>Name</th>
                <th>Question</th>
                <th>Time</th>
             </thead>
             <tbody>
                {sectionList.map((item) => {
                    return(
                <tr key={item.id}>
                    <td>{item.section_name}</td>
                    <td>{item.total_question}</td>
                    <td>{item.duration}</td>
                </tr>
                    )
                })
                }
             </tbody>
            </table> 
        </div>
    )
}

export default SectionInfo;