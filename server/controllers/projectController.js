// controllers/projectController.js
const Project = require('../models/Project');

const projectAdd = async (req, res) => {

  console.log("projectAdd");
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const newProject = new Project({
      name,
      createdBy: req.user.id, // from JWT middleware
      details: {
        equipment: [],
        survey: [],
        expenditure: [],
        researchNotes: [],
        actions: [],
        documents: []
      }
    });

    const savedProject = await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: savedProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



const getProject = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: { $ne: null } }) // filter only valid ones
      .populate('createdBy', 'username email')
      .select('name createdAt createdBy');

    const formatted = projects.map((proj) => ({
      projectName: proj.name,
      username: proj.createdBy?.username || "N/A",
      email: proj.createdBy?.email || "N/A",
      date: proj.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = { projectAdd, getProject };
