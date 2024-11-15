import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const updateResource = async (UpdateResource) => {
  const res = await fetch(`/api/resources/${UpdateResource._id}`, {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(UpdateResource),
  });
  if (!res.ok) {
    // Get the error message from the response body
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return res.json();
};
function EditResource({ resourceEdite, onChangeActiveTabe }) {
  const [type, setType] = useState(["video", "article", "book"]);
  const [updateTitle, setUpdateTitle] = useState(resourceEdite.title);
  const [updateTypeSelect, setUpdateTypeSelect] = useState(resourceEdite.type);
  const [updateUrl, setUpdateUrl] = useState(resourceEdite.url);
  const [updateTags, setUpdateTags] = useState(resourceEdite.tags);
  const [updateDescription, setUpdateDescription] = useState(
    resourceEdite.description
  );
  const [activeTab, setActiveTab] = useState("editResource");
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updateResource,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
      toast.success("Resource updated successfully");
      onChangeActiveTabe();
    },
    onError: (err) => {
      toast.error("Error updating resource :", err.message);
    },
  });

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    const updateResource = {
      ...resourceEdite,
      title: updateTitle,
      description: updateDescription,
      url: updateUrl,
      type: updateTypeSelect,
      tags: updateTags,
    };
    updateMutation.mutate(updateResource);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onChangeActiveTabe();
  };
  return (
    <div className="edit-resource">
      <form>
        <div className="ressource-info">
          <div>
            <span>Title</span>
            <input
              type="text"
              placeholder="title"
              required
              onChange={(e) => setUpdateTitle(e.target.value)}
              value={updateTitle}
            />
          </div>
          <div>
            <span>Type</span>
            <select
              name="select_type"
              onChange={(e) => setUpdateTypeSelect(e.target.value)}
              required
              value={updateTypeSelect}
            >
              <option value="">Select type</option>
              {type.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <span>URL</span>
            <input
              type="text"
              placeholder="url"
              onChange={(e) => setUpdateUrl(e.target.value)}
              value={updateUrl}
            />
          </div>
          <div>
            <span>Tags</span>
            <input
              type="text"
              placeholder="Tags"
              onChange={(e) => setUpdateTags(e.target.value)}
              value={updateTags}
            />
          </div>
          <div>
            <span>Description</span>
            <textarea
              placeholder="description"
              onChange={(e) => setUpdateDescription(e.target.value)}
              value={updateDescription}
            ></textarea>
          </div>
        </div>
        <button onClick={handleSaveUpdate} type="submit">
          Update
        </button>
        <button onClick={handleCancel}>cancel</button>
      </form>
    </div>
  );
}

export default EditResource;
