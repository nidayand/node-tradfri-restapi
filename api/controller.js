'use strict';

var config = require("config");
const tradfri = require('node-tradfri').create({
    coapClientPath: config.coapClientPath,
    securityId: config.securityId,
    hubIpAddress: config.ip
});

exports.getDeviceIds = function (req, res) {
    try {
        tradfri.getDeviceIds().then(deviceIds => {
            res.json({
                items: deviceIds,
                status: "ok"
            });
        });

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}

exports.getDevices = function (req, res) {
    try {
        tradfri.getDevices().then(devices => {
            res.json({
                items: devices,
                status: "ok"
            });
        });

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}

exports.getGroupIds = function (req, res) {
    try {
        tradfri.getGroupIds().then(groupIds => {
            res.json({
                items: groupIds,
                status: "ok"
            });
        });

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}

exports.getGroups = function (req, res) {
    try {
        tradfri.getGroups().then(groups => {
            res.json({
                items: groups,
                status: "ok"
            });
        });

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}

exports.getGroup = function (req, res) {
    try {
        tradfri.getGroups().then(groups => {
            res.json({
                item: (groups.filter(group => { return group.id == req.params.groupId })).shift(),
                status: "ok"
            });
        });

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}

exports.getDevice = function (req, res) {
    try {
        tradfri.getDevices().then(devices => {
            res.json({
                item: (devices.filter(device => { return device.id == req.params.deviceId })).shift(),
                status: "ok"
            });
        });

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}

exports.setDevice = function (req, res) {
    try {
        var q = {
            state: req.params.state
        };

        if (req.query.brightness && !isNaN(parseInt(req.query.brightness)) && req.query.brightness <= 255)
            q.brightness = parseInt(req.query.brightness);

        if (req.query.color) {
            q.color = req.query.color.toLowerCase();
            switch (q.color) {
            case 'focus':    case 'cool':   q.color = 'f5faf6'; break;
            case 'everyday': case 'normal': q.color = 'f1e0b5'; break;
            case 'relax':    case 'warm':   q.color = 'efd275'; break;
            default:
                if ( ! req.query.color.match('/^[0-9a-fA-F]{6}$/'))
                    delete q.color;
            }
        }

        tradfri.setDeviceState(req.params.deviceId, q).then(
            res.json({
                status: "ok"
            })
        );

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}

exports.setGroup = function (req, res) {
    try {
        var q = {
            state: req.params.state
        };

        if (req.query.brightness && !isNaN(parseInt(req.query.brightness)) && req.query.brightness <= 255)
            q.brightness = req.query.brightness;

        tradfri.setGroupState(req.params.groupId, q).then(
            res.json({
                status: "ok"
            })
        );

    } catch (err) {
        res.json({
            items: [],
            status: "err"
        });
    }
}
