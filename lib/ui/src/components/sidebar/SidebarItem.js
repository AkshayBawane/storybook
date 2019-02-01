import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';

import { Icons } from '@storybook/components';

const Expander = styled.span(
  ({ theme }) => ({
    display: 'block',
    width: 0,
    height: 0,
    marginRight: 4,
    borderTop: '3.5px solid transparent',
    borderBottom: '3.5px solid transparent',
    borderLeft: `3.5px solid ${theme.color.mediumdark}`,
    transition: 'transform .1s ease-out',
  }),

  ({ isExpandable }) => (!isExpandable ? { borderLeftColor: 'transparent' } : {}),

  ({ isExpanded = false }) =>
    isExpanded
      ? {
          transform: 'rotateZ(90deg)',
        }
      : {}
);

const Icon = styled(Icons)(
  {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  ({ icon }) => {
    if (icon === 'folder') {
      return { color: '#774dd7' };
    }
    if (icon === 'component') {
      return { color: '#1ea7fd' };
    }
    if (icon === 'bookmarkhollow') {
      return { color: '#37d5d3' };
    }
    return {};
  },
  ({ isSelected }) => (isSelected ? { color: 'inherit' } : {})
);

export const Item = styled.div(
  ({ theme }) => ({
    marginLeft: -theme.layoutMargin * 2,
    marginRight: -theme.layoutMargin * 2,
    minHeight: 24,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  }),
  ({ theme, depth }) => ({
    paddingLeft: depth * (theme.layoutMargin * 1.5) + theme.layoutMargin,
  }),
  ({ theme, isSelected, loading }) =>
    !loading &&
    (isSelected
      ? {
          cursor: 'default',
          background: theme.color.secondary,
          color: theme.color.lightest,
        }
      : {
          cursor: 'pointer',
          '&:hover': {
            background: 'rgba(0,0,0,.05)',
          },
        }),
  ({ theme, loading }) =>
    loading && {
      '&& > *': theme.animation.inlineGlow,
    }
);

export default function SidebarItem({
  name,
  depth,
  isComponent,
  isStory,
  isExpanded,
  isSelected,
  loading,
  ...props
}) {
  let iconName;
  if (isStory) {
    iconName = 'bookmarkhollow';
  } else if (isComponent) {
    iconName = 'component';
  } else {
    iconName = 'folder';
  }

  return (
    <Item isSelected={isSelected} depth={depth} loading={loading} {...props}>
      <Expander isExpandable={!isStory} isExpanded={isExpanded ? true : undefined} />
      <Icon icon={iconName} isSelected={isSelected} />
      <span>{name}</span>
    </Item>
  );
}

SidebarItem.propTypes = {
  name: PropTypes.node.isRequired,
  depth: PropTypes.number.isRequired,
  isComponent: PropTypes.bool,
  isStory: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isSelected: PropTypes.bool,
  loading: PropTypes.bool,
};

SidebarItem.defaultProps = {
  isComponent: false,
  isStory: false,
  isExpanded: false,
  isSelected: false,
  loading: false,
};
