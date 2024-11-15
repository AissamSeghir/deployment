import Resource from "../models/Resource.js";

export const addResource = async (req,res) => {
    try{
        const {title , description , url , type , tags } = req.body
        const userId = req.user?._id;
        console.log(req.body);
        const newResource = new Resource(
            {
                title: title,
                description: description,
                url: url,
                type: type,
                tags: tags,
                userId
              }
        )
        newResource.save()
        return res.json({ message: "add resource successfully" });
    }catch(err){

        console.log(err);
        res.status(500).json({ error: err.message });
        
    }

}

export const getResources = async (req, res) => {
    try {
      const  userId  = req.user._id;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
      const resources = (await Resource.find({userId})).reverse();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch resources', error });
    }
  };

export const deleteResource = async(req,res)=>{
  try{
    const resource =Resource.findOne({_id:req.params.id});
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    await Resource.deleteOne({_id:req.params.id})
    res.json({ message: "Resource deleted successfully" });
  }catch(err){
    res.status(500).json({ message: err.message })  
  }
}

export const updateResource = async (req,res)=>{
  try{
      const {id} = req.params
      const resource = Resource.findOne({_id:req.params.id})
      const {title , type , tags , url , description}= req.body
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      await Resource.findByIdAndUpdate(
        id,
        {title , description , url , type , tags},
        {new:true,runValidators:true}
      )
      res.json({ message: "Resource updated successfully" });
  }catch(err){

    return res.status(500).json({ message: "Error updating resource" });

  }
}