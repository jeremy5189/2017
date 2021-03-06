import React, { Component } from 'react'
export const state = {
	content: () => { return (<div></div>) },
	updated: false,
}
const callbacks = []
const durations = []

function forward(nowid) {
	callbacks[nowid]()
	state.updated = false
	if( nowid+1 >= callbacks.length )
		return
	setTimeout(() => { forward(nowid+1) }, durations[nowid])
}

function backward(nowid) {
	callbacks[nowid]()
	if( nowid-1 < 0 )
		return
	setTimeout(() => { backward(nowid-1)}, durations[nowid+1])
}

export function open(content) {
	if( !content ) return;
	state.content = content
	state.updated = true
	forward(1)
}

export function close() {
	backward(callbacks.length - 1)
}

export function addStep(callback, duration) {
	callbacks.push(callback)
	durations.push(duration || 0)
}
