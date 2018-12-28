import React from 'react';
import styles from './Main.less';
import Drawer from 'components/Drawer/Drawer';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showLeftSecond: false,
      showRight: false,
      showTop: false,
      showBottom: false
    };
  }
  render() {
    return (
      <div className={styles.main}>
        <Drawer
          open={this.state.showLeft}
          placement="left"
          zIndex="2"
          onToggle={this.showLeft}
        >
          <div>12345</div>
        </Drawer>
        <Drawer
          open={this.state.showLeftSecond}
          placement="left"
          zIndex="1"
          onToggle={this.showLeftSecond}
        >
          <div>12345</div>
        </Drawer>

        <div className={styles.middle}>
          <Drawer
            open={this.state.showTop}
            placement="top"
            onToggle={this.showTop}
          >
            <div>12345</div>
          </Drawer>
          <div className={styles.content}>
            <button onClick={this.showLeft}>Show Left</button>
            <button onClick={this.showLeftSecond}>Show Left Second</button>
            <button onClick={this.showRight}>Show Right</button>
            <button onClick={this.showRightSecond}>Show Right Second</button>
            <button onClick={this.showTop}>Show Top</button>
            <button onClick={this.showBottom}>Show Bottom</button>
          </div>
          <Drawer
            open={this.state.showBottom}
            placement="bottom"
            onToggle={this.showBottom}
          >
            <div>12345</div>
          </Drawer>

        </div>
        <Drawer
          open={this.state.showRightSecond}
          placement="right"
          zIndex="1"
          onToggle={this.showRightSecond}
        >
          <div>12345</div>
        </Drawer>
        <Drawer
          open={this.state.showRight}
          placement="right"
          zIndex="2"
          onToggle={this.showRight}
        >
          <div>12345</div>
        </Drawer>
      </div>
    );
  }

  showLeft = () => {
    this.setState({ showLeft: !this.state.showLeft });
  }
  showLeftSecond = () => {
    this.setState({ showLeftSecond: !this.state.showLeftSecond });
  }
  showRight = () => {
    this.setState({ showRight: !this.state.showRight });
  }
  showRightSecond = () => {
    this.setState({ showRightSecond: !this.state.showRightSecond });
  }
  showTop = () => {
    this.setState({ showTop: !this.state.showTop });
  }
  showBottom = () => {
    this.setState({ showBottom: !this.state.showBottom });
  }
}
