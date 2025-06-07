import { Router } from "express";
import { TodoModel } from "../db.js";
import { auth } from "../auth.js";

const router = Router();

router.route("/todos")

    .get(auth, async (req, res) => {
        const userId = req.userId;

        const todos = await TodoModel.find({
            userID: userId
        });

        res.json({ todos });
    })

    .post(auth, async (req, res) => {
        const userId = req.userId;
        const title = req.body.title;
        const description = req.body.description;
        const done = req.body.done;
        const priority = req.body.priority;

        await TodoModel.create({
            title: title,
            description: description,
            done: done,
            userID: userId,
            priority: priority
        });

        res.json({
            message: "Todo added"
        });
    });



router.delete("/todos/:id", auth, async (req, res) => {
    const userId = req.userId;
    const todoId = req.params.id;

    try {
        const todo = await TodoModel.findOne({
            _id: todoId,
            userID: userId
        });
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found or unauthorized"
            });
        }
        await TodoModel.deleteOne({ _id: todoId });
        res.json({ message: "Todo deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete todo" })
    }
});

router.put("/todos/:id", auth, async (req, res) => {
    const userId = req.userId;
    const todoId = req.params.id;
    const { title, description, done, priority } = req.body;

    try {
        const todo = await TodoModel.findOne({
            _id: todoId,
            userID: userId
        });
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found or unauthorized"
            });
        }

        todo.title = title ?? todo.title;
        todo.description = description ?? todo.description;
        todo.done = done ?? todo.done;
        todo.priority = priority ?? todo.priority;

        await todo.save();
        res.json({
            message: "Todo updated successfully", todo
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to update todo"
        });
    }
});

export default router;