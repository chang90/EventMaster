import React, { SyntheticEvent, useState } from 'react';
import { Button, Label, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import { format } from 'date-fns';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean 
}

const ActivityList: React.FC<Props> = ({ activities, selectActivity, deleteActivity, submitting }) => {
  const [target, setTarget] = useState('');

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities && activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                <Button 
                  name={activity.id}
                  loading={submitting && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated='right'
                  content='Delete'
                  color='red' />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList;