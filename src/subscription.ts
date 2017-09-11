import { BaseSubscription } from './base-subscription';
import { Headers } from './base-client';

export interface Subscription {
    unsubscribe();
}

export interface SubscriptionStateTransition {
    onTransition(newState: SubscriptionState): void;
}

export interface SubscriptionState {
    unsubscribe();
}

export interface SubscriptionEvent {
    eventId: string;
    headers: Headers;
    body: any;
}

export interface SubscriptionListeners {
    onOpen?: (headers: Headers) => void;
    onSubscribe?: () => void;
    onEvent?: (event: SubscriptionEvent) => void;
    onError?: (error: any) => void;
    onEnd?: (error: any) => void;
}

let noop = (arg?) => {};

export let replaceMissingListenersWithNoOps: (listeners: SubscriptionListeners) => SubscriptionListeners = (listeners) => {
    
    let onOpen = listeners.onOpen || noop ;
    let onSubscribe = listeners.onSubscribe || noop;
    let onEvent = listeners.onEvent || noop;
    let onError = listeners.onError || noop;
    let onEnd = listeners.onEnd || noop; 

    return {
        onOpen: onOpen,
        onSubscribe: onSubscribe,
        onEvent: onEvent,
        onError: onError,
        onEnd: onEnd
    }
}

export type SubscriptionConstructor = (
    headers: Headers, 
    onOpen: (headers:Headers) => void , 
    onError: (error: any) => void, 
    onEvent: (event: SubscriptionEvent) => void,
    onEnd: (error: any) => void
) => BaseSubscription;

export type SubscribeStrategy = (
    onOpen: (headers:Headers) => void, 
    onError: (error: any) => void, 
    onEvent: (event: SubscriptionEvent) => void,
    onEnd: (error: any) => void,
    headers: Headers,
    subscriptionConstructor: SubscriptionConstructor
) => Subscription;