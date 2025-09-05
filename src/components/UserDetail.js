import React from 'react';
import '../css/UserDetail.css';

const UserDetailPage = ({ user }) => {
  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5 user-detail-page">
      <div className="row">
        {/* Left: Main Profile Image and Gallery */}
        <div className="col-md-5">
          <div className="main-image mb-3">
            <img
              src={`http://127.0.0.1:8000/storage/${user.profile_image}`}
              alt={user.name}
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="image-gallery d-flex gap-2 overflow-auto">
            {user.gallery?.map((img, i) => (
              <img
                key={i}
                src={`http://127.0.0.1:8000/storage/${img}`}
                className="thumbnail-img rounded"
                alt={`Gallery ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: User Info */}
        <div className="col-md-7">
          <h2 className="mb-2">{user.name}, {user.age}</h2>
          <p className="text-muted mb-3">{user.state}, {user.city}</p>
          <hr />

          <div className="mb-3">
            <strong>Height:</strong> {user.height} cm
          </div>
          <div className="mb-3">
            <strong>Hobbies:</strong> {user.hobbies?.join(', ') || 'N/A'}
          </div>
          <div className="mb-3">
            <strong>Bio:</strong> {user.bio || 'No bio provided.'}
          </div>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-success btn-lg">Like</button>
            <button className="btn btn-outline-danger btn-lg">Pass</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
