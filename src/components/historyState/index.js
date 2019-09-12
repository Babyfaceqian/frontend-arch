class HistoryState {
  constructor(pastMaxLength) {
    this.PAST_MAX_LENGTH = pastMaxLength || 10;
    this.past = [];
    this.future = [];
    this.present = undefined;

  }
  gotoState(i) {
    const index = i * 1;
    const allState = [...this.past, this.present, ...this.future];
    this.present = allState[index];
    this.past = allState.slice(0, index);
    this.future = allState.slice(index + 1, allState.length);
    console.log('this.past', this.past, this.present, this.future, allState, index);
  }
  hasRecord(type) {
    // 查询是否有过去或者将来的状态
    return this[type].length > 0
  }
  hasPresent() {
    // 查询是否有现在的状态
    return this.present !== undefined;
  }
  setPresent(state) {
    this.present = state;
    this.future = [];
  }
  movePresentToPast() {
    this.past.push(this.present);
  }
  push(currentState) {
    // 将状态都保存，并更新当前状态
    if (this.hasPresent()) {
      if (this.PAST_MAX_LENGTH == 1) {
        this.past = [this.present];
      } else {
        this.past = [...this.past.slice(-(this.PAST_MAX_LENGTH)), this.present];
      }
    }
    this.setPresent(currentState);
  }
  getIndex() {
    // 获取当前状态index
    return this.past.length;
  }
  undo() {
    // 后退
    if (this.hasRecord('past')) {
      this.gotoState(this.getIndex() - 1);
    }
  }
  redo() {
    // 前进
    if (this.hasRecord('future')) {
      this.gotoState(this.getIndex() + 1);
    }
  }
}

export default HistoryState;