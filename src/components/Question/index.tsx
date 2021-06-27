import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({content, author, children, isAnswered = false, isHighlighted = false}: QuestionProps) {
    return (
        // cx('question', { answered: isAnswered }, { highlighted: isHighlighted }, ) >> É IGUAL A << `question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`
        <div className={cx('question', { answered: isAnswered }, { highlighted: isHighlighted && !isAnswered }, )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}></img>
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}