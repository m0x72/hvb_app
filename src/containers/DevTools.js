import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  /* DockMonitor listens on ctrl + key */
  <DockMonitor toggleVisibilityKey="H"
               changePositionKey="P"
               defaultIsVisible={false}>
    <LogMonitor />
  </DockMonitor>
);
