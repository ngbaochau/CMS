import Project from '../models/Projects.js';

export const updateProjectTrack = async (req, res) => {
  const projectId = req.params.id;
  const { track } = req.body;

  if (!track) {
    return res.status(400).json({ error: 'Field "track" is required' });
  }

  const allowedTracks = ['Planning', 'InProgress', 'Cancelled', 'Completed', 'Overdue'];
  if (!allowedTracks.includes(track)) {
    return res.status(400).json({ error: 'Invalid track value' });
  }

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    project.track = track;
    project.updated_at = new Date();
    await project.save();

    return res.status(200).json({ message: 'Track updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({
      id: project.id,
      name: project.name,
      description: project.description,
      account_id: project.account_id,
      start_date: project.start_date,
      end_date: project.end_date,
      track: project.track,
      created_at: project.created_at,
      updated_at: project.updated_at,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};
