import React, { Component } from 'react';
import styles from './Map.less';

class Map extends Component {
  constructor(props) {
    super(props);
    window.AMaps = window.AMaps || {};
    this.markers = []
  }
  componentDidMount() {
    const { mapKey } = this.props;
    if (!window.AMaps[mapKey]) {
      // 未加载对应mapKey的地图时
      window.onAMapLoaded = this.initMap;
      let url = ``;
      let jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);
    } else {
      this.initMap();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.processData(nextProps);
  }
  render() {
    const { id, className } = this.props;
    return (
      <div id={id} className={className} >

      </div>
    );
  }
  processData = (props) => {
    const { markers } = props;
    this.removeMarkers(this.markers);
    this.markers = this.getMarkers(markers);
    this.addMarkers(this.markers);
  }
  initMap = () => {
    const { id, options, mapKey } = this.props;
    if (!window.AMaps[mapKey]) {
      window.AMaps[mapKey] = window.AMap;
    }
    this.AMap = window.AMaps[mapKey];
    this.Map = new this.AMap.Map(id, options);
    this.processData(this.props);
  }
  getMarker = (option = {}) => {
    let _option = option;
    return new this.AMap.Marker(_option);
  }
  getMarkers = (options = []) => {
    return options.map(option => this.getMarker(option));
  }
  addMarker = (marker) => {
    this.Map.add(marker);
  }
  addMarkers = (markers = []) => {
    markers.forEach(marker => this.addMarker(marker));
  }
  removeMarker = (marker) => {
    this.Map.remove(marker);
  }
  removeMarkers = (markers = []) => {
    markers.forEach(marker => this.removeMarker(marker));
  }
}
Map.defaultProps = {
  id: 'map',
  className: styles.map,
  mapKey: '',
  options: {
    zoom: 11,//级别
    center: [116.397428, 39.90923],//中心点坐标
    viewMode: '3D',//使用3D视图
    layers: [//使用多个图层
      new AMap.TileLayer.Satellite(),
      new AMap.TileLayer.RoadNet()
    ],
    zooms: [4, 18],//设置地图级别范围
  },
  markers: []
};
export default Map;