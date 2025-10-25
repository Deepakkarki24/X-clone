import React, { useContext, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { UserContext } from "../context/UserContext";

const Modal = ({ setModalState }) => {
  const { handleMediaSubmit, formData, setFormData, handleChange, user } =
    useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [focus, setFocus] = useState(false);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50 overflow-y-auto px-2 sm:px-4 md:px-8">
      <div className="bg-black text-white rounded-2xl shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg relative my-8 sm:my-12">
        {/* Close Button */}
        <button
          onClick={() => setModalState(false)}
          className="absolute top-4 right-4 z-50 text-zinc-400 hover:text-white"
        >
          <FaXmark size={22} />
        </button>
        {/* Form */}
        <form onSubmit={handleMediaSubmit} className="p-4 sm:p-6">
          {/* Cover Image Preview */}
          <div className="relative w-full h-36 sm:h-40 bg-white opacity-60 rounded-xl overflow-hidden mb-6">
            <img
              src={`${API_URL.replace(/\/$/, "")}/public/images/${
                user.coverImg
              }`}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <label className="absolute bottom-2 left-2 bg-white text-black text-xs px-2 py-1 rounded cursor-pointer">
              Change Cover
              <input
                type="file"
                name="cover_image"
                className="hidden"
                onChange={(e) =>
                  setFormData({ ...formData, cover_image: e.target.files[0] })
                }
              />
            </label>
          </div>
          {/* Profile Image Preview */}
          <div className="relative mb-6 flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <img
                src={`${API_URL.replace(/\/$/, "")}/public/images/${
                  user.profileImg
                }`}
                alt="profile"
                className="w-full h-full rounded-full object-cover border-4 border-zinc-900"
              />
              <label className="absolute bottom-0 right-0 bg-white text-black text-xs px-2 py-1 rounded cursor-pointer">
                Change
                <input
                  type="file"
                  name="profile_image"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profile_image: e.target.files[0],
                    })
                  }
                />
              </label>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold">
                {user.name}
              </h2>
              <p className="text-zinc-400 text-sm">@{user.username}</p>
            </div>
          </div>
          {/* Text Inputs */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-blue-500 text-xs sm:text-sm">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-500 text-xs sm:text-sm">Bio</label>
              <input
                type="text"
                name="bio"
                placeholder="Bio"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={formData.bio}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-500 text-xs sm:text-sm">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>
          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
