import React from 'react';
import { Card } from 'antd';

import laptop from '../static/undraw_youtube_tutorial_2gn3.png';
import group from '../static/undraw_Group_chat_unwm.png';
import workshop from '../static/undraw_researching_22gp.png';

const { Meta } = Card;

const ProgramCard = props => {
  const getCardImage = () =>
    props.type === 'group'
      ? group
      : props.type === 'intensive'
      ? workshop
      : laptop;
  return (
    <Card hoverable cover={<img alt="student" src={getCardImage} />}>
      <Meta title={props.title} description="www.instagram.com" />
    </Card>
  );
};

export default ProgramCard;
