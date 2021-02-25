import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Help } from '@material-ui/icons';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const HoverHelpWidget = ({ messageOnHover, onClick = () => {} }) => {
    return (
        <>
            <LightTooltip
                title={messageOnHover}
                onClick={() => {
                    onClick();
                }}
            >
                <Help color="primary" fontSize="small" />
            </LightTooltip>
        </>
    );
};

HoverHelpWidget.propTypes = {
    messageOnHover: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    onClick: PropTypes.func,
};

export default React.memo(HoverHelpWidget);
