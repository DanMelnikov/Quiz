import React from 'react';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).filter(id => {
        return props.results[id] === 'success';
    }).length;

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
                            classes[props.results[quizItem.id]]
                        ];

                        return (
                            <li key={index}>
                                <strong>{index + 1}.</strong>&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')} />
                            </li>
                        );
                    })
                }
            </ul>

            <p>Правильных ответов: {successCount} из {props.quiz.length}</p>

            <div>
                <button onClick={props.onRetry}>Повторить</button>
            </div>
        </div>
    );
}

export default FinishedQuiz;