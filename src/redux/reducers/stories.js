import * as actionTypes from '../../constants/actionTypes';
import itemTypes from '../../constants/itemTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

const defaultState = [
    {
        id: uuid.v4(),
        name: 'Story 1',
        tasks: [],
    },
    {
        id: uuid.v4(),
        name: 'Story 2',
        tasks: [],
    },
    {
        id: uuid.v4(),
        name: 'Story 3',
        tasks: [],
    },
];

export default function stories(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CREATE_STORY:
      return state.concat(action.payload);

    case actionTypes.UPDATE_STORY:
      return state.map(story => {
        if(story.id === action.payload.id) {
          return Object.assign({}, story, action.payload);
        }
        return story;
      });

    case actionTypes.DELETE_STORY:
      return state.filter(story => story.id !== action.payload.id);

    case actionTypes.ADD_TASK_TO_STORY: {
        const storyId = action.payload.storyId;
        const taskId = action.payload.taskId;
        let storyIndex;

        return state.map(story => {
          storyIndex = story.tasks.indexOf(taskId);
          if(~storyIndex) {
            return Object.assign({}, story, {
              tasks: story.tasks.filter(id => id !== taskId),
            });
          }

          if(story.id === storyId) {
            return Object.assign({}, story, {
              tasks: story.tasks.concat(taskId),
            });
          }

          return story;
        });
      }

      case actionTypes.REMOVE_TASK_FROM_STORY: {
          const storyId = action.payload.storyId;
          const taskId = action.payload.taskId;

          return state.map(story => {
            if(story.id === storyId) {
              return Object.assign({}, story, {
                tasks: story.tasks.filter(id => id !== taskId),
              });
            }
            return story;
          });
        }


    case actionTypes.MOVE_TASK: {
        const source = action.payload.source;
        const target = action.payload.target;
        const sourceStory = state.find(story => story.id === source.storyId);
        const targetStory = state.find(story => story.id === target.storyId);
        const sourceTaskIndex = sourceStory.tasks.indexOf(source.taskId);
        const targetTaskIndex = (target.taskId == null) ? 0 : targetStory.tasks.indexOf(target.taskId);

        // If source and target stories are same
        if (source.storyId === target.storyId) {
            return state.map(story => {
                if (story.id === target.storyId) {
                    return Object.assign({}, story, {
                        tasks: update(story.tasks, {
                            $splice: [
                                [sourceTaskIndex, 1],
                                [targetTaskIndex, 0, source.taskId]
                            ],
                        }),
                    })
                }
                return story;
            });
        }

        // If source and target stories are different
        return state.map(story => {
            if (story.id === source.storyId) { // Remove from current story
                return Object.assign({}, story, {
                    tasks: update(story.tasks, {
                        $splice: [[sourceTaskIndex, 1]],
                    }),
                });
            }
            if (story.id === target.storyId) { // Add to target story
                return Object.assign({}, story, {
                    tasks: update(story.tasks, {
                        $splice: [[targetTaskIndex, 0, source.taskId]],
                    }),
                });
            }
            return story;
        });

    //   const sourceStory = state.filter(story => ~story.tasks.indexOf(source.id))[0];
    //   const targetStory = state.filter(story => ~story.tasks.indexOf(target.id))[0];
    //   const sourceTaskIndex = sourceStory.tasks.indexOf(source.id);
    //   const targetTaskIndex = targetStory.tasks.indexOf(target.id);

      // Moving to same story
    //   if(sourceStory.id === targetStory.id) {
    //       return state.map(story => {
    //         if(story.id === sourceStory.id) {
    //           return Object.assign({}, story, {
    //             tasks: update(sourceStory.tasks, {
    //               $splice: [
    //                 [sourceTaskIndex, 1], // remove at index of current dragging task
    //                 [targetTaskIndex, 0, sourceId], //insert sourceId into given index
    //               ],
    //             }),
    //           });
    //         }
    //
    //         return story;
    //       });
    //     }
    // return state.map(story => {
    //   if(story.id === sourceStory.id) {
    //     return Object.assign({}, story, {
    //       tasks: update(story.tasks, {
    //         $splice: [[sourceTaskIndex, 1]],
    //       }),
    //     });
    //   }
    //
    //   if(story.id === targetStory.id) {
    //     return Object.assign({}, story, {
    //       tasks: update(story.tasks, {
    //         $splice: [[targetTaskIndex, 0, sourceId]],
    //       }),
    //     });
    //   }

    //   return story;
    }

    default:
      return state;
  }
}
