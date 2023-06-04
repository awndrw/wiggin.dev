import { type Listener } from "./types";

export class ObservableSet<T> {
  private set = new Set<T>();
  forEach = this.set.forEach.bind(this.set);

  constructor(private onChange: Listener) {}

  add = (value: T) => {
    this.set.add(value);
    this.onChange();
  };

  delete = (value: T) => {
    this.set.delete(value);
    this.onChange();
  };
}
