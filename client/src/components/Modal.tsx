import React, { useEffect } from "react";
import { useUserContext } from "../context/hooks/useUserContext";
import { getPublicImageUrl } from "../utils/mediaUrl";

interface ModalProps {
  setModalState: (open: boolean) => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ setModalState, isOpen }) => {
  const { handleMediaSubmit, formData, setFormData, handleChange, user } =
    useUserContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white/5 backdrop-blur-sm z-99999 text-white rounded-2xl shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg overflow-auto sm:h-[90dvh] h-[80dvh]  my-8 sm:my-12">
        <form onSubmit={handleMediaSubmit} className="p-4 sm:p-6">
          <div className="relative w-full h-36 sm:h-40 bg-white opacity-60 rounded-xl overflow-hidden mb-6">
            <img
              src={getPublicImageUrl(user.coverImg)}
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
                  setFormData({
                    ...formData,
                    cover_image: e.target.files?.[0] ?? "",
                  })
                }
              />
            </label>
          </div>
          <div className="relative mb-6 flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <img
                src={getPublicImageUrl(user.profileImg)}
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
                      profile_image: e.target.files?.[0] ?? "",
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-blue-500 text-xs sm:text-sm">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
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
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setModalState(false)}
              className="px-5 py-2 rounded-full bg-white text-black hover:bg-black cursor-pointer hover:text-white font-semibold"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-semibold"
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
