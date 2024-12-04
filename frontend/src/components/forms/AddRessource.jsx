import React, { useState } from "react";
import Logo from "/logo-transparent.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import "./formRessoures.css";

const addResource = async (newResource) => {
  const res = await fetch("https://deployment-z54s.onrender.com/api/resources", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newResource),
  });
};
function FormRessource({ onFormSubmit }) {
  const [type, setType] = useState(["video", "article", "book"]);
  const [title, setTitle] = useState("");
  const [typeSelect, setTypeSelect] = useState("Select type");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const quiryCleint = useQueryClient();
  const mutation = useMutation({
    mutationFn: addResource,
    onSuccess: () => {
      toast.success("add Resource succesfull");
      quiryCleint.invalidateQueries();
      setTitle("");
      setTypeSelect("");
      setUrl("");
      setTags("");
      setDescription("");
      onFormSubmit();
    },
    onError: (err) => {
      toast.error("error add resource ", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title: title,
      description: description,
      url: url,
      type: typeSelect,
      tags: tags,
    });
  };
  return (
    <div className="add-ressource">
      <header>
        <img src={Logo} alt="log" />
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="ressource-info">
            <div>
              <span>Title</span>
              <input
                type="text"
                placeholder="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <span>Type</span>
              <select
                name="select_type"
                onChange={(e) => setTypeSelect(e.target.value)}
                required
                value={typeSelect}
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
                placeholder="url (optional)"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
            </div>
            <div>
              <span>Tags</span>
              <input
                type="text"
                placeholder="Tags (optional)"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </div>
            <div>
              <span>Description</span>
              <textarea
                name=""
                id=""
                placeholder="description (optional)"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </section>
    </div>
  );
}

export default FormRessource;
