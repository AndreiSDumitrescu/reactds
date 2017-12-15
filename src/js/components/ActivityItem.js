import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "html-react-parser";
import styled from "styled-components";

const Card = styled.div`
background-color: ${ props => props.theme.globalColors.brand };
`;

const Text = styled.div`
color: ${ props => props.theme.specificColors.sliderText };
`;

const ActivityItem = ( props ) => {
    const { activity } = props;
    return (
        <div className="col s4">
            <div className="card small">
                <div className="card-image">
                    <img src={ activity.images[ 0 ][ "10:10" ].XXL } alt="test" />
                    <span className="card-title">{activity.title}</span>
                </div>
                <Card>
                    <div className="card-content">
                        <div className="truncate">
                            <Text>
                                {ReactHtmlParser( activity.text )}
                            </Text>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

ActivityItem.propTypes = {
    activity: PropTypes.shape( {
        object: PropTypes.object,
    } ),
};

ActivityItem.defaultProps = {
    activity: {},
};

export default ActivityItem;
