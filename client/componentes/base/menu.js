import React from 'react'
import ReactDOM from 'react-dom'
import estilo from './menu.scss'

export const menu = (items, e) => {
	e.stopPropagation()
	const onscroll = (z) => {
		const boundingRect = target.getBoundingClientRect()
		let top = boundingRect.top + boundingRect.height
		let left = boundingRect.left
		if (!derecha){
			left = boundingRect.left + boundingRect.width - div.offsetWidth
		}
		if (!abajo){
			top = boundingRect.top - div.offsetHeight
		}
		div.style.top = `${top}px`
		div.style.left = `${left}px`
	}
	const close = () =>{
		window.removeEventListener('scroll', onscroll, true)
		window.removeEventListener('click', close, true)
		div.style.opacity = 0;
		setTimeout(
			()=>{
				ReactDOM.unmountComponentAtNode(div)
				body.removeChild(div)
			}
		,300)
	}
	const body = document.getElementsByTagName('body')[0]
	const div = document.createElement("div")
	const target = e.target
	body.appendChild(div)
	div.classList.add(estilo.t)
	window.addEventListener('scroll', onscroll, true)
	window.addEventListener('click', close, true)
	const cmp = <ul>
		{items.map((it)=><li key={it.t} className={estilo.li} onClick={(e)=>{it.cb(e);}}>{it.t}</li>)}
	</ul>
	let derecha = true
	let abajo = true
	ReactDOM.render(cmp, div, ()=>{
		const boundingRect = target.getBoundingClientRect()
		const x = div.offsetWidth + boundingRect.left
		const y = div.offsetHeight + boundingRect.top + boundingRect.height
		if (x > window.innerWidth){
			derecha = false
		}
		if (y > window.innerHeight){
			abajo = false
		}
		onscroll()
	})
}