import moment from 'moment-timezone';
import { timezoneNames } from './timezoneData';

export const getTimezoneOffset = (tzName) => {
  try {
    if (!tzName) {
      return 0;
    }
    return moment.tz(tzName).utcOffset();
  } catch (e) {
    console.log(tzName, e.message);
    return 0;
  }
};

export const getHourFromEpouch = (timeEpoch, timezone) => {
  if (!timeEpoch) {
    return;
  }

  try {
    const m = moment.unix(timeEpoch).tz(timezone).format('hh A');
    return m;
  } catch (e) {
    console.log(timeEpoch, e.message);
    // OpenWeatherApp return epoch is seconds
    const dateObject = new Date(timeEpoch * 1000);

    const hours = dateObject.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hours} ${ampm}`;
  }
};

export const getTimezoneAbbr = (tzName) => {
  try {
    if (!tzName) {
      return tzName;
    }
    return moment().tz(tzName).zoneAbbr();
  } catch (e) {
    console.log(tzName, e.message);
    return tzName;
  }
};

export const convertUTCToTimezoneTime = (strDate, tzName, strFormat = 'YYYY-MM-DD hh:mm a') => {
  try {
    if (!tzName) {
      return moment(strDate).format(strFormat);
    }

    return moment(strDate).tz(tzName).format(strFormat);
  } catch (e) {
    console.log(strDate, tzName, e.message);
    return strDate;
  }
};

export const correctTimezoneName = (tzName) => {
  return timezoneNames && timezoneNames.includes(tzName) ? tzName : 'Etc/UTC';
};
