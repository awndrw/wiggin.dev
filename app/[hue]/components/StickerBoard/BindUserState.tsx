import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { store } from "live/store";
import { Event } from "stickerboard/constants";
import { hueAtom } from "store";
import { throttle } from "utils/throttle";

export function BindUserState() {
  const hue = useAtomValue(hueAtom);

  // Bind hue change
  useEffect(() => {
    store.channel.trigger(Event.HUE_CHANGED, {
      id: store.channel.members.myID,
      hue,
    });
  }, [hue]);

  // Bind cursor move
  useEffect(() => {
    const onMouseMove = throttle((e: MouseEvent) => {
      store.channel.trigger(Event.CURSOR_MOVED, {
        id: store.channel.members.myID,
        cursor: {
          position: {
            x: e.pageX / document.body.clientWidth,
            y: e.pageY / document.body.clientHeight,
          },
        },
      });
    }, 200);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return null;
}
