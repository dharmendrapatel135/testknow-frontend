import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/FormElements/Button";
import { patchReq, postApiReq } from "../../../../utils/apiHandlers";
import { reactIcons } from "../../../../utils/icons";

const initialState = {
  category: "",
  type: "",
  image: "",
};

const CreateCategoryModal = ({
  open,
  setOpen,
  handleReload,
  category,
  setCategory,
}) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("category", form.category);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      setIsLoading(!isLoading);
      const response = await (category
        ? patchReq(`/category/${category.id}/`, formData)
        : postApiReq(`/category/`, formData));
      setIsLoading(!isLoading);
      if (response.status) {
        toast.success("Category has been successfully created!");
        setOpen(false);
        handleReload();
        setForm(initialState);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setForm((prev) => ({
        ...prev,
        type: category.type,
        category: category.category,
      }));
    }
  }, [category]);

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">{category ? "Update" : "Create"} Category</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                // setCode('');
                setCategory(null);
                setForm(initialState);
                setOpen(false);
              }}
            >
            {reactIcons.close}
            </span>
          </div>
        </div>
        <DialogContent>
          <div>
            <div>
              <p>Categroy Name</p>
              <input
                type="text"
                name="category"
                onChange={handleChange}
                value={form.category}
                className="input"
              />
            </div>
            <div>
              <p>Categroy Type</p>
              <input
                type="text"
                name="type"
                className="input"
                onChange={handleChange}
                value={form.type}
              />
            </div>
            <div>
              <p>Categrory Icon</p>
              <input
                type="file"
                className="input"
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, image: e.target.files[0] }));
                }}
                // value={form.image}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button
                name={category ? "Update" : "Create"}
                className={category ? "update-btn" : "create-btn"}
                handleClick={handleCreateCategory}
                isLoading={isLoading}
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateCategoryModal;
