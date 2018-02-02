'use strict';
import _ from 'lodash';

export function getCount(object) {
  return object.skip(0)
    .limit(0)
    .count()
    .exec()
}

/**
 * Function that does magic to date for ios and android
 * @param date
 * @returns {string}
 * @constructor
 */
export function MagicDate(date) {
  return new Date(date.toString()).toISOString();
}

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function parseFilters(filters) {
  if (!_.isUndefined(filters.limit)) {
    filters.offset = parseInt(filters.offset);
    filters.limit = parseInt(filters.limit);
  }
  return filters;
}
export function getCurrentPage(offset, limit) {
  return Math.ceil((offset + limit) / limit);
}
export function getWithObjects(filters, obj) {
  if (filters.onlyCount && filters.onlyCount !== 'false') {
    return getCount(obj).then(count => ({count}));
  } else if (filters.limit) {
    let objs = {};
    return obj
      .then(data => {
        objs = data; //users changed to this.users(before it was warning)
        return getCount(obj)
      })
      .then(count => {
        return {
          count,//page count
          currentPage: getCurrentPage(filters.offset, filters.limit),//currentPage
          objs,//objs changed to user(before it was warning)
          limit: filters.limit
        };
      });
  } else {
    return obj;
  }
}

export function removeNewlines(string) {
  return string.replace(/\n|\r/g, '');
}


export function formDataToObject(data) {
  let v = _.mapValues(data, o => isJson(o) ? JSON.parse(o) : o);
  return v;
}
