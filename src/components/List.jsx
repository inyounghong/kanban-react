import React, { PropTypes } from 'react';
import Story from './Story.jsx';

export default class List extends React.Component {

    render() {
        const allTasks = this.props.tasks;

        const stories = this.props.stories.map(story => {
            const storyTasks = story.tasks
                .map(id => allTasks.find(task => task.id === id))
                .filter(task => task); // filter out undefined tasks
                console.log(this.props);
            return (

                <Story
                    story={story}
                    key={story.id}
                    tasks={storyTasks}
                    addTask={this.props.addTask}
                    updateStory={this.props.updateStory}
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
