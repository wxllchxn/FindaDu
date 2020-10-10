import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export class BottomDrawer extends Component {
  constructor(props) {
    super(props);
    this._startTopPos = Dimensions.get('window').height - props.topPosOffset;
    this.topPos = new Animated.Value(
      Dimensions.get('window').height - props.topPosOffset
    );
    this.state = {
      open: false,
    };
    this.onHandlerStateChange = this.onHandlerStateChange.bind(this);
  }

  //   onHandlerStateChange(event){...}

  render() {
    // Limit the range of the gesture
    this.topPosFinal = this.topPos.interpolate({
      inputRange: [this.props.endTopPos, this._startTopPos],
      outputRange: [this.props.endTopPos, this._startTopPos],
      extrapolate: 'clamp',
    });

    return (
      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={Animated.event([
          { nativeEvent: { absoluteY: this.topPos } },
        ])}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={{
            position: 'absolute',
            transform: [{ translateY: this.topPosFinal }],
            width: '100%',
          }}>
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default BottomDrawer;
