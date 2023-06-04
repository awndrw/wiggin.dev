import Pusher, { type Members, type PresenceChannel } from "pusher-js";

import { Event } from "stickerboard/constants";

import { ObservableSet } from "./observableSet";
import { type Listener, type ServerUser, type User } from "./types";

export class Store {
  static serverSnapshot: Record<User["id"], User> = {};

  users: Record<User["id"], User> = {};
  listeners: ObservableSet<Listener>;
  channel: PresenceChannel;

  constructor() {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      channelAuthorization: {
        endpoint: "/api/pusher/auth/channel",
        transport: "ajax",
      },
      userAuthentication: {
        endpoint: "/api/pusher/auth/user",
        transport: "ajax",
      },
    });

    this.channel = pusher.subscribe(
      "presence-sticker-board"
    ) as PresenceChannel;

    this.listeners = new ObservableSet(() => this.bindEventHandlers());
    this.channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const users = { ...this.users };
      members.each((member: ServerUser) => {
        users[member.id] = member;
      });
      this.users = users;
      this.bindEventHandlers();
    });
  }

  public subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  public getSnapshot = () => this.users;

  public getServerSnapshot = () => Store.serverSnapshot;

  private bindEventHandlers = () => {
    this.channel.unbind("pusher:member_added");
    this.channel.unbind("pusher:member_removed");
    this.channel.unbind(Event.CURSOR_MOVED);
    this.channel.unbind(Event.HUE_CHANGED);

    this.channel.bind("pusher:member_added", (member: ServerUser) => {
      console.log("pusher:member_added");
      this.users = { ...this.users, [member.id]: member };
      this.listeners.forEach((l) => l());
    });
    this.channel.bind("pusher:member_removed", (member: ServerUser) => {
      console.log("pusher:member_removed");
      const res = { ...this.users };
      delete res[member.id];
      this.users = res;
      this.listeners.forEach((l) => l());
    });
    this.channel.bind(
      Event.CURSOR_MOVED,
      ({ id, cursor }: Pick<User, "id" | "cursor">) => {
        console.log("Event.CURSOR_MOVED");
        const users = { ...this.users };
        users[id].cursor = cursor;
        this.users = users;
        this.listeners.forEach((l) => l());
      }
    );
    this.channel.bind(
      Event.HUE_CHANGED,
      ({ id, hue }: Pick<User, "id" | "hue">) => {
        console.log("Event.HUE_CHANGED");
        const users = { ...this.users };
        users[id].hue = hue;
        this.users = users;
        this.listeners.forEach((l) => l());
      }
    );
  };
}

export const store = new Store();
