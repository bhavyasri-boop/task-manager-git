const Task = require("../models/task.model");


// ======================================
// CREATE TASK
// ======================================
exports.createTask = async (req, res, next) => {
    res.json({ message: "THIS IS THE NEW VERSION" });
    try {
        const task = await Task.create({
            ...req.body,
            user: req.user._id   // 🔐 secure user assignment
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: {
                _id: task._id,
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority
            }
        });

    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};


// ======================================
// GET ALL TASKS (Pagination + Filter + Search)
// ======================================
exports.getTasks = async (req, res, next) => {
    console.log("Running PAGINATION controller"); 
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Page and limit must be greater than 0"
            });
        }

        const skip = (page - 1) * limit;

        let filter = {
            user: req.user._id,   // 🔐 secure filtering
            isDeleted: false
        };

        // Filter by status
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Search by title
        if (req.query.keyword) {
            filter.title = {
                $regex: req.query.keyword,
                $options: "i"
            };
        }

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .select("title description status priority")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            totalTasks, totalTasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            data: tasks
        });

    } catch (error) {
        next(error);
    }
};


// ======================================
// GET SINGLE TASK
// ======================================
exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,   // 🔐 secure
            isDeleted: false
        }).select("title description status priority");

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: task
        });

    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};


// ======================================
// UPDATE TASK
// ======================================
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { 
                _id: req.params.id,
                user: req.user._id,   // 🔐 secure
                isDeleted: false
            },
            req.body,
            { new: true, runValidators: true }
        ).select("title description status priority");

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};


// ======================================
// SOFT DELETE TASK
// ======================================
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { 
                _id: req.params.id,
                user: req.user._id,   // 🔐 secure
                isDeleted: false
            },
            { isDeleted: true },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};