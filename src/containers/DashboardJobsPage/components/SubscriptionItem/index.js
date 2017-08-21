// libs
import React from 'react';
import {PropTypes} from 'prop-types';

export default function SubscriptionItem({subscription}) {
  return (
    <div>{subscription.title}</div>
  );
}
SubscriptionItem.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
