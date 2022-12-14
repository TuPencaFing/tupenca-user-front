import React from 'react';
import ImageList from '@mui/material/ImageList';

import PrizeItem from '../PrizeItem';
import './styles.scss';

const PrizeList = ({ prizes, handleClickItem }) => {

    return (
        <div className="prize-list">
            <ImageList className="prize-list-images" cols={3}>
                {prizes.map((prize) => {
                    const { id, image, title } = prize;
                    return (
                        <PrizeItem
                            key={id}
                            id={id}
                            image={image}
                            title={title}
                            handleClickItem={handleClickItem}
                        />
                    );
                })}
            </ImageList>
        </div>
    );
};

export default PrizeList;
