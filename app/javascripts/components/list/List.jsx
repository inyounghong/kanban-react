import React, { PropTypes } from 'react';
import Story from './Story.jsx';

export default class List extends React.Component {

    render() {
        const allNotes = this.props.notes;
        const allTasks = this.props.tasks;
        
        const stories = allNotes.map(note => {
            const noteTasks = note.tasks
                .map(id => allTasks.find(task => task.id === id))
                .filter(task => task); // filter out undefined tasks

            return (
                <Story
                    note={note}
                    key={note.id}
                    tasks={noteTasks}
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
