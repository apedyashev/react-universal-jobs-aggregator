// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import SubscriptionItem from '../SubscriptionItem';

export default function SubscriptionsList({subscriptions}) {
  return (
    <div>
      {subscriptions.map((subscription) => (
        <SubscriptionItem key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}
SubscriptionsList.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};
