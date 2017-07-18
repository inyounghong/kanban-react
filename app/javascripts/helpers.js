import * as itemTypes from './constants/itemTypes';

/**
 * Checks if string is valid v4 id
 */
export function isV4(id: string): boolean {
  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id);
}

function getTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}

function getStoryByTask(stories, id) {
    return stories.find(story => story.tasks.indexOf(id) > -1);
}

function sameColumn(target, source) {
    return (target.storyId === source.storyId && target.columnId == source.columnId);
}

/*
 * Handles drag and drop for COLUMN and TASK
 */
export function handleHover(targetProps, taskProps, targetType) {

    // If the source (task) is not the same as the target
    if(taskProps.id !== targetProps.id) {
        const sourceTask = getTaskById(targetProps.allTasks, taskProps.id);
        const source = {
            taskId: taskProps.id,
            storyId: getStoryByTask(targetProps.allStories, taskProps.id).id,
            columnId: sourceTask.status
        }
        var target;
        if (targetType == itemTypes.COLUMN) {
            target = {
                taskId: null,
                storyId: targetProps.id.split('_')[0],
                columnId: parseInt(targetProps.id.split('_')[1]),
            }
        } else if (targetType == itemTypes.TASK) {
            target = {
                taskId: targetProps.id,
                storyId: getStoryByTask(targetProps.allStories, targetProps.id).id,
                columnId: getTaskById(targetProps.allTasks, targetProps.id).status,
            }
        }

        // Move task if target is another note, or moving into a new empty column
        if (target.taskId || !(sameColumn(target, source))) {
            console.log("cols " + source.columnId + "->" + target.columnId);
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
