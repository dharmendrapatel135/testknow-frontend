import { useEffect, useState } from "react";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "../../../components/DashboardTemplate";
import { getReq, postApiReq, postReq } from "../../../utils/apiHandlers";
import Button from "../../../components/FormElements/Button";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  categories: "",
  tests: "",
  description: "",
};

const CreatePackage = () => {
  const [form, setForm] = useState(initialState);
  const [categoriesData, setCategoriesData] = useState([]);
  const [testsData, setTestsData] = useState([]);

  const handleGetCategoryList = async () => {
    try {
      const response = await getReq("/category/");
      if (response.status) {
        //   setIsDelLoading(false);
        setCategoriesData(response.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    handleGetCategoryList();
    handleGetTestList();
  }, []);

  const handleGetTestList = async () => {
    try {
      const response = await getReq(`/tests/`);
      if (response.status) {
        setTestsData(response.data.results || response.data);
      } else if (!response.status) {
      }
    } catch (err) {
      console.log("----------------", err);
    }
  };

  console.log("----------------categories data", categoriesData);

  const handleCreatePackage = async () => {
    const selectedCategories = categoriesData
      .filter((item) => item.selected)
      .map((item) => item.id);

    const selectedTests = testsData
      .filter((item) => item.selected)
      .map((item) => item.id);

    console.log("---------------form ", selectedCategories, selectedTests);
    const data = {
      name: form.name,
      categories: selectedCategories,
      tests: selectedTests,
      description:form.description,
    };
   
    try {
      const response = await postApiReq(`/packages/`, data);
      if(response.status){
        toast.success("Package has been created successfully!")
      }
    } catch (error) {

    }
  };

  return (
    <DashboardTemplate>
      <Paper>
        <div>
          <div>
            <h1>Package</h1>
          </div>
          <div>
            <div>
              <p className="py-2 text-lg font-semibold">Package Name</p>
              <input
                type="text"
                name="name"
                className="input"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="py-2 text-lg font-semibold">Categories</p>
              <div
                className="my-2 border-gray-200sss"
                style={{ height: "150px", overflow: "auto" }}
              >
                {categoriesData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        let categoryUpdate = [...categoriesData];
                        if (!item?.selected) {
                          categoryUpdate[index]["selected"] = true;
                        } else {
                          categoryUpdate[index]["selected"] = false;
                        }
                        setCategoriesData(categoryUpdate);
                        // let update = [...filterKeys];
                        // let itemIndex = update.findIndex(
                        //   (i) => i.name == title
                        // );

                        // handleSearchValue(item.name, update, itemIndex);
                      }}
                      className="hover-bg-change d-flex gap-2 px-2 cursor-pointer"
                    >
                      <input
                        readOnly
                        type="checkbox"
                        checked={item?.selected ? true : false}
                        className=""
                      />
                      <span className="mx-2">{item.category}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="py-2 text-lg font-semibold">Tests</p>
              <div
                className="my-2"
                style={{ height: "150px", overflow: "auto" }}
              >
                {testsData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        let testsUpdate = [...testsData];
                        if (!item?.selected) {
                          testsUpdate[index]["selected"] = true;
                        } else {
                          testsUpdate[index]["selected"] = false;
                        }
                        setTestsData(testsUpdate);
                        // let update = [...filterKeys];
                        // let itemIndex = update.findIndex(
                        //   (i) => i.name == title
                        // );

                        // handleSearchValue(item.name, update, itemIndex);
                      }}
                      className="hover-bg-change d-flex gap-2 px-2 cursor-pointer"
                    >
                      <input
                        readOnly
                        type="checkbox"
                        checked={item?.selected ? true : false}
                      />
                      <span className="mx-2">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="py-2 text-lg font-semibold">Description</p>
              <textarea className="input" />
            </div>
            <div className="my-2">
              <Button
                name={"Create"}
                className="create-btn"
                handleClick={() => handleCreatePackage()}
              />
            </div>
          </div>
        </div>
      </Paper>
    </DashboardTemplate>
  );
};

export default CreatePackage;
