import React from 'react';
import styled from 'styled-components';

const StyledExperienceBar = styled.div`
    display: flex;
    align-items: center;
    padding: 0;

    span {
        font-size: 1rem;
    }
    .bar {
        flex: 1;
        height: 4px;
        border-radius: 4px;
        background: var(--gray-line);
        margin: 0 1.5rem;
        position: relative;
    }
    .bar-experience {
        height: 4px;
        border-radius: 4px;
        background-color: var(--green);
    }
    div > span {
        position: absolute;
        top: 12px;
        transform: translateX(-50%);
    }
`;

export function ExperienceBar() {
    return (
        <StyledExperienceBar>
            <span>0 xp</span>
            <div className="bar">
                <div style={{ width: '50%' }} className="bar-experience" />
                <span style={{ left: '50%' }}>300 xp</span>
            </div>
            <span>6000 xp</span>
        </StyledExperienceBar>
    );
}
