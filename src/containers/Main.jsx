import React from 'react';
import styles from './Main.less';
import Layout from 'components/flex-layout/Layout';
import Drawer from 'components/drawer/Drawer';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCollapsed: true,
      leftCollapsed2: true,
      leftCollapsed3: true,
      rightCollapsed: true,
      bottomCollapsed: true,
      bottomCollapsed2: true
    };
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <Layout>
        <Layout.Item>
          <Drawer placement='left' visible={!this.state.leftCollapsed}>This is left panel
          </Drawer>
          <Drawer placement='left' visible={!this.state.leftCollapsed2}>This is left panel 2
          </Drawer>
          <Drawer placement='left' visible={!this.state.leftCollapsed3}>This is left panel 3
          </Drawer>
        </Layout.Item>
        <Layout.Item flex={1}>
          <Layout direction="column">
            <Layout.Item flex={1}>
              <div>This is right panel
          <button onClick={this.leftCollapse}>左侧</button>
                <button onClick={this.leftCollapse2}>左侧2</button>
                <button onClick={this.leftCollapse3}>左侧3</button>
                <button onClick={this.rightCollapse}>右侧</button>
                <button onClick={this.bottomCollapse}>下侧</button>
                <button onClick={this.bottomCollapse2}>下侧</button>
              </div>
            </Layout.Item>
            <Layout.Item>
              <Drawer placement='bottom' visible={!this.state.bottomCollapsed}>This is bottom panel
          </Drawer>
              <Drawer placement='bottom' visible={!this.state.bottomCollapsed2}>This is bottom panel 2
          </Drawer>
            </Layout.Item>
          </Layout>
        </Layout.Item>
        <Layout.Item>
          <Drawer placement='right' visible={!this.state.rightCollapsed}>This is right panel
          </Drawer>
        </Layout.Item>
      </Layout>
    );
  }
  leftCollapse = () => {
    this.setState({
      leftCollapsed: !this.state.leftCollapsed,
      leftCollapsed2: true,
      leftCollapsed3: true
    });
  }
  leftCollapse2 = () => {
    this.setState({
      leftCollapsed2: !this.state.leftCollapsed2,
      leftCollapsed: true,
      leftCollapsed3: true
    });
  }
  leftCollapse3 = () => {
    this.setState({
      leftCollapsed3: !this.state.leftCollapsed3,
      leftCollapsed: true,
      leftCollapsed2: true
    });
  }
  rightCollapse = () => {
    this.setState({ rightCollapsed: !this.state.rightCollapsed });
  }
  bottomCollapse = () => {
    this.setState({
      bottomCollapsed: !this.state.bottomCollapsed,
      bottomCollapsed2: true
    });
  }
  bottomCollapse2 = () => {
    this.setState({
      bottomCollapsed2: !this.state.bottomCollapsed2,
      bottomCollapsed: true
    });
  }
}
