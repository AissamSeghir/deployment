import React from "react";
import "./viewResource.css";
function ViewResource({ resourceView ,onChangeActiveTabe }) {
  const handleReturn = ()=>{
    onChangeActiveTabe()
  }
  return (
    <div className="view">
      <div className="path">
        <a onClick={handleReturn}>Home</a>/ <p>{resourceView.title}</p>
      </div>
      <div className="resource-info">
        <h2>{resourceView.title}</h2>
        <div className="info">
          <h4>Description :</h4>
          <p>
            {resourceView.description ? resourceView.description : "no desc"}
          </p>
          <p>
            URL :{" "}
            {resourceView.url ? (
              <a target="_blank" href={resourceView.url}>
                {resourceView.url}
              </a>
            ) : (
              "no url"
            )}
          </p>
          <p>Tags: {resourceView.tags ? resourceView.tags : "no tags"}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewResource;
