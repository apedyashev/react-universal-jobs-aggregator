// libs
import React, {PropTypes} from 'react';
import format from 'date-fns/format';
// components
import {Card, CardHeader, CardText} from 'material-ui/Card';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import JobItemTitle from './Title';
// other
import styles from './index.less';

export default function JobItem({job}) {
  function openJobPosting() {
    const win = window.open(job.link, '_blank');
    win.focus();
  }

  const subtitle = [];
  const date = job.datePosted ? format(job.datePosted, 'D.M.YYYY') : 'No Date';
  subtitle.push(<span key="date"><DateIcon />{date}</span>);
  if (job.levelOfEmployment) {
    subtitle.push(<span key="loe"><AlarmIcon />{job.levelOfEmployment}</span>);
  }
  if (job.company) {
    subtitle.push(<span key="company"><BusinessIcon />{job.company}</span>);
  }
  if (job.city) {
    subtitle.push(<span key="city"><LocationIcon />{job.city}</span>);
  }
  return (
    <Card className={styles.root} onClick={openJobPosting}>
      <CardHeader
        title={<JobItemTitle title={job.title} />}
        subtitle={<span className={styles.subtitle}>{subtitle}</span>}
      />
      <CardText>
        {job.shortDescription || <div>No Description</div>}
      </CardText>
    </Card>
  );
}
JobItem.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    city: PropTypes.string,
    levelOfEmployment: PropTypes.string,
    link: PropTypes.string,
    datePosted: PropTypes.string,
  }).isRequired,
};
