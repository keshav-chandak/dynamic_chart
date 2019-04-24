import React from 'react';

export default function AddButton(props) {

    const onButtonPress = () => {
        const { onClick, line } = props;
        onClick(line);
    }
    return (
        <input type="button" onClick={onButtonPress} value={props.buttonName} />
    );
}