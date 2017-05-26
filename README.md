# node-tradfri-restapi

## What

A simple REST-API implementation of [node-tradfri](https://www.npmjs.com/package/node-tradfri) with the following commands

 - `/tradfri/deviceids` will provide an array of device ids
 - `/tradfri/groupids` will provide an array of group ids
 - `/tradfri/devices` will provide a full list of all devices including meta data
 - `/tradfri/groups` will provide a full list of all groups including devices and meta data
 - `/tradfri/device/:deviceid` will get the status of a device, including brightness and color
 - `/tradfri/device/:deviceid/:state` will set the state of a device (on/off). E.g. /tradfri/device/17101/on
 - `/tradfri/device/:deviceid/on?color=:color` will set the color of a device, in hex, or 'cool', 'warm', 'normal'
 - `/tradfri/device/:deviceid/on?brightness=:brightness` will set the brightness of a device, from 0 to 255
 - `/tradfri/device/:deviceid/:state` will set the state of a device (on/off). E.g. /tradfri/device/17101/on
 - `/tradfri/group/:groupid/:state` will set the state of a device (on/off). E.g. /tradfri/device/11007/off

First release is a bit of a quick one. Exceptions needs to be managed and include toggle as an option. I did the API as I need to control my IKEA TRÅDFRI-lights with Node-RED but Node-RED does not support Node v7.x (I assume it will wait for the next LTS release) and a simple micro service is the short term solution to have it integrated and managed by Node-RED.

## How

  1. Setup libcoap as explained below
  2. `npm update` to install `node-tradfri` and other dependencies
  3. Copy `./config/default.json-sample` as `./config/default.json` and update with the IKEA hub information
  4. Run using Node >7.6, or simply use `nave`:

```sh
nave use 7 node index.js
```

If you use `systemd` to manage your OS, eg. recent versions of Ubuntu Linux, then you can use the supplied `tradfri-restapi.service` file to perform start-up and job management.  Edit the `tradfri-restapi.service` file to match your install directory, user, group and so forth, and then:

```sh
systemctl link `pwd`/tradfri-restapi.service
systemctl start tradfri-restapi
journalctl -f tradfri-restapi
```

## Compiling libcoap

Install libcoap as described below for Debian/Ubuntu/Raspbian:
(credits to homebridge-tradfri)

```sh
apt-get install libtool git build-essential install autoconf automake
git clone --recursive https://github.com/obgm/libcoap.git -b dtls
cd libcoap
git submodule update --init --recursive
./autogen.sh
./configure --disable-documentation --disable-shared
make
```

You'll find the coap-client binary in `./examples`.  This should be specified in the `config/default.json` file used above.
