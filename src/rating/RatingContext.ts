import React from 'react';

type Listener = (value: number, prevValue: number) => void;

export class RatingValue {
  private _value: number = 0;
  private _listeners: Listener[] = [];

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    const prevValue = this._value;

    if (prevValue === value) {
      return;
    }

    this._value = value;

    if (!this.isEqual(prevValue)) {
      this._listeners.forEach(listener => listener(value, prevValue));
    }
  }

  addListener(listener: Listener) {
    this._listeners.push(listener);

    return () => {
      const index = this._listeners.indexOf(listener);

      this._listeners.splice(index, 1);
    };
  }

  isEqual(value: number) {
    return Math.ceil(this._value) === Math.ceil(value);
  }
}

export const RatingContext: React.Context<RatingValue> = React.createContext(new RatingValue());
