import React, { Component } from 'react';

export const name = str => {
  if (str.startsWith('--')) return str;

  let isUpper = str[0] === str[0].toUpperCase();
  str = str.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`).toString();

  if (isUpper) {
    str = str.substr(1);
    str = str.split('');
    str[0] = str[0].toUpperCase();
    str = str.join('');
  }

  return `--${str}`;
};

export const get = (obj, ...args) => typeof obj === 'function' ? obj(...args) : obj;

export const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const create = arg => {
  let { tag, className, displayName } = typeof arg === 'string' ? {
    tag: arg,
    className: '',
    displayName: 'Wrapped'
  } : {
    tag: arg.tag || 'div',
    className: arg.className || '',
    displayName: arg.displayName || 'Wrapped'
  };

  let component = class extends Component {
    render() {
      let Tag = tag;

      return React.createElement(
        Tag,
        { className: className },
        this.props.children
      );
    }
  };

  component.displayName = displayName;

  return component;
};