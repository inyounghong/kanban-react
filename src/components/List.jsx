import React, { PropTypes } from 'react';
import Story from '../containers/Story';

export default class List extends React.Component {

    render() {
        const allTasks = this.props.tasks;

        const stories = this.props.stories.map(story => {
            const storyTasks = story.tasks
                .map(id => allTasks.find(task => task.id === id))
                .filter(task => task); // filter out undefined tasks
            return (

                <Story
                    story={story}
                    key={story.id}
                    tasks={storyTasks}
                />
            )
        });

        return (
            <div className="list">
                {stories}
            </div>
        );
    }
}
