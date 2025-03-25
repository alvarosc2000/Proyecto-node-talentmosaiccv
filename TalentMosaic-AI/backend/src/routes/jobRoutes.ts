import express from 'express';
import { jobController } from '../controllers/jobController';

const router = express.Router();

// Ruta para agregar una descripción de trabajo
router.post('/jobs', async (req, res) => {
    try {
        const jobDescription = req.body; // Asumiendo que el cuerpo contiene la descripción del trabajo
        const createdJob = await jobController.addJobDescription(jobDescription);
        res.status(201).json(createdJob);
    } catch (error) {
        console.error("Error al crear la descripción del trabajo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para obtener todas las descripciones de trabajo
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await jobController.getAllJobs();
        res.json(jobs);
    } catch (error) {
        console.error("Error al obtener descripciones de trabajo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para obtener un trabajo por ID
router.get('/jobs/:id', async (req, res) => {
    try {
        const job = await jobController.getJobById(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ error: "Trabajo no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el trabajo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para actualizar un trabajo
router.put('/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await jobController.updateJob(req.params.id, req.body);
        if (updatedJob) {
            res.json(updatedJob);
        } else {
            res.status(404).json({ error: "Trabajo no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el trabajo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para eliminar un trabajo
router.delete('/jobs/:id', async (req, res) => {
    try {
        await jobController.deleteJob(req.params.id);
        res.status(204).send(); // No content
    } catch (error) {
        console.error("Error al eliminar el trabajo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
