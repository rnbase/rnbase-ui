import React from 'react';

type Listener = (value: number, prevValue: number) => void;

export class RatingValue {
  private _value: number = 0;
  private _listeners: Listener[] = [];

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    if (this._value === value) {
      return;
    }

    const nextValue = Math.ceil(value);
    const prevValue = Math.ceil(this._value);

    this._value = value;

    if (nextValue !== prevValue) {
      this._listeners.forEach(listener => listener(nextValue, prevValue));
    }
  }

  addListener(listener: Listener) {
    this._listeners.push(listener);

    return () => {
      const index = this._listeners.indexOf(listener);

      this._listeners.splice(index, 1);
    };
  }

  scale(value: number) {
    return Math.ceil(this._value) === value ? 1.25 : 1;
  }
}

export const RatingContext: React.Context<RatingValue> = React.createContext(new RatingValue());
