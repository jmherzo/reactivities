import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/IActivity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity | null;
  editMode: boolean;
  submitting: boolean;
  target: string;
  selectActivity: (id: string) => void;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  submitting,
  target,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          submitting={submitting}
          selectActivity={selectActivity}
          activities={activities}
          deleteActivity={deleteActivity}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={selectedActivity?.id || 0}
            submitting={submitting}
            setEditMode={setEditMode}
            activity={selectedActivity!}
            createActivity={createActivity}
            editActivity={editActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
