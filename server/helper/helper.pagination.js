'use strict';
import _ from 'lodash';
import Promise from 'bluebird';

function getCount(mongooseObj) {
    return mongooseObj.count().limit(0).skip(0).exec()
}

function findLimit(mongooseObj, skipCount, limit) {
    return mongooseObj.sort('-updated').limit(limit).skip(skipCount).exec()
}

export function executeWithPagination(mongooseObj, currPage, limit = 9) {
    currPage = currPage || 1;
    limit = Number(limit);
    let skipCount = (currPage - 1) * limit;
    return findLimit(mongooseObj, skipCount, limit)
        .then(objs =>
            Promise.props({
                objs,
                count: getCount(mongooseObj),
                skipCount,
                limit
            }))
}
