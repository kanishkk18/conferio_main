import dayjs from "dayjs";
import { prisma } from "utils/db";

async function checkDueTasks() {
  const now = dayjs().toISOString();

  const expiredTasks = await prisma.myTask.findMany({
    where: {
      dueTime: { lt: now },
      itsDone: false,
    },
  });

  if (expiredTasks.length > 0) {
    const { notifyDueTimeExpired } = await import("server");
    for (const task of expiredTasks) {
      const notification = await prisma.notification.create({
        data: {
          message: `The task: ${
            task.title
          } due on date ${task.dueTime.toISOString()}`,
          userId: task.userId,
          taskId: task.id,
        },
      });

      await prisma.myTask.update({
        where: { id: task.id },
        data: { itsDone: true },
      }); 

      notifyDueTimeExpired(notification, task);
    }
  }
}

setInterval(checkDueTasks, 15000);

console.log("🔎 Revisión de dueTime activa cada 30 segundos.");
