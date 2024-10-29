import React from 'react';
import './userAvator.css'
const UserAvatar = ({ user }) => {
  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Function to generate random color based on name
  const getRandomColor = (name) => {
    const colors = [
      '#E84A5F', // pink-red
      '#FF847C', // salmon
      '#FECEA8', // peach
      '#2A363B', // dark grey
      '#99B898', // sage green
      '#547980', // steel blue
      '#45B7D1', // bright blue
      '#FF8C42', // orange
      '#844685', // purple
      '#4CA1AF', // teal
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const avatarColor = getRandomColor(user.name);
  const initials = getInitials(user.name);

  return (
    <div className="user-avatar-container">
      <div 
        className="user-avatar" 
        style={{ backgroundColor: avatarColor }}
      >
        {user.photoUrl ? (
          <img src={user.photoUrl} alt={user.name} className="user-photo" />
        ) : (
          <span className="user-initials">{initials}</span>
        )}
      </div>
      <span 
        className={`availability-indicator ${user.available ? 'available' : 'unavailable'}`}
      ></span>
    </div>
  );
};

export default UserAvatar;