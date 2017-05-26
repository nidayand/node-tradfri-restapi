'use strict';

module.exports = function(app) {
    var controller = require('./controller.js');

    // todoList Routes
    app.route('/tradfri/deviceids')
       .get(controller.getDeviceIds);
    app.route('/tradfri/devices')
       .get(controller.getDevices);
    app.route('/tradfri/groupids')
       .get(controller.getGroupIds);
    app.route('/tradfri/groups')
       .get(controller.getGroups);

    app.route('/tradfri/device/:deviceId')
       .get(controller.getDevice);
    app.route('/tradfri/device/:deviceId/:state')
       .get(controller.setDevice);

    app.route('/tradfri/group/:groupId')
       .get(controller.getGroup);
    app.route('/tradfri/group/:groupId/:state')
       .get(controller.setGroup);
};
