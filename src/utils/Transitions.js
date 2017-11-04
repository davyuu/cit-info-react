import {spring} from 'react-router-transition'

const glide = (val) => {
  return spring(val, {
    stiffness: 174,
    damping: 24,
  });
}

const bounce = (val) => {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  })
}

export const glideMapStyles = (styles) => {
  return {
    transform: `translateX(${styles.offset}%)`,
  };
}

export const glideTransitions = {
  atEnter: {
    offset: 100,
  },
  atLeave: {
    offset: glide(-100),
  },
  atActive: {
    offset: glide(0),
  }
};

export const bounceMapStyles = (styles) => {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

export const bounceTransitions = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  }
};
