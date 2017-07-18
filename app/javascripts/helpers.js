import * as itemTypes from './constants/itemTypes';

function makeError(type, data) {
    throw new Error(JSON.stringify(data));
}

/**
 * Checks if string is valid v4 id
 */
export function isV4(id: string): boolean {
  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id);
}



export function handleHover(targetProps, taskProps, targetType) {

    // If the source (task) is not the same as the target
    if(taskProps.id !== targetProps.id) {
        const sourceTask = targetProps.allTasks.find(task => task.id === taskProps.id);
        const source = {
            taskId: taskProps.id,
            storyId: targetProps.allStories.find(story => story.tasks.indexOf(taskProps.id) > -1).id,
            columnId: sourceTask.status
        }
        var target;
        if (targetType == itemTypes.COLUMN) {
            target = {
                taskId: null,
                storyId: targetProps.id.split('_')[0],
                columnId: parseInt(targetProps.id.split('_')[1]),
            }
        } else {
            const targetTask = targetProps.allTasks.find(task => task.id === targetProps.id);
            target = {
                taskId: targetProps.id,
                storyId: targetProps.allStories.find(story => story.tasks.indexOf(targetProps.id) > -1).id,
                columnId: targetTask.id,
            }
        }

        // Move task if not same story and column
        if ((source.storyId !== target.storyId) || (target.columnId !== source.columnId)) {
            targetProps.moveTask(source, target);
        }

        // Update columns if needed
        if (target.columnId !== source.columnId) {
            const updatedTask = Object.assign({}, sourceTask, {
                status: target.columnId,
            });
            targetProps.updateTask(updatedTask);
        }

    }
}
