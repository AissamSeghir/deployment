import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Profile from "/profile.png";
import Logo from "/logo-transparent.png";
import "./profileUser.css";

const updateUser = async (updateUser) => {
  const res = await fetch(`/api/user/${updateUser._id}`, {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateUser),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return res.json();
};

const deleteUser = async (userId) => {
  const res = await fetch(`/api/user/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete resource");
  }
  return res.json();
};
function ProfileUser({ authUser, onFormSubmit }) {
  const [updateFirstN, setUpdateFirstN] = useState(authUser.firstname);
  const [updateLasttN, setUpdateLastN] = useState(authUser.lastname);
  const [updateEmail, setUpdateEmail] = useState(authUser.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(false);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries(["resources"]);
    },
    onError: (error) => {
      toast.error("Failed to delete User: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("password updated successfully");
      onFormSubmit();
    },
    onError: (err) => {
      toast.error("Error updating password :", err.message);
    },
  });

  const handleSaveUpdate = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword && newPassword.length > 1) {
      const updatedUser = {
        ...authUser,
        password: newPassword,
      };

      updateMutation.mutate(updatedUser);
      console.log(updatedUser);
    } else {
      toast.error("Passwords do not match or are too short");
    }
  };

  const handleDeleteUser = (userId) => {
    toast((t) => (
      <div className="modal">
        <div className="modal_content">
          <h3>Are you sure?</h3>
          <p>This action cannot be undone.</p>
          <button
            style={{ backgroundColor: "#F95454" }}
            className="confirm"
            onClick={() => {
              deleteMutation.mutate(userId); // Call the delete function
              toast.dismiss(t.id); // Dismiss the toast
            }}
          >
            Confirm
          </button>
          <button
            style={{ backgroundColor: "#00FF9C" }}
            className="cancel-btn"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleBackHome = (e) => {
    e.preventDefault();
    onFormSubmit();
  };
  return (
    <div className="edit-profile">
      <header>
        <img src={Logo} alt="log" />
      </header>
      <div className="view">
        <div className="path">
          <a onClick={handleBackHome}>Home</a>/{" "}
          <p>
            {" "}
            Profile : {authUser.firstname} {authUser.lastname}
          </p>
        </div>
        <h3>Profile info</h3>
        <div className="view-info">
          <div className="profile">
            <div className="img-box">
              <img src={Profile} alt="profile" />
            </div>
            <h4>
              {authUser.lastname}_{authUser.firstname}
            </h4>
            <button onClick={() => handleDeleteUser(authUser._id)}>
              Delete Account
            </button>
          </div>
          <form>
            <label htmlFor="">FirstName</label>
            <input type="text" value={updateFirstN} disabled />
            <label htmlFor="">LasttName</label>
            <input type="text" value={updateLasttN} disabled />
            <label htmlFor="">Email</label>
            <input type="text" value={updateEmail} disabled />
            <label htmlFor="">change your password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="new password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm new password"
            />
            <button onClick={handleSaveUpdate}>change password</button>
            <button onClick={handleBackHome}>cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
