﻿/**
 * Class: MeasureService
 * 量算服务服务类
 * 用法：
 *      L.supermap.measureService(url).measureDistance({
 *          geometry:xxx
 *      },function(result){
 *           //doSomething
 *      })
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var Util = require('../core/Util');
var SuperMapMeasureService = require('../../common/iServer/MeasureService');

var MeasureService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     *测距
     * @param params
     *  <MeasureParameters>
     * @param callback
     */
    measureDistance: function (params, callback) {
        this.measure(SuperMap.MeasureMode.DISTANCE, params, callback);
        return this;
    },

    /**
     * 测面积
     * @param params
     * <MeasureParameters>
     * @param callback
     */
    measureArea: function (params, callback) {
        this.measure(SuperMap.MeasureMode.AREA, params, callback);
        return this;
    },

    /**
     *
     * @param type
     * <SuperMap.MeasureMode>
     * @param params
     * <SuperMap.MeasureParameters>
     * @param callback
     */
    measure: function (type, params, callback) {
        if (!params) {
            return;
        }
        var me = this;
        if (params.geometry) {
            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        var measureService = new SuperMapMeasureService(me.options.url, {
            serverType: me.options.serverType,
            measureMode: type,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        measureService.processAsync(params);
        return me;
    }
});

L.supermap.measureService = function (url, options) {
    return new MeasureService(url, options);
};

module.exports = MeasureService;