import Task from '../models/Task.js';

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving tasks', error: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide title and description' });
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      authorId: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating task', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const { title, description, status } = req.body;

    task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting task', error: error.message });
  }
};
