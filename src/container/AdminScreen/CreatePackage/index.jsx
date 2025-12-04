import { useState } from "react";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "../../../components/DashboardTemplate";

const initialState = {
    name:"",
    categories:"",
    tests:""
}

const CreatePackage = () => {
     const [form, setForm] = useState(initialState);

     
    
    return(
        <DashboardTemplate>
             <Paper>
                <div>
                <div>
                    <h1>Package</h1>
                </div>
                <div>
                   <div>
                    <p>Package Name</p>
                    <input type="text" name="name" className="input" />
                   </div>
                   <div>
                    <p>Categories</p>
                    <input type="text" />
                   </div>
                   <div>
                    <p>Tests</p>
                    <input type="text" />
                   </div>
                   <div>
                    <p>Description</p>
                    <textarea className="input" />
                   </div>
                </div>
                </div>
             </Paper>
        </DashboardTemplate>
    )
}

export default CreatePackage;