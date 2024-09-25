import { useEffect } from "react";

const subscribers = new Map<string, Function[]>();

export const usePubSub = () => {
  const subscribe = (topic: string, callback: Function) => {
    if (!subscribers.has(topic)) {
      subscribers.set(topic, []);
    }
    subscribers.get(topic)!.push(callback);
    // console.log("sub subscribers", subscribers);
  };

  const usnuscribe = (topic: string, callback: Function) => {
    if (!subscribers.has(topic)) {
      return;
    }
    subscribers.set(
      topic,
      subscribers.get(topic)!.filter(cb => cb !== callback)
    );
    // console.log("uns subscribers", subscribers);
  };

  const publish = (topic: string, data: any) => {
    console.log("publish", topic, data);
    console.log("publish subscribers.current[topic]", subscribers.get(topic));
    if (!subscribers.has(topic)) {
      return;
    }
    subscribers.get(topic)!.forEach(callback => {
      callback(data);
    });
  };

  return { subscribe, usnuscribe, publish };
};

export const useSub = (topic: string, callback: Function) => {
  const { subscribe, usnuscribe } = usePubSub();

  useEffect(() => {
    subscribe(topic, callback);

    return () => usnuscribe(topic, callback);
  }, [callback, subscribe, topic, usnuscribe]);

  return { subscribe, usnuscribe };
};
