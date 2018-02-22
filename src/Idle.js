import { h } from 'hyperapp';

const eventsChanged = (oldEvents, newEvents) =>
  oldEvents.sort().toString() !== newEvents;

const Idle = (
  {
    render,
    idle = false,
    onChange = () => {},
    timeoutDuration = 1000,
    events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
  } = {},
  children
) => {
  let timeout = null;

  const initTimeout = () => {
    timeout = setTimeout(() => {
      onChange(true);
    }, timeoutDuration);
  };

  const handleEvent = () => {
    if (idle) {
      onChange(false);
    }
    clearTimeout(timeout);
    initTimeout();
  };

  const addIdleEventListeners = () => {
    events.forEach(event => {
      window.addEventListener(event, handleEvent, true);
    });
  };

  const removeIdleEventListeners = () => {
    events.forEach(event => {
      window.removeEventListener(event, handleEvent, true);
    });
  };

  const checkIfEventsChanged = (element, oldAttributes) => {
    if (eventsChanged(oldAttributes.events, element.attributes.events.value)) {
      removeIdleEventListeners();
      addIdleEventListeners();
    }
  };

  return h(
    'div',
    {
      oncreate: () => {
        addIdleEventListeners();
        initTimeout();
      },
      ondestroy: () => {
        removeIdleEventListeners();
        clearTimeout(timeout);
      },
      onupdate: checkIfEventsChanged,
      events
    },
    render ? render({ idle }) : children
  );
};

export default Idle;
