import React from "react";

interface ProfilePictureProps {
    circleSize?: string; // Tailwind size classes, e.g., "w-40 h-40"
    imageSrc?: string; // URL of the profile image
    altText?: string; // Alt text for the image
}

function ProfilePicture({ circleSize = "w-24 h-24", imageSrc, altText = "Profile"}: ProfilePictureProps) {
    return (
        <div className={`bg-slate-50 rounded-[2rem] p-4 ${circleSize} flex items-center justify-center shadow-xl border border-slate-200 transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-rose-300 group`}>
            {imageSrc ? (
                <img src={imageSrc} alt={altText} className={`rounded-[1.5rem] ${circleSize} object-cover shadow-inner`} />
            ): (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-12 h-12 text-slate-400 group-hover:text-rose-500 transition-colors"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            )}
        </div>
    );
}

export default ProfilePicture;
