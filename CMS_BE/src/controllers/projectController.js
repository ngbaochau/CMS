import sequelize from '../config/db.js';
import Project from '../models/Projects.js';

export const updateProjectTrack = async (req, res) => {
  const projectId = req.params.id;
  const track = req.body?.track;

  if (!track) {
    return res.status(400).json({ error: 'Field "track" is required' });
  }

  const allowedTracks = ['Planning', 'InProgress', 'Cancelled', 'Completed', 'Overdue'];
  if (!allowedTracks.includes(track)) {
    return res.status(400).json({ error: 'Invalid track value' });
  }

  const sql = 'UPDATE Projects SET track = ?, updated_at = NOW() WHERE id = ?';
  try {
    const [result] = await sequelize.query(sql, {
      replacements: [track, projectId],
    });

    if (!result.affectedRows) {
      return res.status(404).json({ error: 'Project not found' });
    }

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
      track: project.track,
      updated_at: project.updated_at,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};
