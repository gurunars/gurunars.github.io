import * as React from 'react';

const SampleComponent = ({
  title,
  onClick
}: {
  title: string;
  onClick: () => void;
}) => (
  <button
    style={{
      cursor: 'pointer'
    }}
    onClick={onClick}
  >
    {title}
  </button>
);

export default SampleComponent;
