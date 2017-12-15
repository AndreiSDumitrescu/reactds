import React from "react";
import PropTypes from "prop-types";
import ActivityItem from "./ActivityItem";

class ActivityList extends React.Component {
    renderActivities() {
        const { activities, theme } = this.props;
        if ( activities.length === 0 ) {
            return <div>Loading activities...</div>;
        }
        const activitiesItems = activities.map( ( { activity } ) => (
            <ActivityItem
                key={ activity.id }
                activity={ activity }
                theme={ theme }
            />
        ) );

        return activitiesItems;
    }
    render() {
        return (
            <div>
                {this.renderActivities()}
            </div>
        );
    }
}

ActivityList.propTypes = {
    activities: PropTypes.arrayOf( PropTypes.object ),
    theme: PropTypes.shape( {
        object: PropTypes.object,
    } ),
};

ActivityList.defaultProps = {
    activities: [],
    theme: {},
};
export default ActivityList;
