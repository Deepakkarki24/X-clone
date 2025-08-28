import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from "../services/api";

let initialState = {
  profile_image: "",
  cover_image: "",
  name: "",
  bio: "",
  location: "",
};

const Modal = ({ setModalState }) => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.profile_image)
      data.append("profile_image", formData.profile_image);
    if (formData.cover_image) data.append("cover_image", formData.cover_image);
    if (formData.name) data.append("name", formData.name);
    if (formData.bio) data.append("bio", formData.bio);
    if (formData.location) data.append("location", formData.location);

    api
      .post("/edit-profile", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setFormData(initialState);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="modal relative">
      <div className="flex justify-center overflow-y-auto items-center text-white rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-[500px] w-1/2 bg-black">
        <div className="inner w-full">
          <div className="w-full">
            <FaXmark
              onClick={() => setModalState(false)}
              className="cursor-pointer absolute top-5 right-5 text-white"
            />
          </div>
          <form onSubmit={(e) => handleMediaSubmit(e)}>
            <div className="flex flex-col p-5 mt-20 mb-5 gap-2 w-full">
              <label className="text-blue-500 text-sm">Cover image</label>
              <input
                className="text-black p-1 bg-white cursor-pointer border-black border-2 mb-2 rounded-md"
                type="file"
                name="cover_image"
                onChange={(e) =>
                  setFormData({ ...formData, cover_image: e.target.files[0] })
                }
              />
              <label className="text-blue-500 text-sm">Profile image</label>
              <input
                className="text-black p-1 bg-white cursor-pointer border-black border-2 mb-2 rounded-md"
                type="file"
                name="profile_image"
                onChange={(e) =>
                  setFormData({ ...formData, profile_image: e.target.files[0] })
                }
              />
              <label className="text-blue-500 text-sm">Name</label>
              <input
                className="text-zinc-200 w-full outline-none bg-transparent border-zinc-600 border px-2 py-3 mb-2 rounded-md"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <label className="text-blue-500 text-sm">Bio</label>
              <input
                className="text-zinc-200 w-full outline-none bg-transparent border-zinc-600 border px-2 py-3 mb-2 rounded-md"
                type="text"
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
              />
              <label className="text-blue-500 text-sm">Location</label>
              <input
                className="text-zinc-200 w-full outline-none bg-transparent border-zinc-600 border px-2 py-3 mb-2 rounded-md"
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />
              <button
                className="bg-white cursor-pointer w-2/10 px-3 py-2 font-semibold text-black rounded-full"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
