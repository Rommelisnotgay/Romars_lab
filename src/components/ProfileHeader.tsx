import React from 'react';

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="relative">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl glow-effect">
          <img 
            src="/Rommel.png" 
            alt="Rommel" 
            className="w-full h-full object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
