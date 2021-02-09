import React from 'react';

const BlogField = ({ input, label, fieldtype, meta: { error, touched } }) => {
  return (
    <div className={input.name}>
      <label>{label}</label>
      {fieldtype === 'input' ? (
        <input {...input} style={{ marginBottom: '5px' }} />
      ) : (
        <textarea
          rows='5'
          {...input}
          style={{ marginBottom: '5px' }}
          className='materialize-textarea'
        />
      )}

      <div className='red-text' style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default BlogField;
