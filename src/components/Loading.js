import React from 'react';

const Loading = ({message}) => (
  <div className="loadingpage">
    <div className="loading">
      <div className="loading_txt">
        {message}
      </div>
    </div>
  </div>
);

export default Loading;
