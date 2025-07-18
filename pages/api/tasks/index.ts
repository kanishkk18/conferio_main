// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from 'lib/prisma';
// import { v4 as uuidv4, validate } from 'uuid';
// import { NewTask } from '../../../types';
// import { getSession } from 'next-auth/react';
// import { Session } from 'next-auth';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const session = await getSession({ req });
//     if (!session) {
//         return res.status(401).end('Unauthorized');
//     }

//     switch (req.method) {
//         case 'POST': {
//             return await createTask(req, res, session);
//         }
//         case 'GET': {
//             return await getTasks(res, session);
//         }
//         default:
//             res.status(405).end('Method not allowed');
//             break;
//     }
// }

// const isNewTask = (data: unknown): data is NewTask => {
//     return (
//         typeof data === 'object' &&
//         data !== null &&
//         'column_uuid' in data &&
//         typeof data.column_uuid === 'string' &&
//         'name' in data &&
//         typeof data.name === 'string' &&
//         (!('description' in data) || typeof data.description === 'string') &&
//         (!('subtasks' in data) || data.subtasks instanceof Array)
//     );
// };

// const getTasks = async (res: NextApiResponse, session: Session) => {
//     try {
//         const tasks = await prisma.task.findMany({
//             where: {
//                 userId: session.user.id,
//             },
//         });
//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };

// const createTask = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
//     const taskData: unknown = req.body;
//     if (!isNewTask(taskData)) {
//         return res.status(400).json({ error: 'Invalid task data' });
//     }
//     if (taskData.name.length < 1 || taskData.name.length > 120) {
//         return res.status(400).json({ error: 'Task name must be between 1 and 120 characters' });
//     }
//     if (!validate(taskData.column_uuid)) {
//         return res.status(400).json({ error: 'Invalid column UUID' });
//     }
//     for (const subtask of taskData.subtasks ?? []) {
//         if (typeof subtask.name !== 'string' || (subtask.completed && typeof subtask.completed !== 'boolean')) {
//             return res.status(400).json({ error: 'Invalid subtask data' });
//         }
//     }
//     const task: NewTask & { uuid: string } = {
//         name: taskData.name,
//         description: taskData.description,
//         column_uuid: taskData.column_uuid,
//         subtasks: taskData.subtasks ?? [],
//         uuid: uuidv4(),
//     };
//     const columnData = await prisma.column.findUnique({
//         where: {
//             uuid: task.column_uuid,
//         },
//     });
//     if (!columnData) {
//         return res.status(404).json({ error: 'Column not found' });
//     }

//     const existingColumnTasks = await prisma.task.findMany({
//         where: {
//             column_uuid: task.column_uuid,
//         },
//         orderBy: {
//             position: 'desc',
//         },
//     });

//     const nextPosition = existingColumnTasks.length ? existingColumnTasks[0].position + 1 : 0;

//     const payload = {
//         data: {
//             name: task.name,
//             uuid: task.uuid,
//             description: task.description,
//             position: nextPosition,
//             userId: session.user.id,
//             column_uuid: task.column_uuid,
//             subtasks: task.subtasks && task.subtasks.length > 0
//                 ? {
//                     create: task.subtasks.map((subtask) => ({
//                         name: subtask.name,
//                         userId: session.user.id,
//                         uuid: uuidv4(),
//                         completed: false,
//                     })),
//                 }
//                 : undefined,
//         },
//     };
//     try {
//         const newTask = await prisma.task.create(payload);
//         res.status(201).json(newTask);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error });
//     }
// };

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { v4 as uuidv4, validate } from 'uuid';
import { NewTask } from '../../../types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'; // adjust path if needed
import { Session } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end('Unauthorized');
    }

    switch (req.method) {
        case 'POST':
            return await createTask(req, res, session);
        case 'GET':
            return await getTasks(res, session);
        default:
            res.status(405).end('Method not allowed');
    }
}

const isNewTask = (data: unknown): data is NewTask => {
    return (
        typeof data === 'object' &&
        data !== null &&
        'column_uuid' in data &&
        typeof data.column_uuid === 'string' &&
        'name' in data &&
        typeof data.name === 'string' &&
        (!('description' in data) || typeof data.description === 'string') &&
        (!('subtasks' in data) || Array.isArray(data.subtasks))
    );
};

const getTasks = async (res: NextApiResponse, session: Session) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: session.user.id,
            },
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createTask = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const taskData: unknown = req.body;

    if (!isNewTask(taskData)) {
        return res.status(400).json({ error: 'Invalid task data' });
    }

    if (taskData.name.length < 1 || taskData.name.length > 120) {
        return res.status(400).json({ error: 'Task name must be between 1 and 120 characters' });
    }

    if (!validate(taskData.column_uuid)) {
        return res.status(400).json({ error: 'Invalid column UUID' });
    }

    for (const subtask of taskData.subtasks ?? []) {
        if (typeof subtask.name !== 'string' || (subtask.completed && typeof subtask.completed !== 'boolean')) {
            return res.status(400).json({ error: 'Invalid subtask data' });
        }
    }

    const task: NewTask & { uuid: string } = {
        name: taskData.name,
        description: taskData.description,
        column_uuid: taskData.column_uuid,
        subtasks: taskData.subtasks ?? [],
        uuid: uuidv4(),
    };

    const columnData = await prisma.column.findUnique({
        where: {
            uuid: task.column_uuid,
        },
    });

    if (!columnData) {
        return res.status(404).json({ error: 'Column not found' });
    }

    const existingColumnTasks = await prisma.task.findMany({
        where: {
            column_uuid: task.column_uuid,
        },
        orderBy: {
            position: 'desc',
        },
    });

    const nextPosition = existingColumnTasks.length ? existingColumnTasks[0].position + 1 : 0;

    const payload = {
        data: {
            name: task.name,
            uuid: task.uuid,
            description: task.description,
            position: nextPosition,
            userId: session.user.id,
            column_uuid: task.column_uuid,
            subtasks: task.subtasks && task.subtasks.length > 0
                ? {
                    create: task.subtasks.map((subtask) => ({
                        name: subtask.name,
                        userId: session.user.id,
                        uuid: uuidv4(),
                        completed: false,
                    })),
                }
                : undefined,
        },
    };

    try {
        const newTask = await prisma.task.create(payload);
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
